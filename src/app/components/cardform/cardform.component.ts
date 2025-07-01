import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardform',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cardform.component.html',
  styleUrls: ['./cardform.component.css'] 
})
export class CardformComponent {
  constructor(private router: Router) {}

  card = {
    cardHolder: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  cardType: string = '';

  @Output() onSubmit = new EventEmitter<typeof this.card>();

  detectCardType() {
    const number = this.card.cardNumber.replace(/\s+/g, '');

    if (/^4/.test(number)) {
      this.cardType = 'visa';
    } else if (/^5[1-5]/.test(number)) {
      this.cardType = 'mastercard';
    } else if (/^3[47]/.test(number)) {
      this.cardType = 'amex';
    } else {
      this.cardType = '';
    }

    this.card.cardNumber = number
      .replace(/\D/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim();
  }

  submitForm() {
    this.onSubmit.emit(this.card);

    // Reset form
    this.card = { cardHolder: '', cardNumber: '', expiry: '', cvv: '' };
    this.cardType = '';
  }

  redirectToThanks() {
    this.router.navigate(['/thanks']);
  }
}
