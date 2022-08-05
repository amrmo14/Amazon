import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isUserlogged :boolean=false;
  user : any;
  constructor(private db :AngularFirestore ,private router:Router) {


   }

  ngOnInit(): void {
  }
  login(email:string,password:string){

    this.db.collection("admins").get().subscribe(doc => {
      doc.docs.forEach(user => {
        this.user = user.data();
        if(this.user.email == email && this.user.password==password){
          this.router.navigate([''])
          localStorage.setItem("user",email)
        
        }
    
      })
    })
   

  }


}