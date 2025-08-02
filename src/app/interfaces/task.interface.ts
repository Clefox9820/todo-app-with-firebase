import { Timestamp } from "@angular/fire/firestore";

export interface TodoTask {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: number[];
  completed: boolean;
  createdAt: Timestamp;
  deadline: Timestamp;
  updatedAt: Timestamp;
  deletedAt: Timestamp | null;
  deleted: boolean;
}
