import { Component, model, OnInit, signal } from '@angular/core';
import { IonList, IonItem, IonSelect, IonSelectOption, IonSearchbar } from "@ionic/angular/standalone";
import { CheckboxWrapperSignalComponent } from "./checkbox/checkboxSelectAll.component";

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  imports: [IonSearchbar, IonList, IonItem, IonSelect, IonSelectOption, CheckboxWrapperSignalComponent],
  standalone: true,
})
export class FilterComponent implements OnInit {
selectAll = model(false)




  constructor() { }

  ngOnInit() { }

}
