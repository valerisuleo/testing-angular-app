
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class TodoService {
  constructor(private http: Http) {
  }

  add(todo) {
    return this.http.post('...', todo)
    .map(response => response.json());
  }

  getTodos() {
    return this.http.get('...')
    .map(response => response.json());
  }

  delete(id) {
    return this.http.delete('...')
    .map(response => response.json());
  }
}
