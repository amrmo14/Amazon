import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnChanges {
  users: IUser[] = [];
  constructor(private userServ: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }
  ngOnChanges(): void {
    this.getUsers();
  }
  getUsers() {
    this.userServ.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
  addNewUser() {
    this.router.navigateByUrl('users/newUser');
  }
  deleteUser(userId: number) {
    let Is_Deleted = confirm('Are Your sure you want to delete this user ?');
    if (Is_Deleted) {
      this.userServ.deleteUser(userId).subscribe((data) => {
        console.log(data);
      });
    }
  }

  getUser(query: any) {
    query = isNaN(query) ? query : Number(query);
    console.log('type of ', typeof query);
    this.userServ.getUser(query).subscribe((data) => {
      console.log(typeof data);
      console.log(data);
    });
  }
}
