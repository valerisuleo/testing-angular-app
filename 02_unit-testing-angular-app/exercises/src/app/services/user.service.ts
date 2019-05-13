import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://jsonplaceholder.typicode.com/users";

  constructor(private http: Http) {}

  getAll() {
    return this.http.get(this.url)
    .pipe(map(response => response.json()));
  }

  getUser(userId: any) {
    return this.http.get(this.getUserUrl(userId))
    .pipe(map(res => res.json()));
  }

  addUser(user: any) {
    return this.http.post(this.url, JSON.stringify(user))
    .pipe(map(res => res.json()));
  }

  updateUser(user: any) {
    return this.http.put(this.getUserUrl(user.id), JSON.stringify(user))
    .pipe(map(res => res.json()));
  }

  deleteUser(userId: any) {
    return this.http.delete(this.getUserUrl(userId))
    .pipe(map(res => res.json()));
  }

  private getUserUrl(userId: any) {
    return this.url + "/" + userId;
  }
}
