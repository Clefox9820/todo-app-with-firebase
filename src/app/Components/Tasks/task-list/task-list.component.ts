import { Component, OnInit } from '@angular/core';
import { IonList, IonItem } from "@ionic/angular/standalone";
import { TodoTask } from 'src/app/interfaces/task.interface';
import { TaskItemComponent } from "../task-item/task-item.component";

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [IonItem, IonList, TaskItemComponent],
  standalone: true,
})
export class TaskListComponent implements OnInit {

  //Crear arreglo con datos para realizar pruebas
  taskList: TodoTask[] = [{
    id: '1',
    ownerId: '1',
    title: 'Tarea 1',
    description: 'Descripcion de la tarea 1',
    category: [1],
    completed: false,
    createdAt: new Date(),
    deadline: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    deleted: false
  },
  {
    id: '2',
    ownerId: '1',
    title: 'Tarea 2',
    description: 'Descripcion de la tarea 2',
    category: [2],
    completed: false,
    createdAt: new Date(),
    deadline: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    deleted: false
  },
  {
    id: '3',
    ownerId: '1',
    title: 'Tarea 3',
    description: 'Descripcion de la tarea 3',
    category: [3],
    completed: false,
    createdAt: new Date(),
    deadline: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    deleted: false
  },
  {
    id: '4',
    ownerId: '1',
    title: 'Tarea 4',
    description: 'Descripcion de la tarea 4',
    category: [4],
    completed: false,
    createdAt: new Date(),
    deadline: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    deleted: false
  },
  {
    id: '5',
    ownerId: '1',
    title: 'Tarea 5',
    description: 'Descripcion de la tarea 5',
    category: [5],
    completed: false,
    createdAt: new Date(),
    deadline: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    deleted: false
  },
  {
    id: '6',
    ownerId: '1',
    title: 'Tarea 6',
    description: 'Descripcion de la tarea 6',
    category: [6],
    completed: false,
    createdAt: new Date(),
    deadline: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    deleted: false
  },
  {
    id: '7',
    ownerId: '1',
    title: 'Tarea 7',
    description: 'Descripcion de la tarea 7',
    category: [7],
    completed: false,
    createdAt: new Date(),
    deadline: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    deleted: false
  },
  {
    id: '8',
    ownerId: '1',
    title: 'Tarea 8',
    description: 'Descripcion de la tarea 8',
    category: [8],
    completed: false,
    createdAt: new Date(),
    deadline: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    deleted: false
  }
  ]

  constructor() { }

  ngOnInit() { }

}
