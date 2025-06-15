import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutheService {

    private userKey = 'user';

  private tokenKey = 'authToken';

 isLoggedIn(): boolean {
    return !!localStorage.getItem(this.userKey);
  }

  login(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
  }

  getUser(): any | null {
    const userJson = localStorage.getItem(this.userKey);
    return userJson ? JSON.parse(userJson) : null;
  }
}

