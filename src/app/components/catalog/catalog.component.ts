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
    this.products = this.catalogService.getProducts().filter(
      product => product.productQuantity > 0
    );
  }
}

