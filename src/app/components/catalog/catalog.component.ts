import { Component, OnInit } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { Product } from '../../../../models/Product';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../../component/product-item/product-item.component';

@Component({
  selector: 'app-catalog',
  imports: [CommonModule , ProductItemComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.catalogService.getProducts().subscribe({
      next: (data) => {
        this.products = data.filter((product) => product.productQuantity > 0);         
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
      complete: () => {
        console.log('Product fetching completed');
      }
    })
  }
}

