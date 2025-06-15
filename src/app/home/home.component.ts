import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
constructor(private router: Router) {
}
redierctToLogin(): void {
  this.router.navigate(['/login']); }
redierctToCatalog(): void {
  this.router.navigate(['/catalogue']);
}
}
