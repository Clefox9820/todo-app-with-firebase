// src/app/auth/signup/signup.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../../Services/auth.service';
import { SignupFormComponent, SignupFormData } from '../form/signup/signup-form.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, IonicModule, SignupFormComponent],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  error: string | null = null;
  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  async onSignupSubmit(formData: SignupFormData): Promise<void> {
    this.isLoading = true;
    this.error = null;

    try {
      // Asumiendo que tu AuthService tiene un método signup
      await this.authService.signup(formData.name, formData.email, formData.password);
      console.log('✅ Registro exitoso');
    } catch (err: any) {
      this.error = err.message || 'Error al crear la cuenta. Intenta nuevamente.';
    } finally {
      this.isLoading = false;
    }
  }
}
