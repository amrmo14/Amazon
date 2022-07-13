import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/models/icategory';
import { CategoryService } from 'src/app/services/category.service';
import { PrdApiService } from 'src/app/services/prd-api.service';
import { Location } from '@angular/common';
import { Iproduct } from 'src/app/models/iproduct';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    // catlList: any[]=[];
    catlList: ICategory[]=[];
    selectedCatID: number = 0;
    searchList: Iproduct[]=[];

    constructor(private categoryService:CategoryService,private router: Router,
      private loc: Location, private actRout: ActivatedRoute, private prdAPIService: PrdApiService,
      private db : AngularFirestore ) { 
      this.categoryService.getAllCategory().
      subscribe(categoryList=>{
       this.catlList=categoryList;
        
     });

    // this.db.collection("cateogry").get().subscribe(doc=>
    //         doc.docs.forEach(categoryList=>
    //           this.catlList.push(categoryList.data())))
      
 
   }

  ngOnInit(): void {
    this.prdAPIService.getAllProducts().subscribe(prdlist =>{
      this.searchList = prdlist;
    })
  }

  search(pprdName:string){
    
    let founded = this.searchList.find(prd=>
      prd.name.toLowerCase() == pprdName.toLowerCase())
    // let founded = this.searchList[1]

    
    if(founded){
      this.router.navigate(["/products",this.searchList[this.searchList.indexOf(founded)].id])
    }
    else{
      alert("Not found")
    }
   
  }

  

}
