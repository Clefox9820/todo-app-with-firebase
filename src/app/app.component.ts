// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './Services/auth.service';
import { TaskService } from './Services/task.service';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private task: TaskService,
    private authState: Auth,
    private router: Router
  ) { }

 ngOnInit() {
    this.auth.user$.pipe(first()).subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

}

