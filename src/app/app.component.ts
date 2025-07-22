// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './Services/auth.service';
import { TaskService } from './Services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private task: TaskService
  ) {}

  ngOnInit() {

  }
}
