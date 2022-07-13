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
  catlList: ICategory[]=[];
  newPrd:Iproduct={} as Iproduct;
  currPrdID: number = 0;
  constructor(private categoryService:CategoryService,
    private prdApiservice:PrdApiService ,
    private router: Router,
    private actRout: ActivatedRoute,
    private db :AngularFirestore) { 
    this.categoryService.getAllCategory().
      subscribe(categoryList=>{
       this.catlList=categoryList
     });
  }

  ngOnInit(): void {

    this.actRout.paramMap.subscribe(paramMap => {
      this.currPrdID = (paramMap.get('pid')) ? Number((paramMap.get('pid'))) : 0;
    this.prdApiservice.getProductByID(this.currPrdID).subscribe(prd => {
      this.newPrd = prd
    });
  })
}


updatePrd(PrdID:number,prd:Iproduct){
  this. prdApiservice.editProudcut(this.currPrdID,this.newPrd).subscribe({
    next:(prd)=>{
      this.router.navigate(['/products']);
    },
    error:(err)=>{
      alert("Error occured: ");
    }
  })

}

 addPrd(){
  this. prdApiservice.addProudcut(this.newPrd).subscribe({
    next:(prd)=>{
      this.router.navigate(['/products']);
    },
    error:(err)=>{
      alert("Error occured: ");
    }
  })

  // this.db.collection('products').add(this.newPrd)
}

}


