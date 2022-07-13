import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/models/iproduct';
import { PrdApiService } from 'src/app/services/prd-api.service';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  prd: Iproduct | undefined;
  currPrdID: any;
  currindex: number = 0;
  price: number = 0;
  product: any

  prdIDList: number[] = []
  constructor(private router: Router,
    private loc: Location, private actRout: ActivatedRoute,
    private prdAPIService: PrdApiService, private db: AngularFirestore) {
  }




  ngOnInit(): void {
    // this.prdAPIService.getAllProducts().
    //   subscribe(prdList => {
    //     prdList.map(item => this.prdIDList.push(item.id))
    //   });

    this.db.collection("products").get().subscribe(doc =>
      doc.docs.forEach(product => {
        this.product = product.data();
        this.product.id = product.id;
        this.prdIDList.push(this.product.id)
      }
      ))

    this.actRout.paramMap.subscribe(paramMap => {
      this.currPrdID = (paramMap.get('pid')) ? (paramMap.get('pid')) : 0;
      this.db.collection("products").get().subscribe(doc => {
        doc.docs.forEach(product => {
          this.product = product.data();
          this.product.id = product.id;
          if (this.product.id == this.currPrdID) {
            let foundPrd = this.product
            if (foundPrd) {

              this.prd = foundPrd
              this.currindex = this.prdIDList.indexOf(this.currPrdID)

            }

            else {
              alert("Invalid product");
  
            }

          }
         
        }
        )
      }
      )
      // let foundPrd = this.prdAPIService.getProductByID(this.currPrdID);
      // if (foundPrd) {
      //   foundPrd.subscribe({
      //     next: item => {
      //       this.prd = item
      //       this.price = item.Price
      //     }
      //   }
      //   )

      //   this.currindex = this.prdIDList.indexOf(this.currPrdID)
      // }
      // else {
      //   alert("Invalid product");

      // }
    })
  }


}
