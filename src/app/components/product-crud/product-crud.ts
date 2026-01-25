import { Component,ElementRef, ViewChild } from '@angular/core';
import { ProductCRUDService } from '../../services/product-crudservice';
import { Observable, debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { IProduct } from '../../../Models/IProduct';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faRemove, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private productService: ProductCRUDService, private HttpCalls:HttpClient) {}

  ProductList$: Observable<any> | undefined;
  isVisible: boolean = false;
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.ProductList$ = this.productService.getAllProducts();
  }
  
  deleteProduct(id: number) {}

  editProduct(id: number){}

  addProduct(){}
  FilterProduct(event: any) {
    const value = event.target.value;
    console.log(value);
    
  }

   token = localStorage.getItem('bearerToken'); 

  // 2. Create the headers object
   headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });
  
  searchText() {
    this.ProductList$ = this.searchForm.get("searchField").valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (!term.trim()) return of([]); // Return empty array if no text
  
        // Clean and simple: call the service method
        return this.productService.searchProduct(term);
      }),
      map((response: any) => {
        // Return the users array or empty array if null
        return response?.users || [];
      })
    );
  }

}
