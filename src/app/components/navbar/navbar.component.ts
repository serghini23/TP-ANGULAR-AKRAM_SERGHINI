import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { AutheService } from '../../services/authe.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router : Router , public authService: AutheService, private cartService: CartService) { }
  cartItemCount: number = 0;
    isAdmin = false;


  ngOnInit(): void {
        this.isAdmin = this.authService.isAdmin();

    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = this.cartService.getTotalItems();
    });
  }


  redirectManagement() : void {
    this.router.navigate(['management']); 
  }
  redirectToCatalog() : void {
    this.router.navigate(['/catalogue']); 
  }
redirectToLogin() : void {
    this.router.navigate(['/login']); 
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  redirectToCart(): void {
    this.router.navigate(['/cart']);
  }
}