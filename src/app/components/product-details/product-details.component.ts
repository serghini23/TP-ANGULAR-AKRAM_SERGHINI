import { Component, Input } from '@angular/core';
import { Product } from '../../../../models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../../services/catalog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  product : Product | undefined;

  constructor(
    private route: ActivatedRoute, 
    private catalogService: CatalogService 
  ) { }


  ngOnInit() : void {
    const productId = Number(this.route.snapshot.paramMap.get('id')); 
    if (productId) {
      this.product = this.catalogService.getProductById(productId); 
    }}

}
