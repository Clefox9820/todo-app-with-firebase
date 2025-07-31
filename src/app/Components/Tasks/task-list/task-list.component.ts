import { Component, input, signal, computed, inject } from '@angular/core';
import { IonList, IonIcon, IonButton } from "@ionic/angular/standalone";
import { TaskItemComponent } from "../task-item/task-item.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoTask } from 'src/app/interfaces/task.interface';
import { TaskFilterService } from 'src/app/Services/task-filter.service';
import { TaskService } from 'src/app/Services/task.service';



@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [IonList, TaskItemComponent, FormsModule, CommonModule, IonIcon, IonButton],
  standalone: true,
})
export class TaskListComponent {
  // Input signal para las tareas
  tasks = input<TodoTask[]>([]);

  //Inyectar servicio de task con inject
  private taskService = inject(TaskService);


  // Signal interno para tareas por defecto (para demo)
  private defaultTasks = signal<TodoTask[]>([
    {
      id: '1',
      ownerId: '',
      title: 'Revisar emails importantes',
      description: 'Revisar y responder emails urgentes del trabajo',
      categories: [0, 2], // Trabajo y Urgente
      done: false
    },
    {
      id: '2',
      ownerId: '',
      title: 'Hacer ejercicio',
      description: 'Rutina de cardio de 30 minutos',
      categories: [1], // Personal
      done: true
    },
    {
      id: '3',
      ownerId: '',
      title: 'Estudiar Angular Signals',
      description: 'Revisar documentación de signals y computed',
      categories: [3], // Estudios
      done: false
    },
    {
      id: '4',
      ownerId: '',
      title: 'Presentación del proyecto',
      description: 'Preparar slides para la reunión de mañana',
      categories: [0, 2], // Trabajo y Urgente
      done: false
    },
    {
      id: '5',
      ownerId: '',
      title: 'Comprar víveres',
      description: 'Lista de compras para la semana',
      categories: [1], // Personal
      done: false
    },
    {
      id: '6',
      ownerId: '',
      title: 'Leer documentación de Ionic',
      description: 'Aprender sobre los nuevos componentes standalone',
      categories: [3], // Estudios
      done: false
    },
    {
      id: '7',
      ownerId: '',
      title: 'Llamar al dentista',
      description: 'Agendar cita para limpieza dental',
      categories: [1, 2], // Personal y Urgente
      done: false
    }
  ]);

  // Computed signal que usa las tareas proporcionadas o las por defecto
  private allTasks = computed(() => {
    const inputTasks = this.tasks();
    return inputTasks.length > 0 ? inputTasks : this.defaultTasks();
  });

  // Computed signal para las tareas filtradas
  filteredTasks = computed(() => {
    const tasks = this.allTasks();
    const selectedCategories = this.filterService.selectedCategories();
    const searchTerm = this.filterService.searchTerm().toLowerCase();

    let filtered = tasks;

    // Filtrar por categorías
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(task =>
        task.categories.some(categoryId => selectedCategories.includes(categoryId))
      );
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm) ||
        (task.description && task.description.toLowerCase().includes(searchTerm))
      );
    }

    return filtered;
  });

  // Computed signals para información de estado
  totalTasks = computed(() => this.allTasks().length);
  filteredCount = computed(() => this.filteredTasks().length);
  hasActiveFilters = computed(() => this.filterService.hasActiveFilters());

  constructor(public filterService: TaskFilterService) {
  }

  // Método para limpiar filtros
  clearFilters(): void {
    this.filterService.clearFilters();
  }

  // Método para manejar cambios de tareas desde task-item
  onTaskChange(updatedTask: TodoTask): void {
    this.defaultTasks.update(tasks =>
      tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  }
}
