import { Injectable } from '@angular/core';
import { Product } from '../../../models/Product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);
  private readonly CART_STORAGE_KEY = 'shopping_cart';

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        this.cartItems = parsedCart.map((item: any) => {
          const product = new Product(
            item._productID,
            item._productTitle,
            item._productPrice,
            item._productImage,
            item._quantity,
            item._category
          );
          return product;
        });
        this.cartSubject.next(this.cartItems);
      } catch (error) {
        console.error('Error loading cart from storage:', error);
        this.cartItems = [];
      }
    }
  }

  private saveCartToStorage(): void {
    const itemsToStore = this.cartItems.map(item => ({
      _productID: item.productID,
      _productTitle: item.productTitle,
      _productPrice: item.productPrice,
      _productImage: item.productImage,
      _quantity: item.productQuantity,
      _category: item.category
    }));
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(itemsToStore));
  }

  getCartItems(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.productID === product.productID);
    
    if (existingItem) {
      existingItem.productQuantity += 1;
    } else {
      const newItem = new Product(
        product.productID,
        product.productTitle,
        product.productPrice,
        product.productImage,
        1,
        product.category
      );
      this.cartItems.push(newItem);
    }
    
    this.cartSubject.next(this.cartItems);
    this.saveCartToStorage();
  }

  removeFromCart(productId: string): void {
    this.cartItems = this.cartItems.filter(item => item.productID !== productId);
    this.cartSubject.next(this.cartItems);
    this.saveCartToStorage();
  }

  updateQuantity(productId: string, quantity: number): void {
    const item = this.cartItems.find(item => item.productID === productId);
    if (item) {
      item.productQuantity = quantity;
      this.cartSubject.next(this.cartItems);
      this.saveCartToStorage();
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
    this.saveCartToStorage();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.productPrice * item.productQuantity);
    }, 0);
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.productQuantity, 0);
  }
}