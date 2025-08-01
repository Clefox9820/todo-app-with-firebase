import { Component, input, OnInit, signal } from '@angular/core';
import { TodoTask } from 'src/app/interfaces/task.interface';
import { IonItem, IonLabel, IonChip, IonCheckbox, IonButton, IonIcon, IonButtons } from "@ionic/angular/standalone";

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  imports: [IonButtons, IonIcon, IonButton, IonCheckbox, IonChip, IonLabel, IonItem],
  standalone: true,
})
export class TaskItemComponent implements OnInit {

  //Crear signal task con input
  taskItem = input<TodoTask>();



  constructor() { }

  ngOnInit() {
  }

}
