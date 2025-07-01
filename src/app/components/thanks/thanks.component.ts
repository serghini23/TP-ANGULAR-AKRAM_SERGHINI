import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']  
})
export class ThanksComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  redirectToCatalog(): void {
    this.router.navigate(['/catalogue']);
  }
}
