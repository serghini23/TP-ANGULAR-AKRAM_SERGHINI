import { Injectable } from '@angular/core';
import { User ,UserType } from '../../../models/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService  {
constructor( private http:HttpClient) { }
  private apiUrl = 'http://localhost:3000/api/users';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
       
  signin(credentials:any): boolean {
    if (credentials.email === 'admin@gmail.com' && credentials.password === 'admin') {
      return true;
    }
    return false;
  }
}
