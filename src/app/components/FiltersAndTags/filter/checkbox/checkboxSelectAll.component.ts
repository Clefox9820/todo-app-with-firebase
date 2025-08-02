import { Component, model, output } from '@angular/core';
import { IonCheckbox } from "@ionic/angular/standalone";

@Component({
  selector: 'checkbox-select-all',
  template: `
    <ion-checkbox labelPlacement="start" justify="end" checked="true" class="ion-margin-end"
      [checked]="checked"  (ionChange)="checked.set($event.detail.checked)"
    >    Seleccionar todo
</ion-checkbox>
  `,
  imports: [IonCheckbox]
})
export class CheckboxWrapperSignalComponent {
  checked = model<boolean>(false);
}
