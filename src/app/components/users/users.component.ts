import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnChanges {
  users: any[]=[];
  user : any;
  searchType: string = '';
  constructor(private userServ: UsersService, private router: Router,private db: AngularFirestore) {
    console.log(this.searchType);
  }

  ngOnInit(): void {
    this.getUsers();
    console.log(this.users)
  }
  ngOnChanges(): void {
    this.getUsers();
  }
  getUsers() {
    // this.userServ.getUsers().subscribe((data) => {
    //   this.users = data;
    // });
    this.db.collection("users").get().subscribe(doc => {
      doc.docs.forEach(user => {
        this.user = user.data();
        this.user.id=user.id
        this.users.push(this.user)
      })
    })
  }

  deleteUser(userId: number) {
    let Is_Deleted = confirm('Are Your sure you want to delete this user ?');
    if (Is_Deleted) {
      // this.userServ.deleteUser(userId).subscribe((data) => {
      //   console.log(data);
      //   this.getUsers();
      // });
      this.user = this.users.find(user => userId==user.id);
      this.db.collection('users').doc(this.user.id).delete();
      this.users.splice(this.users.indexOf(this.user),1)
    }
  
  }

  getUser(search: string, query: any) {
    // this.userServ.getUser(search, query).subscribe((data) => {
    //   this.users = data;
    // });
    if(search==""){
      search="name"
    }
    var regex = new RegExp(query, 'gi');
    let founded = this.users.filter(user =>
      // console.log(user,search);
      user[search].match(regex));
      console.log(founded)
    if (founded) {

      this.users = [];
      founded.forEach(user => {
        this.user = user

        this.users = [...this.users, this.user]
        console.log(this.users)
      })
    }
    else {
      alert("Not found")
    }
  }
  editUser(id: number) {
    this.router.navigate(['users', id]);
  }
}
