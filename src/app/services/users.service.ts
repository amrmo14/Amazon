import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>('http://localhost:3000/users');
  }
  deleteUser(userId: number) {
    return this.http.delete<IUser>(`http://localhost:3000/users/${userId}`);
  }
  getUser(search: string, query?: any): Observable<IUser[]> {
    switch (search) {
      case 'name':
        return this.http.get<IUser[]>(
          `http://localhost:3000/users?name=${query}`
        );
        break;
      case 'email':
        return this.http.get<IUser[]>(
          `http://localhost:3000/users?email=${query}`
        );
        break;
      case 'nationalId':
        return this.http.get<IUser[]>(
          `http://localhost:3000/users?national_id=${query}`
        );
        break;
      case 'mobile':
        return this.http.get<IUser[]>(
          `http://localhost:3000/users?mobile=${query}`
        );
        break;
      case 'address':
        return this.http.get<IUser[]>(
          `http://localhost:3000/users?country=${query}`
        );
        break;
      case 'all':
      default:
        return this.http.get<IUser[]>('http://localhost:3000/users');
    }
  }
  updateUser() {}
}
