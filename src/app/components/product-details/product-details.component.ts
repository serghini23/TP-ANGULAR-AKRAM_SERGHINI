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
    private router : Router,
    private route: ActivatedRoute, 
    private catalogService: CatalogService 
  ) { }
     
  redirectToCatalog() : void {
    this.router.navigate(['/']); 
  }


  ngOnInit() : void {
    const productId = this.route.snapshot.paramMap.get('id'); 
    if (productId) {
      this.catalogService.getProductById(productId).subscribe({
        next: (data) => {this.product = data; console.log(data);
        }
      ,}); 
    }
  }

}
