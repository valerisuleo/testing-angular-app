import { Http } from '@angular/http';
import { map } from "rxjs/operators";


export class TodoService {
  constructor(private http: Http) {
  }

  add(todo: any) {
    return this.http.post('...', todo)
    .pipe(map(response => response.json()));
  }

  getTodos() {
    return this.http.get('...')
    .pipe(map(response => response.json()));
  }

  delete(id) {
    return this.http.delete('...')
    .pipe(map(response => response.json()));
  }
}
