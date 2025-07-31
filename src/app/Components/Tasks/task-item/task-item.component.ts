import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonLabel, IonItem, IonChip, IonCheckbox} from '@ionic/angular/standalone';
import { TodoTask } from 'src/app/interfaces/task.interface';
import { TaskFilterService } from 'src/app/Services/task-filter.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  imports: [IonItem, IonLabel, IonChip, FormsModule, IonCheckbox, CommonModule],
  standalone: true,
})
export class TaskItemComponent {
  // Input signal para la tarea
  taskList = input.required<TodoTask>();

  // Output para comunicar cambios al padre
  taskChange = output<TodoTask>();

  constructor(public filterService: TaskFilterService) {}

  onToggleDone(event: any) {
    const updatedTask = { ...this.taskList(), done: event.detail.checked };
    this.taskChange.emit(updatedTask);
  }

  // Método para obtener el nombre de una categoría
  getCategoryName(categoryId: number): string {
    return this.filterService.getCategoryName(categoryId);
  }

  // Método para obtener el color de una categoría
  getCategoryColor(categoryId: number): string {
    return this.filterService.getCategoryColor(categoryId);
  }
}
