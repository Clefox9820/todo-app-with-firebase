export interface TodoTask {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: number[];
  completed: boolean;
  createdAt: Date;
  deadline: Date;
  updatedAt: Date;
  deletedAt: Date;
  deleted: boolean;

}
