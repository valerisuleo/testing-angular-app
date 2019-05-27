import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";


@Injectable()
export class TodoService {
  constructor(private http: Http) {
  }

  getTodos() {
    return this.http.get('...')
    .pipe(map(response => response.json()));
  }

  add(todo) {
    return this.http.post('...', JSON.stringify(todo))
    .pipe(map(res => res.json()));
  }


  getTodosPromise() {
    return this.http.get('...')
    .pipe(map(response => response.json()))
    .toPromise();
  }

  delete(id) {
    return this.http.delete('...', (id))
    .pipe(map(res => res.json()));
  }
}
