import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search-bar',
  templateUrl: 'searchBar.component.html',
  styleUrls: ['searchBar.component.scss'],
  imports: [IonSearchbar],
})
export class searchBarComponent {
  constructor() {}
}
