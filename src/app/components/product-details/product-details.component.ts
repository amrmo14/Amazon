import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/models/iproduct';
import { PrdApiService } from 'src/app/services/prd-api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  prd: Iproduct | undefined;
  currPrdID: number = 0;
  currindex: number = 0;
  price: number = 0;

  prdIDList: number[] = []
  constructor(private router: Router,
    private loc: Location, private actRout: ActivatedRoute, private prdAPIService: PrdApiService) {
  }




  ngOnInit(): void {
    this.prdAPIService.getAllProducts().
      subscribe(prdList => {
        prdList.map(item => this.prdIDList.push(item.id))
      });

    this.actRout.paramMap.subscribe(paramMap => {
      this.currPrdID = (paramMap.get('pid')) ? Number((paramMap.get('pid'))) : 0;
      let foundPrd = this.prdAPIService.getProductByID(this.currPrdID);
      if (foundPrd) {
        foundPrd.subscribe({
          next: item => {
            this.prd = item
            this.price = item.Price
          }
        }
        )

        this.currindex = this.prdIDList.indexOf(this.currPrdID)
      }
      else {
        alert("Invalid product");

      }
    })
  }


}
