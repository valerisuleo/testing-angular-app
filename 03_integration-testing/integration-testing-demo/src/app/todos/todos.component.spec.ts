/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoService } from '../todos/todo.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Observable, from, of } from 'rxjs';

import { HttpModule } from '@angular/http';


import { TodosComponent } from './todos.component';

//NOTE: I've deliberately excluded this suite from running
// because the test will fail. This is because we have not
// provided the TodoService as a dependency to TodosComponent.
//
// When you get to Lecture 6 (Providing Dependencies), be sure
// to remove "x" from "xdescribe" below.

fdescribe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ TodosComponent ],
      providers: [ TodoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos from the server', () => {

    let service = TestBed.get(TodoService);
    let arrayofObj = [
          { id: 1, title: 'a'},
          { id: 2, title: 'b'},
          { id: 3, title: 'c'}
        ];


    spyOn(service, 'getTodos').and.callFake(() => {
      var obs = from([arrayofObj]);
      console.log('wowowow', obs);
      return obs;
    });

    fixture.detectChanges();
    // component.ngOnInit();

    expect(component.todos.length).toEqual(3);
  });


});
