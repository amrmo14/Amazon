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
  prdListOfCat: Iproduct[] = []
  // prdListOfCat: any[] = []
  @Input() recievedCatID: number = 0;
  selectedCatID: number = 0;
  private Subscribtion:Subscription[]= [];

  constructor( private router: Router, private prdAPIService: PrdApiService,
    private db : AngularFirestore ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    let sub=this.prdAPIService.getProductsByCatID(this.recievedCatID).
      subscribe(prdList => {
        if(this.recievedCatID==0){
          this.prdAPIService.getAllProducts().
      subscribe(prdList => {
        this.prdListOfCat = prdList
      });
        }
        else{
          this.prdListOfCat = prdList
          // this.db.collection("products").get().subscribe(doc=>
          //   doc.docs.forEach(categoryList=>
          //     this.prdListOfCat.push(categoryList.data())))
        }
       
      });
      this.Subscribtion.push(sub);
     
  }

  

  ngOnInit(): void {
    this.prdAPIService.getAllProducts().
      subscribe(prdList => {
        this.prdListOfCat = prdList
      });

  }

  openPrdDetails(prdID: number) {
    this.router.navigate(["products", prdID])
  }

  editPrd(prdID: number){
    this.router.navigate(["addProduct", prdID])
  }
  deletePrd(prd: number){
    let sure = confirm("Are you sure?")
    if(sure){
      this.prdAPIService.deleteProudcut(prd).subscribe(prdlist =>{
        this.prdAPIService.getAllProducts().
        subscribe(prdList => {
          this.prdListOfCat = prdList
      })}
      );
      
  }}

  ngOnDestroy(): void {
    for(let sub of this.Subscribtion){
      sub.unsubscribe();
    }
  }
}
