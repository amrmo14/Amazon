import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/models/icategory';
import { Iproduct } from 'src/app/models/iproduct';
import { CategoryService } from 'src/app/services/category.service';
import { PrdApiService } from 'src/app/services/prd-api.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  catlList: any[]=[];
  newPrd:Iproduct={} as Iproduct;
  currPrdID: any;
  product: any;
  constructor(private categoryService:CategoryService,
    private prdApiservice:PrdApiService ,
    private router: Router,
    private actRout: ActivatedRoute,
    private db :AngularFirestore) { 
    // this.categoryService.getAllCategory().
    //   subscribe(categoryList=>{
    //    this.catlList=categoryList
    //  });
     this.db.collection("cateogry").get().subscribe(doc=>
      doc.docs.forEach(category=>
        this.catlList.push(category.data())))
        console.log(this.catlList)
  }

  ngOnInit(): void {

    this.actRout.paramMap.subscribe(paramMap => {
      this.currPrdID = (paramMap.get('pid')) ? (paramMap.get('pid')) : 0;
      console.log(this.currPrdID)
      this.db.collection("products").get().subscribe(doc => {
        doc.docs.forEach(product => {
          this.product = product.data(); 
            this.product.id = product.id;
            if(this.product.id==this.currPrdID){
              this.newPrd = this.product
              console.log(this.newPrd)
            }     
        })
      }
      )
    // this.prdApiservice.getProductByID(this.currPrdID).subscribe(prd => {
    //   this.newPrd = prd
    // });
  })
}


updatePrd(PrdID:any,prd:Iproduct){
  // this. prdApiservice.editProudcut(this.currPrdID,this.newPrd).subscribe({
  //   next:(prd)=>{
  //     this.router.navigate(['/products']);
  //   },
  //   error:(err)=>{
  //     alert("Error occured: ");
  //   }
  // })

  this.db.collection('products').doc(PrdID).update(prd);

}

 addPrd(){
  // this. prdApiservice.addProudcut(this.newPrd).subscribe({
  //   next:(prd)=>{
  //     this.router.navigate(['/products']);
  //   },
  //   error:(err)=>{
  //     alert("Error occured: ");
  //   }
  // })

  this.db.collection('products').add(this.newPrd)
  this.router.navigate(['/products'])
}

}


