import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  constructor(private userServ: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userServ.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
