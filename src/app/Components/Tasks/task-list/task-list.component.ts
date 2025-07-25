import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonList, IonItem, IonItemGroup } from "@ionic/angular/standalone";
import { TaskItemComponent } from "../task-item/task-item.component";
import { FormsModule } from '@angular/forms';
import { TodoTask } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [IonItemGroup, IonList, TaskItemComponent, FormsModule],
  standalone: true,
})
export class TaskListComponent implements OnInit {


  category = ['Personal', 'Trabajo', 'Hogar', 'Otros'];

  @Output() taskList: TodoTask[] = [
    {
      id: '1',
      ownerId: '',
      title: 'Título 1',
      description: 'Descripción 1',
      categories: [0, 1],
      done: false
    },
    {
      id: '2',
      ownerId: '',
      title: 'Título 2',
      description: 'Descripción 2',
      categories: [2],
      done: true
    },
    {
      id: '3',
      ownerId: '',
      title: 'Título 3',
      description: 'Descripción 3',
      categories: [3],
      done: false
    },
    {
      id: '4',
      ownerId: '',
      title: 'Título 4',
      description: 'Descripción 4',
      categories: [0, 1],
      done: false
    },
    {
      id: '5',
      ownerId: '',
      title: 'Título 5',
      description: 'Descripción 5',
      categories: [2, 3],
      done: false
    },
    {
      id: '6',
      ownerId: '',
      title: 'Título 6',
      description: 'Descripción 6',
      categories: [0],
      done: false
    },
    {
      id: '7',
      ownerId: '',
      title: 'Título 7',
      description: 'Descripción 7',
      categories: [1],
      done: false
    },

  ]

  @Input() selectedCategories!: string[];

  @Input() tasks: TodoTask[] = [];



  constructor() { }


  ngOnInit() { }

}
