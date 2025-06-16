import { Injectable } from '@angular/core';
import { Product } from '../../../models/Product';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((products) =>
        products.map((p: any) => new Product(
          p.productID,
          p.productTitle,
          this.parsePrice(p.productPrice),
          p.productImage,
          p.productQuantity,
          p.category,
          p.hasOffer,
          p.discountPercent,
          p.originalPrice ? this.parsePrice(p.originalPrice) : undefined
        ))
      )
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(p => new Product(
        p.productID,
        p.productTitle,
        this.parsePrice(p.productPrice),
        p.productImage,
        p.productQuantity,
        p.category,
        p.hasOffer,
        p.discountPercent,
        p.originalPrice ? this.parsePrice(p.originalPrice) : undefined
      ))
    );
  }

  reduceStock(items: Product[]): Observable<any> {
  return this.http.post('http://localhost:3000/api/products/reduce-stock', items);
}


  private parsePrice(price: string | number): number {
    if (typeof price === 'string') {
      return parseInt(price.replace(/\D/g, ''), 10); // removes DH or spaces
    }
    return price;
  }
}
