import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/models/icategory';
import { CategoryService } from 'src/app/services/category.service';
import { PrdApiService } from 'src/app/services/prd-api.service';
import { Location } from '@angular/common';
import { Iproduct } from 'src/app/models/iproduct';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnChanges, OnDestroy {
  catlList: any[] = [];
  // catlList: ICategory[]=[];
  selectedCatID: number = 0;
  // searchList: Iproduct[]=[];
  searchList: any[] = [];
  private Subscribtion: Subscription[] = [];


  constructor(private categoryService: CategoryService, private router: Router,
    private loc: Location, private actRout: ActivatedRoute, private prdAPIService: PrdApiService,
    private db: AngularFirestore) {
  
    this.db.collection("cateogry").get().subscribe(doc =>
      doc.docs.forEach(category =>
        this.catlList.push(category.data())))
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.db.collection("products").get().subscribe(doc => {
      this.searchList = [];
      doc.docs.forEach(product => {
        this.searchList.push(product)})})

  }

  search(pprdName: string) {
    var regex = new RegExp(pprdName.toLowerCase(), 'g');
    let founded = this.searchList.filter(prd =>
      prd.data().name.toLowerCase().match(regex))

    if (founded) {
      // this.router.navigate(["/products",this.searchList[this.searchList.indexOf(founded)].id])
      founded.forEach(product => {
        this.catlList = [];
        this.catlList=[...this.catlList,product.data()]
        console.log(this.catlList)
      })
    }
    else {
      alert("Not found")
    }

  }

  ngOnDestroy(): void {
    for (let sub of this.Subscribtion) {
      sub.unsubscribe();
    }
  }

}
