import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButton, IonIcon, IonButtons } from "@ionic/angular/standalone";
import { AuthService } from 'src/app/Services/auth.service';
import { LoginFormData } from '../../Auth/form/login/login-form.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonButtons, IonIcon, IonTitle, IonToolbar, IonHeader, IonButton],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  isAuthenticated$: Observable<boolean>;
  authService = inject(AuthService);

  error: string | null = null;


  constructor() {
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }


  ngOnInit() { }

  async onLogout() {
    this.error = null;
    try {
      await this.authService.logout();
      await this.router.navigateByUrl('/login');
    } catch (err: any) {
      this.error = err.message;
    }
  }

}
