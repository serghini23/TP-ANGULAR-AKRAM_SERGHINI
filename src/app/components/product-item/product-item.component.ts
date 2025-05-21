import { Component, Input } from '@angular/core';
import { Product } from '../../../../models/Product';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-item',
  imports: [ RouterModule, CommonModule], 
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product : Product |undefined 


  constructor(private router: Router) { }

  redirectToDetails() : void {
    console.log(this.product?.productID);
    
    this.router.navigate(['/details', this.product?.productID]);
  }

}
