import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { AutheService } from '../../services/authe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router : Router , public authService: AutheService,) { }
  redirectToUsers() : void {
    this.router.navigate(['users']); 
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
}
