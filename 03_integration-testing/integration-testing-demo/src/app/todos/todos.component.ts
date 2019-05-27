import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: any[] = [];
  message: any;

  constructor(private service: TodoService) {}



  ngOnInit() {
    const vm = this;

    vm.service.getTodos()
    .subscribe((response) => {
      // console.log(response);
      vm.todos = response;
    });
  }

  // add() {
  //   var newTodo = { title: '... ' };
  //   this.service.add(newTodo).subscribe(
  //     t => this.todos.push(t),
  //     err => this.message = err);
  // }
  //
  // delete(id) {
  //   if (confirm('Are you sure?'))
  //     this.service.delete(id).subscribe();
  // }
}
