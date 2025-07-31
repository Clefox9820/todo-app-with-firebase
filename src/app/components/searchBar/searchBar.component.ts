import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar } from '@ionic/angular/standalone';
import { TaskFilterService } from 'src/app/Services/task-filter.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: 'searchBar.component.html',
  styleUrls: ['searchBar.component.scss'],
  imports: [IonSearchbar],
})
export class searchBarComponent {
  constructor(public filterService: TaskFilterService) { }
  onSearchChange(event: any): void {
    const searchTerm = event.target.value || '';
    this.filterService.updateSearchTerm(searchTerm);
  }
}
