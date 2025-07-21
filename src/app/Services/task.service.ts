import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  CollectionReference
} from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { Observable, switchMap, filter } from 'rxjs';

export interface Task {
  id?: string;
  ownerId: string;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(private firestore: Firestore, private auth: Auth) {}

  getTasks(): Observable<Task[]> {
    return user(this.auth).pipe(
      filter(u => !!u),
      switchMap(u => {
        const uid = u!.uid;
        // Creamos una referencia tipada
        const colRef = collection(this.firestore, `users/${uid}/tasks`) as CollectionReference<Task>;

        // Luego usamos collectionData sin tipo genérico de argumento
        return collectionData(colRef, { idField: 'id' }) as Observable<Task[]>;
      })
    );
  }

  async addTask(task: Omit<Task, 'id'>): Promise<string> {
    const u = await this.auth.currentUser;
    if (!u) throw new Error('No autenticado');
    const colRef = collection(this.firestore, `users/${u.uid}/tasks`) as CollectionReference<Task>;
    const ref = await addDoc(colRef, { ...task, ownerId: u.uid });
    return ref.id;
  }

  async updateTask(id: string, changes: Partial<Task>): Promise<void> {
    const u = await this.auth.currentUser;
    if (!u) throw new Error('No autenticado');
    const docRef = doc(this.firestore, `users/${u.uid}/tasks/${id}`);
    await updateDoc(docRef, changes);
  }

  async deleteTask(id: string): Promise<void> {
    const u = await this.auth.currentUser;
    if (!u) throw new Error('No autenticado');
    const docRef = doc(this.firestore, `users/${u.uid}/tasks/${id}`);
    await deleteDoc(docRef);
  }
}
