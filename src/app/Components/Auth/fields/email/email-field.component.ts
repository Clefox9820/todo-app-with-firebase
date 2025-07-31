import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonItem, IonInput, IonLabel, IonNote } from "@ionic/angular/standalone";

@Component({
  selector: 'app-email-field',
  standalone: true,
  imports: [IonNote, IonLabel, IonInput, IonItem, CommonModule, ReactiveFormsModule, ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailFieldComponent),
      multi: true
    }
  ],
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.scss']
})
export class EmailFieldComponent implements ControlValueAccessor {
  @Input() control: AbstractControl | null = null;

  value: string = '';

  private onChange = (value: string) => { };
  private onTouched = () => { };

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
