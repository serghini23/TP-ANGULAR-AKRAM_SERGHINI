import { Component, Input } from '@angular/core';
import { Product } from '../../../../models/Product';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item',
  imports: [ RouterModule, CommonModule], 
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product : Product |undefined 
   isAddingToCart = false;




  constructor(private router: Router ,  private cartService: CartService) { 
    
  }

  redirectToDetails() : void {
    console.log(this.product?.productID);
    
    this.router.navigate(['/details', this.product?.productID]);
  }
  addToCart(): void {
    
  if (this.product && this.product.productQuantity > 0) {
    this.isAddingToCart = true;
    this.cartService.addToCart(this.product);
      
      
      setTimeout(() => {
        this.isAddingToCart = false;
      }, 500);
    }
  }

}