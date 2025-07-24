import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from "../components/AuxiliarUI/header/header.component";
import { searchBarComponent } from '../components/searchBar/searchBar.component';
import { FilterComponent } from '../components/FiltersAndTags/filter/filter.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, HeaderComponent, searchBarComponent, FilterComponent],
})
export class HomePage {
  constructor() {}
}
