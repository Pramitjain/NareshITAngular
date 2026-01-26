import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../../Models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductCRUDService {
  constructor(private httpcalls: HttpClient) {}

  baseUrl='https://documentupload-bmdpgcethje9c3bn.centralus-01.azurewebsites.net/api/';
  token = localStorage.getItem('bearerToken'); 
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  getAllProducts(){
    // return this.httpcalls.get(this.baseUrl + 'product/GetProducts');
    return this.httpcalls.get(`${this.baseUrl}product/GetProducts`, { headers: this.headers });
  }

  addProducts(ProdObj:any ){
    return this.httpcalls.post(`${this.baseUrl}product/UpdateProduct`,ProdObj, { headers: this.headers });
  }

  updateProduct(UserObj: any) {
    return this.httpcalls.patch(`${this.baseUrl}product/UpdateProduct`, UserObj, { headers: this.headers });
  }

  getProductById(id: number) {
    return this.httpcalls.get<IProduct>(`${this.baseUrl}product/GetProductById/${id}`, { headers: this.headers });
  }

  searchProduct(term: string) {
    return this.httpcalls.get<any>(`${this.baseUrl}product/SearchProducts?searchText=${term}`, { headers: this.headers });
  }

}
