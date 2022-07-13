import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iproduct } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class PrdApiService {

  private httpOptions ={}

  constructor(private httpClient: HttpClient) {

    this.httpOptions={
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
  }
    getAllProducts():Observable<Iproduct[]>{
      return this.httpClient.get<Iproduct[]>(`${environment.APIBaseURL}/products`);
    }
    getProductsByCatID(catID:number):Observable<Iproduct[]>
    {
      return this.httpClient.get<Iproduct[]>(`${environment.APIBaseURL}/products?CateogryID=${catID}`);
  
    }
    getProductByID(prdID:number):Observable<Iproduct>
    {
      return this.httpClient.get<Iproduct>(`${environment.APIBaseURL}/products/${prdID}`)
    }
    
    addProudcut(newPrd:Iproduct):Observable<Iproduct>
    {
      return this.httpClient.post<Iproduct>(`${environment.APIBaseURL}/products/`,JSON.stringify(newPrd),this.httpOptions)
    }

    editProudcut(prdID:number,newPrd:Iproduct):Observable<Iproduct>
    {
      return this.httpClient.put<Iproduct>(`${environment.APIBaseURL}/products/${prdID}`,JSON.stringify(newPrd),this.httpOptions)
    }

    deleteProudcut(prdID:number):Observable<Iproduct>
    {
      return this.httpClient.delete<Iproduct>(`${environment.APIBaseURL}/products/${prdID}`)
    }

    searchPrd(prdName:String):Observable<Iproduct[]>{
      return this.httpClient.get<Iproduct[]>(`${environment.APIBaseURL}/products`);
    }
}

