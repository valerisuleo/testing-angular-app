
import { TodoService } from './todo.service'

export class TodosComponent {
  todos: any[] = [];
  message: any; 

  constructor(private service: TodoService) {}

  // ngOnInit() {
  //   this.service.getTodos().subscribe(t => this.todos = t);
  // }

  ngOnInit() {
    this.service.getTodos()
    .subscribe((response: any) => {
      this.todos = response;
    })
  }

  // add() {
  //   var newTodo = { title: '... ' };
  //   this.service.add(newTodo).subscribe(
  //     t => this.todos.push(t),
  //     err => this.message = err);
  // }

  add() {
    const vm = this;
    var newTodo = { title: '... ' };

    vm.service.add(newTodo)
    .subscribe((data: any) => {
      vm.todos.push(data);
    }, err => {
      this.message = err;
    });
  }

  delete(id) {
    if (confirm('Are you sure?'))
      this.service.delete(id).subscribe();
  }
}
