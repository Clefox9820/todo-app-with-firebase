// src/app/auth/form/login-form/login-form.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { EmailFieldComponent } from '../fields/email/email-field.component';
import { PasswordFieldComponent } from '../fields/password/password-field.component';

export interface LoginFormData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    EmailFieldComponent,
    PasswordFieldComponent
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() error: string | null = null;
  @Input() isLoading: boolean = false;
  @Output() formSubmit = new EventEmitter<LoginFormData>();

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const formData: LoginFormData = this.loginForm.value;
    this.formSubmit.emit(formData);
  }
}
