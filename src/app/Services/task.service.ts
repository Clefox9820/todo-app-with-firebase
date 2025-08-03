import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  CollectionReference,
  query,
  where
} from '@angular/fire/firestore';
import { Auth, User } from '@angular/fire/auth';
import { Observable, switchMap } from 'rxjs';
import { TodoTask } from '../interfaces/task.interface';
import { Timestamp } from '@firebase/firestore';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private pendingDeletions = new Map<string, any>();

  constructor(private firestore: Firestore, private auth: Auth, private authService: AuthService) { }

  /**
   * Obtiene la lista de tareas activas (no borradas) del usuario autenticado
   */
  getTasks(): Observable<TodoTask[]> {
    return this.authService.user$.pipe( // Usar authService en lugar de auth
      switchMap((user: User | null) => {
        if (!user) {
          throw new Error('No autenticado');
        }

        const uid = user.uid;
        const colRef = collection(this.firestore, `users/${uid}/tasks`) as CollectionReference<TodoTask>;
        const q = query(colRef, where('deleted', '==', false));

        return collectionData(q, { idField: 'id' }) as Observable<TodoTask[]>;
      })
    );
  }

  /**
   * Agrega una nueva tarea
   */
  async addTask(taskData: Omit<TodoTask, 'id' | 'ownerId' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'deleted'>): Promise<string> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      throw new Error('No autenticado');
    }

    const now = Timestamp.now();
    const task: Omit<TodoTask, 'id'> = {
      ...taskData,
      ownerId: currentUser.uid,
      createdAt: now,
      updatedAt: now,
      deletedAt: null as any,
      deleted: false
    };

    const colRef = collection(this.firestore, `users/${currentUser.uid}/tasks`) as CollectionReference<TodoTask>;
    const ref = await addDoc(colRef, task);

    return ref.id;
  }

  /**
   * Marca una tarea para borrado lógico con tiempo de gracia de 10 segundos
   */
  async deleteTask(taskId: string): Promise<void> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      throw new Error('No autenticado');
    }

    // Cancelar borrado pendiente si existe
    if (this.pendingDeletions.has(taskId)) {
      clearTimeout(this.pendingDeletions.get(taskId)!);
      this.pendingDeletions.delete(taskId);
    }

    // Marcar como borrada inmediatamente en la UI
    const docRef = doc(this.firestore, `users/${currentUser.uid}/tasks/${taskId}`);
    await updateDoc(docRef, {
      deleted: true,
      deletedAt: new Date(),
      updatedAt: new Date()
    });

    // Programar el borrado definitivo después de 10 segundos
    const timeoutId = setTimeout(async () => {
      try {
        // Aquí podrías hacer borrado físico si lo deseas, o simplemente limpiar la referencia
        this.pendingDeletions.delete(taskId);
        console.log(`Tarea ${taskId} borrada definitivamente`);
      } catch (error) {
        console.error('Error en borrado definitivo:', error);
      }
    }, 10000) as any;

    this.pendingDeletions.set(taskId, timeoutId);
  }

  /**
   * Restaura una tarea que estaba marcada para borrado
   */
  async restoreTask(taskId: string): Promise<void> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      throw new Error('No autenticado');
    }

    // Cancelar el borrado pendiente
    if (this.pendingDeletions.has(taskId)) {
      clearTimeout(this.pendingDeletions.get(taskId)!);
      this.pendingDeletions.delete(taskId);
    }

    // Restaurar la tarea
    const docRef = doc(this.firestore, `users/${currentUser.uid}/tasks/${taskId}`);
    await updateDoc(docRef, {
      deleted: false,
      deletedAt: null,
      updatedAt: new Date()
    });
  }

  /**
   * Borra todas las tareas del usuario con tiempo de gracia
   */
  async deleteAllTasks(): Promise<void> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      throw new Error('No autenticado');
    }

    const uid = currentUser.uid;
    const colRef = collection(this.firestore, `users/${uid}/tasks`) as CollectionReference<TodoTask>;

    // Obtener todas las tareas activas
    const q = query(colRef, where('deleted', '==', false));
    const snapshot = await collectionData(q, { idField: 'id' });

    const now = new Date();
    const batchPromises: Promise<void>[] = [];

    // Marcar todas como borradas
    snapshot.forEach((task: any) => {
      const docRef = doc(this.firestore, `users/${uid}/tasks/${task.id}`);
      batchPromises.push(
        updateDoc(docRef, {
          deleted: true,
          deletedAt: now,
          updatedAt: now
        })
      );
    });

    await Promise.all(batchPromises);

    // Programar restauración automática después de 10 segundos
    const restoreTimeoutId = setTimeout(async () => {
      console.log('Tiempo de gracia terminado para borrado masivo');
      // Aquí podrías hacer borrado físico definitivo si lo deseas
    }, 10000) as any;

    // Guardar referencia para posible cancelación
    this.pendingDeletions.set('all_tasks', restoreTimeoutId);
  }

  /**
   * Restaura todas las tareas que estaban marcadas para borrado masivo
   */
  async restoreAllTasks(): Promise<void> {
    const currentUser = this.auth.currentUser;
    if (!currentUser) {
      throw new Error('No autenticado');
    }

    // Cancelar el borrado masivo pendiente
    if (this.pendingDeletions.has('all_tasks')) {
      clearTimeout(this.pendingDeletions.get('all_tasks')!);
      this.pendingDeletions.delete('all_tasks');
    }

    const uid = currentUser.uid;
    const colRef = collection(this.firestore, `users/${uid}/tasks`) as CollectionReference<TodoTask>;

    // Obtener todas las tareas borradas recientemente (podrías agregar un filtro de tiempo si lo deseas)
    const q = query(colRef, where('deleted', '==', true));
    const snapshot = await collectionData(q, { idField: 'id' });

    const batchPromises: Promise<void>[] = [];

    // Restaurar todas las tareas
    snapshot.forEach((task: any) => {
      const docRef = doc(this.firestore, `users/${uid}/tasks/${task.id}`);
      batchPromises.push(
        updateDoc(docRef, {
          deleted: false,
          deletedAt: null,
          updatedAt: new Date()
        })
      );
    });

    await Promise.all(batchPromises);
  }

  /**
   * Limpia todos los timeouts pendientes (útil para cleanup del servicio)
   */
  cleanup(): void {
    this.pendingDeletions.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    this.pendingDeletions.clear();
  }
}
