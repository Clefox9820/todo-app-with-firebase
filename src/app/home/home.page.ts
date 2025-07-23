import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from "../components/AuxiliarUI/header/header.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, HeaderComponent],
})
export class HomePage {
  constructor() {}
}
