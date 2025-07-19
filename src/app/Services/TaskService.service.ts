import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';

export interface Task {
  id?: string;
  ownerId: string;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskTestService {
  private tasksCol = collection(this.firestore, 'tasks');

  constructor(private firestore: Firestore) {}

  // Añade una tarea de prueba
  async testAddTask(task: Task) {
    try {
      const ref = await addDoc(this.tasksCol, task);
      console.log('✔️ Tarea añadida con ID:', ref.id);
      return ref.id;
    } catch (err) {
      console.error('❌ Error al añadir tarea:', err);
    }
  }

  // Lee la tarea de prueba por ID
  async testGetTask(id: string) {
    try {
      const docRef = doc(this.firestore, 'tasks', id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        console.log('✔️ Tarea leída:', { id: snap.id, ...snap.data() });
      } else {
        console.warn('⚠️ No existe la tarea con ID:', id);
      }
    } catch (err) {
      console.error('❌ Error al leer tarea:', err);
    }
  }

  // Actualiza la tarea de prueba (marca como completada)
  async testUpdateTask(id: string, changes: Partial<Task>) {
    try {
      const docRef = doc(this.firestore, 'tasks', id);
      await updateDoc(docRef, changes);
      console.log('✔️ Tarea actualizada:', id, changes);
    } catch (err) {
      console.error('❌ Error al actualizar tarea:', err);
    }
  }

  // Elimina la tarea de prueba
  async testDeleteTask(id: string) {
    try {
      const docRef = doc(this.firestore, 'tasks', id);
      await deleteDoc(docRef);
      console.log('✔️ Tarea eliminada:', id);
    } catch (err) {
      console.error('❌ Error al eliminar tarea:', err);
    }
  }
}
