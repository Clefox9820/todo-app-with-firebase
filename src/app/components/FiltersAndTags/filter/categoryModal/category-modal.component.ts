// src/app/components/category-modal/category-modal.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
  IonButtons, IonIcon, ModalController, IonChip
} from '@ionic/angular/standalone';

export interface CategoryModalData {
  mode: 'create' | 'edit';
  category?: {
    id: number;
    name: string;
    color: string;
  };
}

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
    IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
    IonButtons, IonIcon, IonChip
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          {{ isEditMode ? 'Editar Categoría' : 'Nueva Categoría' }}
        </ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">
            <ion-icon name="close"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="modal-content">
        <ion-item>
          <ion-label position="stacked">Nombre de la categoría</ion-label>
          <ion-input
            [(ngModel)]="categoryName"
            placeholder="Ej: Trabajo, Personal, Urgente"
            type="text">
          </ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Color</ion-label>
          <ion-select
            [(ngModel)]="selectedColor"
            placeholder="Selecciona un color"
            interface="popover">
            <ion-select-option value="primary">🔵 Principal</ion-select-option>
            <ion-select-option value="secondary">🟣 Secundario</ion-select-option>
            <ion-select-option value="tertiary">🟡 Terciario</ion-select-option>
            <ion-select-option value="success">🟢 Éxito</ion-select-option>
            <ion-select-option value="warning">🟠 Advertencia</ion-select-option>
            <ion-select-option value="danger">🔴 Peligro</ion-select-option>
            <ion-select-option value="dark">⚫ Oscuro</ion-select-option>
            <ion-select-option value="medium">🔘 Medio</ion-select-option>
            <ion-select-option value="light">⚪ Claro</ion-select-option>
          </ion-select>
        </ion-item>

        <!-- Preview del chip -->
        <div class="preview-section">
          <ion-label>Vista previa:</ion-label>
          <ion-chip [color]="selectedColor" class="preview-chip">
            <ion-icon name="checkmark" slot="start"></ion-icon>
            {{ categoryName || 'Nombre de categoría' }}
          </ion-chip>
        </div>

        <div class="buttons-container">
          <ion-button
            fill="clear"
            (click)="dismiss()">
            Cancelar
          </ion-button>

          <ion-button
            *ngIf="isEditMode"
            fill="solid"
            color="danger"
            (click)="deleteCategory()">
            Eliminar
          </ion-button>

          <ion-button
            fill="solid"
            (click)="saveCategory()"
            [disabled]="!categoryName?.trim()">
            {{ isEditMode ? 'Guardar' : 'Crear' }}
          </ion-button>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .modal-content {
      padding: 20px;
    }

    .preview-section {
      margin: 20px 0;
      padding: 16px;
      background: var(--ion-color-light);
      border-radius: 12px;
      text-align: center;
    }

    .preview-chip {
      margin-top: 12px;
      transform: scale(1.1);
    }

    .buttons-container {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid var(--ion-color-light);
    }

    ion-item {
      --background: transparent;
      --border-color: var(--ion-color-light);
      margin-bottom: 16px;
    }
  `]
})
export class CategoryModalComponent {
  categoryName: string = '';
  selectedColor: string = 'primary';
  isEditMode: boolean = false;
  categoryId?: number;

  constructor(private modalController: ModalController) {
  }

  ionViewWillEnter() {
    // Si estamos en modo edición, cargar los datos
    const data = history.state?.modalData as CategoryModalData;
    if (data?.mode === 'edit' && data.category) {
      this.isEditMode = true;
      this.categoryId = data.category.id;
      this.categoryName = data.category.name;
      this.selectedColor = data.category.color;
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  saveCategory() {
    if (!this.categoryName?.trim()) return;

    this.modalController.dismiss({
      action: this.isEditMode ? 'edit' : 'create',
      data: {
        id: this.categoryId,
        name: this.categoryName.trim(),
        color: this.selectedColor
      }
    });
  }

  deleteCategory() {
    this.modalController.dismiss({
      action: 'delete',
      data: { id: this.categoryId }
    });
  }
}
