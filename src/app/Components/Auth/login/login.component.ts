// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../../Services/auth.service';
import { FormComponent, LoginFormData } from '../form/form.component';

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

  constructor(private authService: AuthService) {}

  async onLoginSubmit(formData: LoginFormData): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      await this.authService.login(formData.email, formData.password);
      console.log('✅ Login exitoso');
    } catch (err: any) {
      this.error = err.message || 'Correo Electronico o Contraseña incorrectos';
    } finally {
      this.isLoading = false;
    }
  }
}
