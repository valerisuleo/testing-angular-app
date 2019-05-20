import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { Observable, from } from 'rxjs';
import {EMPTY} from 'rxjs';





xdescribe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos property with the respose return from the service', () => {
    let arrayofObj = [
      { id: 1, title: 'a'},
      { id: 2, title: 'b'},
      { id: 3, title: 'c'}
    ]

    spyOn(service, 'getTodos').and.callFake(() => {
      var obs = from(arrayofObj);
      return obs;
    })
    component.ngOnInit();

    expect(component.todos).toBe(arrayofObj);
  });

  // ADD
  it('should call the server to save the changes when a new todo obj is added', () => {
    let spy = spyOn(service, 'add').and.callFake(() => {
      return EMPTY;
    });

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned from the server', () => {
    let newObj = { id: 1, title: 'd' }
    spyOn(service, 'add').and.callFake(() => {
      var obs = from([newObj]);
      return obs;
    });

    component.add();

    expect(component.todos.indexOf(newObj)).toBeGreaterThan(-1);
  });


  it('should set the message property if server returns when adding a newTodo', () => {
    let error = 'error from the server';
    spyOn(service, 'add').and.returnValue(Observable.throw(error));

    component.add();

    expect(component.message).toBe(error);
  });

  // DELETE
  it('should call the server to delete a todo item if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(EMPTY);

    component.delete(1);

    expect(spy).toHaveBeenCalled()
  });

  it('should NOT call the server to delete a todo item if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(EMPTY);

    component.delete(1);

    expect(spy).not.toHaveBeenCalled();
  });
});
