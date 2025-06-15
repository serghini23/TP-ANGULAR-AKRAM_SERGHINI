import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router : Router) { }
  redirectToUsers() : void {
    this.router.navigate(['users']); 
  }
  redirectToCatalog() : void {
    this.router.navigate(['/catalogue']); 
  }
redirectToLogin() : void {
    this.router.navigate(['/login']); 
  }
}
