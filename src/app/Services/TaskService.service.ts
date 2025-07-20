import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';

export interface Task {
  ownerId: string;
  title: string;
  completed: boolean;
}

@Injectable({ providedIn: 'root' })
export class TaskTestService {
  private tasksCol = (userId: string) => collection(this.firestore, `users/${userId}/tasks`);

  constructor(private firestore: Firestore) {}

  async testAddTask(userId: string, task: Task) {
    return addDoc(this.tasksCol(userId), task);
  }

  async testGetTask(userId: string, id: string) {
    const ref = doc(this.firestore, `users/${userId}/tasks/${id}`);
    return getDoc(ref);
  }

  async testUpdateTask(userId: string, id: string, changes: Partial<Task>) {
    const ref = doc(this.firestore, `users/${userId}/tasks/${id}`);
    return updateDoc(ref, changes);
  }

  async testDeleteTask(userId: string, id: string) {
    const ref = doc(this.firestore, `users/${userId}/tasks/${id}`);
    return deleteDoc(ref);
  }
}
