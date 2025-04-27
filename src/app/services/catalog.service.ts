import { Injectable } from '@angular/core';
import { Product } from '../../../models/Product';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http :HttpClient) { }

  private apiUrl = 'http://localhost:3000/api/products';


  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id : string) : Observable<Product> {
    return this.http.get<Product[]>(`${this.apiUrl}/${id}`).pipe(
      map(products => products[0]) 
    );
  }
  


}
// 