// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './Services/auth.service';
import { TaskService } from './Services/task.service';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Platform } from '@ionic/angular/standalone';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {

  isReady = false;

  constructor(
    private auth: AuthService,
    private task: TaskService,
    private authState: Auth,
    private router: Router,
    private platform: Platform
  ) { }

  async ngOnInit() {
    this.auth.user$.pipe(first()).subscribe(user => {
      if (user) {
        this.router.navigateByUrl('/login');
      } else {
        this.router.navigateByUrl('/home');
      }
    });

  }

}

