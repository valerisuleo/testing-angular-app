import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { Observable, from} from 'rxjs';


describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos property with the respose return from the service', () => {
    spyOn(service, 'getTodos').and.callFake(() => {
      var obs = from([
        { id: 1, title: 'a'},
        { id: 2, title: 'a'},
        { id: 3, title: 'a'}
      ]);
      return obs;
    })
  });
});
