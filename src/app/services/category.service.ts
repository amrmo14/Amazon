import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from '../models/icategory';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }
  getAllCategory():Observable<ICategory[]>{
    return this.httpClient.get<ICategory[]>(`${environment.APIBaseURL}/category`);
  }
}
