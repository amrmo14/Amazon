import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, window } from 'rxjs';
import { Iproduct } from 'src/app/models/iproduct';
import { PrdApiService } from 'src/app/services/prd-api.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnChanges, OnDestroy {
  prdList: Iproduct[] | undefined;
  // prdListOfCat: Iproduct[] = []
  prdListOfCat: any[] = []
  @Input() recievedCatID: number = 0;
  selectedCatID: number = 0;
  product: any;
  cateogry: any;
  private Subscribtion: Subscription[] = [];

  constructor(private router: Router, private prdAPIService: PrdApiService,
    private db: AngularFirestore) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    let sub = this.db.collection("cateogry").get().
      subscribe(docOfCat => {
        this.prdListOfCat = [];

        if (this.recievedCatID == 0) {
          this.db.collection("products").get().subscribe(doc =>
            doc.docs.forEach(product => {
            this.product=product.data();
            this.product.id = product.id;
              console.log(this.product)
              this.prdListOfCat.push(this.product)
            }
            ))
        }
        else {
          docOfCat.docs.forEach(cateogry => {
            this.cateogry = cateogry.data()
            if (this.cateogry.id == this.recievedCatID) {
              this.db.collection("products").get().subscribe(doc => {
                doc.docs.forEach(product => {
                  this.product = product.data();
                  if (this.product.CateogryID == this.recievedCatID) {
                    this.product.id = product.id;
                    // console.log(product.id)
                    this.prdListOfCat.push(this.product)
                  }
                })
              }
              )
            }
          })
          // this.prdListOfCat = prdList
      
        }
      });
    this.Subscribtion.push(sub);

  }



  ngOnInit(): void {
  

  }

  openPrdDetails(prdID: any) {
    this.router.navigate(["products", prdID])
  }

  editPrd(prdID: any) {
    this.router.navigate(["addProduct", prdID])
  }
  deletePrd(prd: any) {
    if (confirm('Delete?')) {
      this.db.collection('products').doc(prd).delete(); 
  }
  }

  ngOnDestroy(): void {
    for (let sub of this.Subscribtion) {
      sub.unsubscribe();
    }
  }
}
