import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/models/icategory';
import { Iproduct } from 'src/app/models/iproduct';
import { CategoryService } from 'src/app/services/category.service';
import { PrdApiService } from 'src/app/services/prd-api.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  catlList: any[]=[];
  newPrd:Iproduct={} as Iproduct;
  prdEn:any={};
  prdAr:any={}
  currPrdID: any;
  product: any;
  updatedProduct: any;
  imgs : any=[""]
  propertiesEn : any=[{}]
  propertiesAR : any=[{}]
  // productFormGp: FormGroup;
  @ViewChild("form") form!:ElementRef;
  show: boolean = false;
  constructor(private categoryService:CategoryService,
    private prdApiservice:PrdApiService ,
    private router: Router,
    private actRout: ActivatedRoute,
    private db :AngularFirestore,
    private fb: FormBuilder,) { 

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
              this.updatedProduct = this.product
              console.log(this.updatedProduct)
            }     
        })
      }
      )
    // this.prdApiservice.getProductByID(this.currPrdID).subscribe(prd => {
    //   this.newPrd = prd
    // });
  })
}
addImg(){
  this.imgs.push("")
}
addImgUpdate(){
  this.updatedProduct.imgs.push("")
}
removeImg(){
  this.imgs.pop()
}
removeImgUpdate(){
  this.updatedProduct.imgs.pop()
}
addProperty(){
  this.propertiesEn.push({})
  this.propertiesAR.push({})
}

addPropertyUpdate(){
  this.updatedProduct.en.Description.push({})
  this.updatedProduct.ar.Description.push({})
}
removeProperty(){
  this.propertiesEn.pop()
  this.propertiesAR.pop()
}
removePropertyUpdate(){
  this.updatedProduct.en.Description.pop()
  this.updatedProduct.ar.Description.pop()
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
  this.show=true;
  setTimeout(()=>{
    this.show=false;
    this.router.navigate(['/products'])},1000) 
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
  this.prdEn.Description=this.propertiesEn
  this.prdAr.Description=this.propertiesAR
  this.newPrd.en=this.prdEn;
  this.newPrd.ar=this.prdAr;
  this.newPrd.imgs=this.imgs;
 

  this.db.collection('products').add(this.newPrd)
  this.show=true;
  setTimeout(()=>{
    this.show=false;
    this.form.nativeElement.reset()},2000)
  
  
}

}


