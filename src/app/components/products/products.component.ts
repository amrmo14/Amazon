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
    catlList: any[]=[];
    // catlList: ICategory[]=[];
    selectedCatID: number = 0;
    // searchList: Iproduct[]=[];
    searchList: any[]=[];

    constructor(private categoryService:CategoryService,private router: Router,
      private loc: Location, private actRout: ActivatedRoute, private prdAPIService: PrdApiService,
      private db : AngularFirestore ) { 
    //   this.categoryService.getAllCategory().
    //   subscribe(categoryList=>{
    //    this.catlList=categoryList;
        
    //  });

    this.db.collection("cateogry").get().subscribe(doc=>
            doc.docs.forEach(category=>
              this.catlList.push(category.data())))
      
 
   }

  ngOnInit(): void {
    // this.prdAPIService.getAllProducts().subscribe(prdlist =>{
    //   this.searchList = prdlist;
    // })

    this.db.collection("products").get().subscribe(doc=>
      {
        this.searchList=[];
        doc.docs.forEach(product=>{
          this.searchList.push(product)
          // console.log(product.id)
          
        }
        
         )
        //  console.log(this.searchList)
      }
    )
       
  }

  search(pprdName:string){
    
    let founded = this.searchList.find(prd=>
      prd.data().name.toLowerCase() == pprdName.toLowerCase())
  

    
    if(founded){
      this.router.navigate(["/products",this.searchList[this.searchList.indexOf(founded)].id])
    }
    else{
      alert("Not found")
    }
   
  }

  

}
