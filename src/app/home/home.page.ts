import { Component, model } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonCheckbox, IonFooter, IonFab, IonFabButton, IonIcon, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from "../components/AuxiliarUI/header/header.component";
import { FilterComponent } from '../components/FiltersAndTags/filter/filter.component';
import { TaskListComponent } from "../components/Tasks/task-list/task-list.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonIcon, IonFabButton, IonFab, IonFooter, IonCheckbox, IonContent, HeaderComponent, IonSearchbar, FilterComponent, IonHeader, IonToolbar, IonTitle, TaskListComponent, IonButton],
})
export class HomePage {
  
selectAll = model(false)


  constructor() {}
}
