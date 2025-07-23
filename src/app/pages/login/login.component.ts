// src/app/auth/login/login.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../Services/auth.service';
import { FormComponent, LoginFormData } from '../../components/Auth/form/login/login-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IonicModule, FormComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  error: string | null = null;
  isLoading: boolean = false;

  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() { }

  onFormSubmit(data: LoginFormData) {
    this.error = null;
    this.isLoading = true;

    this.authService.login(data.email, data.password)
      .then(() => this.router.navigateByUrl('/home', { replaceUrl: true }))
      .catch(err => this.error = "Error al iniciar sesión. Intenta nuevamente.")
      .finally(() => this.isLoading = false);
  }
}
