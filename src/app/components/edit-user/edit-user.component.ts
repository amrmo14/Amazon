import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  myForm: FormGroup;
  // user!: IUser;
  userId: number;
  currPrdID: any;
  newUser:IUser={} as IUser;
  user:any
  show=false;
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private db :AngularFirestore
  ) {
    this.userId = this.activeRoute.snapshot.params['id'];
    this.myForm = fb.group({
      name: [''],
      national_id: [''],
      email: [''],
      password: [''],
      mobile: [''],
      address: fb.group({
        country: [''],
        city: [''],
        street: [''],
      }),
    });
  }

  ngOnInit(): void {
    // this.userService.findUserById(this.userId).subscribe((data) => {
    //   console.log(data);
    //   this.user = data;
    //   this.myForm.patchValue({
    //     name: data.name,
    //     national_id: data.national_id,
    //     email: data.email,
    //     password: data.password,
    //     mobile: data.mobile,
    //     address: data.address,
    //   });
    // });

    this.activeRoute.paramMap.subscribe(paramMap => {
      this.currPrdID = (paramMap.get('id')) ? (paramMap.get('id')) : 0;
      console.log(this.currPrdID)
      this.db.collection("users").get().subscribe(doc => {
        doc.docs.forEach(user => {
          this.user = user.data(); 
            this.user.id = user.id;
            if(this.user.id==this.currPrdID){
              this.newUser = this.user
              console.log(this.newUser)
              this.myForm.patchValue({
                    name: this.user.name,
                    national_id: this.user.national_id,
                    email: this.user.email,
                    password: this.user.password,
                    mobile: this.user.mobile,
                    address: this.user.address,
                  });
            }     
        })
      }
      )
    // this.prdApiservice.getProductByID(this.currPrdID).subscribe(prd => {
    //   this.newPrd = prd
    // });
  })
  }

  updateUser(userID:any ,user:IUser) {
    // this.userService
    //   .updateUser(this.myForm.value, this.userId)
    //   .subscribe((data) => {
    //     console.log('Data comes from update ', data);
    //     this.router.navigate(['users']);
    //   });
    console.log(this.myForm.value)
      this.db.collection('users').doc(userID).update(user);
      this.show=true;
      
      setTimeout(()=>{
        this.show=false;
        // this.router.navigate(['/users'])
      },1000) 
  }
}
