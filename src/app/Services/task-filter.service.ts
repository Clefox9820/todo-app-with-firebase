import { Injectable, signal, computed } from '@angular/core';
import { Category } from '../interfaces/category.interface';
import { TodoTask } from '../interfaces/task.interface';

export interface FilterState {
  selectedCategories: number[];
  searchTerm?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskFilterService {
  // Signals para el estado
  private _selectedCategories = signal<number[]>([]);
  private _searchTerm = signal<string>('');

  // Categorías disponibles (inicialmente fijas, luego dinámicas)
  private _categories = signal<Category[]>([
    { id: 0, name: 'Trabajo', color: 'primary' },
    { id: 1, name: 'Personal', color: 'secondary' },
    { id: 2, name: 'Urgente', color: 'danger' },
    { id: 3, name: 'Estudios', color: 'tertiary' }
  ]);

  // Signals públicos de solo lectura
  readonly selectedCategories = this._selectedCategories.asReadonly();
  readonly searchTerm = this._searchTerm.asReadonly();
  readonly categories = this._categories.asReadonly();

  // Computed signal para el estado de filtros
  readonly filterState = computed<FilterState>(() => ({
    selectedCategories: this._selectedCategories(),
    searchTerm: this._searchTerm()
  }));

  // Computed signal para verificar si hay filtros activos
  readonly hasActiveFilters = computed(() =>
    this._selectedCategories().length > 0 || this._searchTerm().length > 0
  );

  // Métodos para filtros
  updateSelectedCategories(categories: number[]): void {
    this._selectedCategories.set(categories);
  }

  toggleCategory(categoryId: number): void {
    const current = this._selectedCategories();
    const index = current.indexOf(categoryId);

    if (index > -1) {
      // Remover categoría
      this._selectedCategories.set(current.filter(id => id !== categoryId));
    } else {
      // Agregar categoría
      this._selectedCategories.set([...current, categoryId]);
    }
  }

  updateSearchTerm(term: string): void {
    this._searchTerm.set(term);
  }

  clearFilters(): void {
    this._selectedCategories.set([]);
    this._searchTerm.set('');
  }

  // Métodos para gestionar categorías dinámicas
  addCategory(name: string, color: string = 'medium'): void {
    const currentCategories = this._categories();
    const newId = Math.max(...currentCategories.map(c => c.id), -1) + 1;

    const newCategory: Category = {
      id: newId,
      name: name.trim(),
      color,
      createdAt: new Date()
    };

    this._categories.set([...currentCategories, newCategory]);
  }

  updateCategory(id: number, name: string, color?: string): void {
    const currentCategories = this._categories();
    const updatedCategories = currentCategories.map(category =>
      category.id === id
        ? { ...category, name: name.trim(), color: color || category.color }
        : category
    );
    this._categories.set(updatedCategories);
  }

  deleteCategory(id: number): void {
    const currentCategories = this._categories();
    const filteredCategories = currentCategories.filter(category => category.id !== id);
    this._categories.set(filteredCategories);

    // Remover de filtros activos si estaba seleccionada
    const currentSelected = this._selectedCategories();
    const updatedSelected = currentSelected.filter(catId => catId !== id);

    if (updatedSelected.length !== currentSelected.length) {
      this._selectedCategories.set(updatedSelected);
    }
  }

  getCategoryName(id: number): string {
    const category = this._categories().find(c => c.id === id);
    return category?.name || 'Sin categoría';
  }

  getCategoryColor(id: number): string {
    const category = this._categories().find(c => c.id === id);
    return category?.color || 'medium';
  }

  // Computed signal para filtrar tareas
  getFilteredTasks = (tasks: TodoTask[]) => computed(() => {
    const allTasks = tasks;
    const selectedCats = this._selectedCategories();
    const searchTerm = this._searchTerm().toLowerCase();

    let filtered = allTasks;

    // Filtrar por categorías
    if (selectedCats.length > 0) {
      filtered = filtered.filter(task =>
        task.categories.some(categoryId => selectedCats.includes(categoryId))
      );
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm) ||
        (task.description && task.description.toLowerCase().includes(searchTerm))
      );
    }

    return filtered;
  });
}
