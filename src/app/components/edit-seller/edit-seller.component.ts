import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
  import { FormBuilder, FormGroup } from '@angular/forms';
  import { ActivatedRoute, Router } from '@angular/router';
  import { IUser } from 'src/app/models/IUser';
  import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-edit-seller',
  templateUrl: './edit-seller.component.html',
  styleUrls: ['./edit-seller.component.scss']
})
export class EditSellerComponent implements OnInit {
  
    myForm: FormGroup;
    // user!: IUser;
    sellerId: number;
    currPrdID: any;
    newseller:IUser={} as IUser;
    seller:any
    show=false;
    constructor(
      private fb: FormBuilder,
      private activeRoute: ActivatedRoute,
      private router: Router,
      private db :AngularFirestore
    ) {
      this.sellerId = this.activeRoute.snapshot.params['id'];
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

  
      this.activeRoute.paramMap.subscribe(paramMap => {
        this.currPrdID = (paramMap.get('id')) ? (paramMap.get('id')) : 0;
        console.log(this.currPrdID)
        this.db.collection("sellers").get().subscribe(doc => {
          doc.docs.forEach(seller => {
            this.seller = seller.data(); 
              this.seller.id = seller.id;
              if(this.seller.id==this.currPrdID){
                this.newseller = this.seller
                console.log(this.newseller)
                this.myForm.patchValue({
                      name: this.seller.name,
                      national_id: this.seller.national_id,
                      email: this.seller.email,
                      password: this.seller.password,
                      mobile: this.seller.mobile,
                      address: this.seller.address,
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
  
    updateseller(sellerID:any ,seller:IUser) {
    
      console.log(this.myForm.value)
        this.db.collection('sellers').doc(sellerID).update(seller);
        // this.db.collection('sellers').add(seller);
        this.show=true;
        
        setTimeout(()=>{
          this.show=false;
          this.router.navigate(['/sellers'])
        },1000) 
    }
  }
  
