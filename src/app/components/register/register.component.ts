import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
   styleUrls: ['./register.component.css'],
  imports: [CommonModule , FormsModule]
})
export class RegisterComponent {
  form = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: '',
    address: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    // Vérifie que le userType est défini (tu peux aussi faire ça dans le formulaire)
    if (!this.form.userType) {
      alert('Veuillez sélectionner un rôle');
      return;
    }

    this.http.post('http://localhost:3000/api/users/register', this.form)
      .subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          alert('Inscription réussie !');
          // Reset formulaire si tu veux
          this.form = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            userType: '',
            address: ''
          };
        },
        error: (err) => {
          console.error('Erreur lors de l\'inscription', err);
          alert(err.error?.message || 'Erreur lors de l\'inscription');
        }
      });
  }
}

