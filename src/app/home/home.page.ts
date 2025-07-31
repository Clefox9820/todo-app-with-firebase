import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { TaskListComponent } from '../../app/components/Tasks/task-list/task-list.component';
import { TodoTask } from '../../app/interfaces/task.interface';
import { FilterComponent } from '../components/FiltersAndTags/filter/filter.component';
import { HeaderComponent } from "../components/AuxiliarUI/header/header.component";
import { searchBarComponent } from "../components/searchBar/searchBar.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonContent,
    FilterComponent,
    TaskListComponent,
    HeaderComponent,
    searchBarComponent
],
})
export class HomePage {
  // Signal para las tareas (opcional, TaskListComponent tiene sus propias tareas por defecto)
  tasks = signal<TodoTask[]>([]);

  constructor() {
    // Si quieres pasar tareas específicas desde el padre, puedes hacerlo aquí
    // this.loadTasksFromParent();
  }

  private loadTasksFromParent() {
    // Ejemplo de cómo pasar tareas desde el componente padre
    this.tasks.set([
      {
        id: '1',
        ownerId: 'user1',
        title: 'Tarea desde HomePage',
        description: 'Esta tarea viene del componente padre',
        categories: [0, 1],
        done: false
      }
    ]);
  }
}
