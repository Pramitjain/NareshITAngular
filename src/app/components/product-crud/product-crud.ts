import { Component, ElementRef, TemplateRef, ViewChild, inject } from '@angular/core';
import { ProductCRUDService } from '../../services/product-crudservice';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faRemove, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-crud',
  imports: [FontAwesomeModule, CommonModule, ReactiveFormsModule],
  templateUrl: './product-crud.html',
  styleUrl: './product-crud.css',
})


export class ProductCRUD {
  faEdit = faEdit;
  faRemove = faRemove;
  faEye = faEye;
  faPlus = faPlus;
  searchForm: any;

  constructor(private productService: ProductCRUDService) {
    this.searchForm = new FormGroup({
      searchField: new FormControl(),
      categoryField: new FormControl('all'),
    });
  }

  ProductList$: Observable<any> | undefined;
  isVisible: boolean = false;
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  ngOnInit(): void {
    // this.getAllProducts();
    this.searchText();
  }

  getAllProducts() {
    this.ProductList$ = this.productService.getAllProducts();
  }

  deleteProduct(id: number) {}

  editProduct(id: number) {}

  addProduct() {}

  FilterProduct(event: any) {
    const value = event.target.value;
    console.log(value);
  }

  searchText() {
    const searchControl = this.searchForm.get('searchField');

    this.ProductList$ = searchControl.valueChanges.pipe(
      // Force an initial emission so the API is called on load
      startWith(searchControl.value || ''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        // Logic: If empty or whitespace, you said the API handles it!
        const cleanTerm = term ? term.trim() : '';

        // If your API returns everything for an empty string, call it directly:
        return this.productService.searchProduct(cleanTerm);
      }),
      map((response: any) => {
        // Adjust this based on your API structure (e.g., response.products)
        return response || response || response || [];
      }),
      tap((products: any[]) => {
        console.log('🇮🇳 Data loaded. Count:', products.length);
      })
    );
  }
}
