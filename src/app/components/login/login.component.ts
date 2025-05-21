import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 credentials: any = { email: '', password: '' };
  signInError: boolean = false;

  constructor(private userService: UsersService, private router: Router) { }

  signIn() {
    this.signInError = false;
      if (this.userService.signin(this.credentials)) {
        this.router.navigate(['/']);
      } else {
        this.signInError = true;
      }
    
  }
}
