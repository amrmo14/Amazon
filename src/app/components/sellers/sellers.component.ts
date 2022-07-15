import { Component, OnChanges, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss']
})



export class SellersComponent implements OnInit, OnChanges {
  sellers: any[]=[];
  seller : any;
  searchType: string = '';
  constructor(private router: Router,private db: AngularFirestore) {
    console.log(this.searchType);
  }

  ngOnInit(): void {
    this.getsellers();
    console.log(this.sellers)
  }
  ngOnChanges(): void {
    this.getsellers();
  }
  getsellers() {
    // this.sellerServ.getsellers().subscribe((data) => {
    //   this.sellers = data;
    // });
    this.db.collection("sellers").get().subscribe(doc => {
      doc.docs.forEach(seller => {
        this.seller = seller.data();
        this.seller.id=seller.id
        this.sellers.push(this.seller)
      })
    })
  }

  deleteseller(sellerId: number) {
    let Is_Deleted = confirm('Are Your sure you want to delete this seller ?');
    if (Is_Deleted) {
      // this.sellerServ.deleteseller(sellerId).subscribe((data) => {
      //   console.log(data);
      //   this.getsellers();
      // });
      this.seller = this.sellers.find(seller => sellerId==seller.id);
      this.db.collection('sellers').doc(this.seller.id).delete();
      this.sellers.splice(this.sellers.indexOf(this.seller),1)
    }
  
  }

  getseller(search: string, query: any) {
    // this.sellerServ.getseller(search, query).subscribe((data) => {
    //   this.sellers = data;
    // });
    if(search==""){
      search="name"
    }
    var regex = new RegExp(query, 'gi');
    let founded = this.sellers.filter(seller =>
      // console.log(seller,search);
      seller[search].match(regex));
      console.log(founded)
    if (founded) {

      this.sellers = [];
      founded.forEach(seller => {
        this.seller = seller

        this.sellers = [...this.sellers, this.seller]
        console.log(this.sellers)
      })
    }
    else {
      alert("Not found")
    }
  }
  editseller(id: number) {
    this.router.navigate(['/sellers', id]);
  }
}

