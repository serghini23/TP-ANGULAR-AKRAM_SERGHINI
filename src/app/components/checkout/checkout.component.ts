import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CatalogService } from '../../services/catalog.service';  
import { Product } from '../../../../models/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
templateUrl: './checkout.component.html',
styleUrls: ['./checkout.component.css'],
imports : [ CommonModule]

})
export class CheckoutComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;
  stockMap: { [productId: string]: number } = {};

  constructor(
    private cartService: CartService,
    private apiService:  CatalogService ,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();

      // Fetch current stock for all products in the cart
      const stockRequests = items.map(item => this.apiService.getProducts());
      forkJoin(stockRequests).subscribe(stocks => {
        stocks.forEach((products, index) => {
          const product = products.find(p => p.productID === items[index].productID);
this.stockMap[items[index].productID] = product ? product.productQuantity : 0;
        });
      });
    });
  }

 checkStock(): boolean {
  for (const item of this.cartItems) {
    const availableStock = this.stockMap[item.productID] ?? 0;
    if (item.productQuantity > availableStock) {
      alert(`Not enough stock for "${item.productTitle}". Available: ${availableStock}, Requested: ${item.productQuantity}`);
      return false;
    }
  }
  return true;
}
 proceedToCheckout(): void {
  if (this.checkStock()) {
    // 🔽 1. Met à jour le stock via l'API
    this.apiService.reduceStock(this.cartItems).subscribe({
      next: () => {
        // 🔽 2. Vide le panier
        this.cartService.clearCart();

        // 🔽 3. Message de succès
        alert('Purchase confirmed and stock updated!');

        // 🔽 4. Redirection vers une page de succès ou autre
        this.router.navigate(['/order-success']);
      },
      error: (err) => {
        console.error('Failed to update stock', err);
        alert('An error occurred while processing your order.');
      }
    });
  }
}

  getStock(productId: string): number {
  return this.stockMap[productId] ?? 0;
}

hasStockIssues(): boolean {
  return this.cartItems.some(item => item.productQuantity > this.getStock(item.productID));
}

}
