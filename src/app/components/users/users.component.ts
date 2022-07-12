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
  users!: IUser[];
  searchType: string = '';
  constructor(private userServ: UsersService, private router: Router) {
    console.log(this.searchType);
  }

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

  deleteUser(userId: number) {
    let Is_Deleted = confirm('Are Your sure you want to delete this user ?');
    if (Is_Deleted) {
      this.userServ.deleteUser(userId).subscribe((data) => {
        console.log(data);
      });
    }
  }

  getUser(search: string, query: any) {
    this.userServ.getUser(search, query).subscribe((data) => {
      this.users = data;
    });
  }
  editUser(id: number) {
    this.router.navigate(['users', id]);
  }
}
