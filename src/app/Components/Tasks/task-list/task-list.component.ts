import { Component, model, OnInit } from '@angular/core';
import { IonList, IonItem } from "@ionic/angular/standalone";
import { TodoTask } from 'src/app/interfaces/task.interface';
import { TaskItemComponent } from "../task-item/task-item.component";
import { TaskService } from '../../../Services/task.service';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [IonList, TaskItemComponent],
  standalone: true,
})
export class TaskListComponent implements OnInit {

  allTasks: TodoTask[] = [];
  filteredTasks: TodoTask[] = [];
  filter = 'all';
  checked = model<boolean>(false);

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.allTasks = tasks;
      // this.filterTasks();
    });
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


