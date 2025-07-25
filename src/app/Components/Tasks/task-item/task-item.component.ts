import { Component, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonLabel, IonItem, IonChip, IonCheckbox, IonRow, IonGrid, IonCol } from '@ionic/angular/standalone';
import { TodoTask } from 'src/app/interfaces/task.interface';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  imports: [IonCol, IonGrid, IonRow, IonItem, IonLabel, IonChip, FormsModule, IonCheckbox],
  standalone: true,
})
export class TaskItemComponent implements OnInit {
    category = ['Personal', 'Trabajo', 'Hogar', 'Otros'];


  @Input() taskList: TodoTask = {} as TodoTask


  onToggleDone(event: any) {
    this.taskList.done = event.detail.checked
  }

  constructor() { }

  ngOnInit() { }

}
