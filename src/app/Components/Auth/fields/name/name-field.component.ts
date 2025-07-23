// src/app/auth/fields/name-field/name-field.component.ts
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-name-field',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NameFieldComponent),
      multi: true
    }
  ],
  template: `
    <ion-item>
      <ion-label position="floating">Nombre completo</ion-label>
      <ion-input
        type="text"
        [value]="value"
        (ionInput)="onInput($event)"
        (ionBlur)="onBlur()">
      </ion-input>
    </ion-item>

    <ion-note
      slot="error"
      color="danger"
      *ngIf="control?.hasError('required') && control?.touched">
      El nombre es obligatorio
    </ion-note>

    <ion-note
      slot="error"
      color="danger"
      *ngIf="control?.hasError('minlength') && control?.touched">
      El nombre debe tener al menos 2 caracteres
    </ion-note>
  `,
  styleUrls: ['./name-field.component.scss']
})
export class NameFieldComponent implements ControlValueAccessor {
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
