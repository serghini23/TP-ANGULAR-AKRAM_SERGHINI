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
  message: string = '';

  constructor(private userService: UsersService, private router: Router) { }

 validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
signup(){
  this.router.navigate(['/register']);
}
signIn() {
  if (!this.validateEmail(this.credentials.email)) {
    this.message = '❌ Email invalide';
    return;  
  }

  this.userService.signin(this.credentials.email, this.credentials.password).subscribe({
    next: (res: any) => {
       localStorage.setItem('user', JSON.stringify(res.user));
      this.message = '✅ Login réussi : ' + res.user.firstName;
     this.router.navigate(['/login-success']);
    },
    error: () => {
      this.message = '❌ Email ou mot de passe incorrect';
    }
  });
}

}