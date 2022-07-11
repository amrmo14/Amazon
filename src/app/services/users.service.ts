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
  getUser(query?: any): Observable<IUser[]> {
    if (isNaN(query) && query.includes('.com')) {
      console.log('.com');
      return this.http.get<IUser[]>(
        `http://localhost:3000/users?email=${query}`
      );
    } else if (!isNaN(query)) {
      console.log('National');
      return this.http.get<IUser[]>(
        `http://localhost:3000/users?national_id=${query}`
      );
    } else if (
      isNaN(query) &&
      !query.includes('.com') &&
      typeof query != 'number' &&
      query != ''
    ) {
      console.log('name');
      return this.http.get<IUser[]>(
        `http://localhost:3000/users?name=${query}`
      );
    } else if (query == '') {
      console.log('enm');
      return this.http.get<IUser[]>('http://localhost:3000/users');
    } else {
      console.log('return');
      return this.http.get<IUser[]>('http://localhost:3000/users');
    }
  }
  updateUser() {}
}
