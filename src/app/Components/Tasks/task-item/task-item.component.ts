import { Component, input, model, OnInit, output, signal } from '@angular/core';
import { TodoTask } from 'src/app/interfaces/task.interface';
import { IonItem, IonLabel, IonChip, IonCheckbox, IonButton, IonIcon, IonButtons } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../Services/task.service';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  imports: [IonButtons, IonIcon, IonButton, IonCheckbox, IonChip, IonLabel, IonItem, FormsModule],
  standalone: true,
})
export class TaskItemComponent implements OnInit {

  checked = model<boolean>();

  checkedItem = signal<boolean>(false);

  //Crear signal task con input
  taskItem = input<TodoTask>();

  //Metodo para manejar
  onIndividualChange(event: any) {
    this.checkedItem.set(event.detail.checked);
  }

  updateFromSelectAll(value: boolean) {
    this.checked.set(value);
  }

  onDelete() {
    this.taskService.deleteTask(this.taskItem()?.id!);
    console.log('Tarea eliminandose');
    // Activar restorTask despeus de 5 segundos
    setTimeout(() => {
      this.taskService.restoreTask(this.taskItem()?.id!);
      console.log('Tarea restaurada');
    }, 5000);
  }



  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

}
