import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";


@Injectable()
export class TodoService {

  private url = "http://jsonplaceholder.typicode.com/users";
  constructor(private http: Http) {
  }

  getTodos() {
    return this.http.get(this.url)
    .pipe(map(response => response.json()));
  }

  // add(todo) {
  //   return this.http.post(this.url, JSON.stringify(todo))
  //   .pipe(map(res => res.json()));
  // }
  //
  //
  // getTodosPromise() {
  //   return this.http.get(this.url)
  //   .pipe(map(response => response.json()))
  //   .toPromise();
  // }
  //
  // delete(id) {
  //   return this.http.delete(this.url, (id))
  //   .pipe(map(res => res.json()));
  // }
}
