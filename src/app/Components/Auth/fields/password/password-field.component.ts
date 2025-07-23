// src/app/auth/fields/password-field/password-field.component.ts
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-field',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordFieldComponent),
      multi: true
    }
  ],
  template: `
    <ion-item>
      <ion-label position="floating">Contraseña</ion-label>
      <ion-input
        [type]="showPassword ? 'text' : 'password'"
        [value]="value"
        (ionInput)="onInput($event)"
        (ionBlur)="onBlur()">
      </ion-input>
      <ion-button
        fill="clear"
        slot="end"
        (click)="togglePassword()">
        <ion-icon
          [name]="showPassword ? 'eye-off' : 'eye'"
          slot="icon-only">
        </ion-icon>
      </ion-button>
    </ion-item>

    <ion-note
      slot="error"
      color="danger"
      *ngIf="control?.hasError('required') && control?.touched">
      Contraseña requerida
    </ion-note>
  `,
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent implements ControlValueAccessor {
  @Input() control: AbstractControl | null = null;

  value: string = '';
  showPassword: boolean = false;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  onInput(event: any): void {
    this.value = event.detail.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implementar si necesitas manejar estado disabled
  }
}
