// src/app/auth/fields/confirm-password-field/confirm-password-field.component.ts
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirm-password-field',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConfirmPasswordFieldComponent),
      multi: true
    }
  ],
  templateUrl: './confirm-password-field.component.html',
  styleUrls: ['./confirm-password-field.component.scss']
})
export class ConfirmPasswordFieldComponent implements ControlValueAccessor {
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
