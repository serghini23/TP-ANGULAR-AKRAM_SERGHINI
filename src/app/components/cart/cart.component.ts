
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../../models/Product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  private calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      const price = Number(item.productPrice);
      const quantity = Number(item.productQuantity);
      return total + (price * quantity);
    }, 0);
  }

  updateQuantity(productId: string, newQuantity: number): void {
    if (newQuantity > 0) {
      this.cartService.updateQuantity(productId, newQuantity);
      this.calculateTotal();
    } else {
      this.removeItem(productId);
    }
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
    this.calculateTotal();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.calculateTotal();
  }
  
}
