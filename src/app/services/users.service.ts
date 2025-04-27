import { Injectable } from '@angular/core';
import { User ,UserType } from '../../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService  {
constructor() { }
users : User[] = 
[
  new User(1, "John", "Doe", 25,UserType.Admin),
  new User(2, " Serghini ", "Akram", 23,UserType.Membre),
  new User(3, "John", "Doe", 21,UserType.Guest),
]

getUsers(): User[] {

  return this.users;
}}
