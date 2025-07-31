import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonButton, IonChip, IonIcon,
  IonSearchbar,
  AlertController,
} from '@ionic/angular/standalone';
import { TaskFilterService } from '../../../Services/task-filter.service';
import { Category } from '../../../interfaces/category.interface';
import { searchBarComponent } from "../../searchBar/searchBar.component";
import { ModalController } from '@ionic/angular/standalone';
import { CategoryModalComponent } from '../../FiltersAndTags/filter/categoryModal/category-modal.component';
@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonButton, IonChip, IonIcon, IonSearchbar,
    searchBarComponent
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  constructor(
    public filterService: TaskFilterService,
    private alertController: AlertController,
    private modalController: ModalController // Agregar esto
  ) {
  }
  ngOnInit(): void {

  }

  toggleCategory(categoryId: number): void {
    this.filterService.toggleCategory(categoryId);
  }

  isSelected(categoryId: number): boolean {
    return this.filterService.selectedCategories().includes(categoryId);
  }

  onSearchChange(event: any): void {
    const searchTerm = event.target.value || '';
    this.filterService.updateSearchTerm(searchTerm);
  }

  clearAllFilters(): void {
    this.filterService.clearFilters();
  }

  async showAddCategoryAlert() {
    const alert = await this.alertController.create({
      header: 'Nueva Categoría',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre de la categoría'
        },
        {
          name: 'color',
          type: 'text',
          placeholder: 'Color (principal, secundario, etc.)'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Crear',
          handler: (data) => {
            if (data.name && data.name.trim()) {
              this.filterService.addCategory(data.name, data.color || 'primary');
              return true;
            }
            return false;
          }
        }
      ]
    });

    await alert.present();
  }

  async editCategory(event: Event, category: Category) {
    event.stopPropagation();

    const alert = await this.alertController.create({
      header: 'Editar Categoría',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: category.name,
          placeholder: 'Nombre de la categoría'
        },
        {
          name: 'color',
          type: 'text',
          value: category.color,
          placeholder: 'Color'
        }
      ],
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.confirmDeleteCategory(category);
            return false;
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.name && data.name.trim()) {
              this.filterService.updateCategory(category.id, data.name, data.color);
              return true;
            }
            return false;
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmDeleteCategory(category: Category) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de eliminar la categoría "${category.name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.filterService.deleteCategory(category.id);
          }
        }
      ]
    });

    await alert.present();
  }
}
