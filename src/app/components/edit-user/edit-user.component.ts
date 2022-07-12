import { Component, OnInit } from '@angular/core';
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
  user!: IUser;
  userId: number;
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private activeRoute: ActivatedRoute,
    private router: Router
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
    this.userService.findUserById(this.userId).subscribe((data) => {
      console.log(data);
      this.user = data;
      this.myForm.patchValue({
        name: data.name,
        national_id: data.national_id,
        email: data.email,
        password: data.password,
        mobile: data.mobile,
        address: data.address,
      });
    });
  }

  updateUser() {
    this.userService
      .updateUser(this.myForm.value, this.userId)
      .subscribe((data) => {
        console.log('Data comes from update ', data);
        this.router.navigate(['users']);
      });
  }
}
