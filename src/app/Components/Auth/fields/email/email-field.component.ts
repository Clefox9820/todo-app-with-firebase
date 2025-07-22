// src/app/auth/fields/email-field/email-field.component.ts
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-field',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailFieldComponent),
      multi: true
    }
  ],
  template: `
    <ion-item>
      <ion-label position="floating">Correo electrónico</ion-label>
      <ion-input
        type="email"
        [value]="value"
        (ionInput)="onInput($event)"
        (ionBlur)="onBlur()">
      </ion-input>
    </ion-item>

    <ion-note
      slot="error"
      color="danger"
      *ngIf="control?.hasError('required') && control?.touched">
      Email es obligatorio
    </ion-note>

    <ion-note
      slot="error"
      color="danger"
      *ngIf="control?.hasError('email') && control?.touched">
      Ingresa un correo válido
    </ion-note>
  `,
  styleUrls: ['./email-field.component.scss']
})
export class EmailFieldComponent implements ControlValueAccessor {
  @Input() control: AbstractControl | null = null;

  value: string = '';

  private onChange = (value: string) => {};
  private onTouched = () => {};

  onInput(event: any): void {
    this.value = event.detail.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
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
