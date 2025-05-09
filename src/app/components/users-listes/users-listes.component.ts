import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/User';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { UserItemComponent } from '../user-item/user-item.component';

@Component({
  selector: 'app-users-listes',
  imports: [CommonModule , UserItemComponent],
  templateUrl: './users-listes.component.html',
  styleUrl: './users-listes.component.css'
})
export class UsersListesComponent implements OnInit {
  users: User [] = [];

  constructor(
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
    

}}
