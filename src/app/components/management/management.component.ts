import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/Product';
import { CatalogService } from '../../services/catalog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  imports: [CommonModule],
})
export class ManagementComponent implements OnInit {
  products: Product[] = [];

  constructor(private catalogService: CatalogService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.catalogService.getProducts().subscribe(data => this.products = data);
  }

  deleteProduct(productId: string) {
    if(confirm('Are you sure you want to delete this product?')) {
      this.catalogService.deleteProduct(productId).subscribe(() => this.loadProducts());
    }
  }
addProduct() {
  const newProduct = new Product(
    'new-id',          
    'New Product',     
    0,                 
    'default.jpg',     
    0,                
    'General',         
    false,             
    0,                 
    0                  
  );

  this.catalogService.addProduct(newProduct).subscribe(() => this.loadProducts());
}

}