// src/app/auth/form/signup-form/signup-form.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NameFieldComponent } from '../../fields/name/name-field.component';
import { EmailFieldComponent } from '../../fields/email/email-field.component';
import { PasswordFieldComponent } from '../../fields/password/password-field.component';
import { ConfirmPasswordFieldComponent } from '../../fields/confirm-password/confirm-password-field.component';
import { RouterLink } from '@angular/router';


export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Custom validator para confirmar contraseña
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  } else {
    // Limpiar el error si las contraseñas coinciden
    if (confirmPassword.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null);
    }
  }

  return null;
}

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    NameFieldComponent,
    EmailFieldComponent,
    PasswordFieldComponent,
    ConfirmPasswordFieldComponent,
    RouterLink
  ],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
  @Input() error: string | null = null;
  @Input() isLoading: boolean = false;
  @Output() formSubmit = new EventEmitter<SignupFormData>();

  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) return;

    const formData: SignupFormData = this.signupForm.value;
    this.formSubmit.emit(formData);
  }
}
