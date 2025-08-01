import { Component, OnInit } from '@angular/core';
import { IonList, IonItem, IonSelect, IonSelectOption, IonCheckbox, IonSearchbar } from "@ionic/angular/standalone";

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  imports: [IonSearchbar, IonCheckbox, IonList, IonItem, IonSelect, IonSelectOption],
  standalone: true,
})
export class FilterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
