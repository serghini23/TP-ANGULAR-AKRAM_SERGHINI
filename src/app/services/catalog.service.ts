import { Injectable } from '@angular/core';
import { Product } from '../../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor() { }

  products : Product[] = [
    new Product(1, "Iphone",  15460 , "assets/images/iphone.png",10),
    new Product(2, " redmi", 5000 , "assets/images/s10e.png",0),
    new Product(3, "Samsung", 9000 , "assets/images/s10e.png",6),

  ]

  getProducts() : Product[] {
    return this.products;
  }

  getProductById(id : number) : Product | undefined {
    return this.products.find(product => product.productID === id);
  }


}
// 