import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutheService {
  private userKey = 'user';
  private userSubject: BehaviorSubject<any>;

  constructor() {
    const savedUser = this.getUserFromStorage();
    this.userSubject = new BehaviorSubject<any>(savedUser);
  }

  private getUserFromStorage(): any | null {
    const userJson = localStorage.getItem(this.userKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  get user$() {
    return this.userSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  login(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
    this.userSubject.next(null);
  }

  getUser(): any | null {
    return this.userSubject.value;
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.userType === 'Admin';
  }
}
