import { Component, inject, model, OnInit } from '@angular/core';
import { IonList, IonItem, IonRefresher, IonRefresherContent, RefresherCustomEvent, IonButton, IonIcon } from "@ionic/angular/standalone";
import { TodoTask } from 'src/app/interfaces/task.interface';
import { TaskItemComponent } from "../task-item/task-item.component";
import { TaskService } from '../../../Services/task.service';
import { Timestamp } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [IonIcon, IonButton, IonRefresherContent, IonRefresher, IonList, TaskItemComponent],
  standalone: true,
})
export class TaskListComponent implements OnInit {

  allTasks: TodoTask[] = [];
  filteredTasks: TodoTask[] = [];
  filter = 'all';
  checked = model<boolean>(false);

  constructor(private taskService: TaskService) { }
  auth: AuthService = inject(AuthService);

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.allTasks = tasks;
      // this.filterTasks();
    });
  }


  get() {
    this.taskService.getTasks().subscribe(tasks => {
      this.allTasks = tasks;
      // this.filterTasks();
    });
  }

  handleRefresh(event: RefresherCustomEvent) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  async addHardcodedTask() {
  try {
    const taskData = {
      title: 'Tarea de prueba',
      description: 'Esta es una tarea hardcodeada para testing',
      completed: false,
      deadline: Timestamp.now(), // Esta propiedad faltaba
      category: [1,2,33] // ajusta según tu tipo
    };

    const taskId = await this.taskService.addTask(taskData);
    console.log('Tarea creada con ID:', taskId);

    // Opcional: mostrar mensaje de éxito o recargar lista
  } catch (error) {
    console.error('Error al crear tarea:', error);
  }
}

  // filterTasks() {
  //   if (this.filter === 'pending') {
  //     this.filteredTasks = this.allTasks.filter(task => !task.completed);
  //   } else if (this.filter === 'completed') {
  //     this.filteredTasks = this.allTasks.filter(task => task.completed);
  //   } else {
  //     this.filteredTasks = this.allTasks;
  //   }
  // }
}


