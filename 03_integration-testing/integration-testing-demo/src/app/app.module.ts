import { BrowserModule } from '@angular/platform-browser';
import { TodoService } from './todos/todo.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { VoterComponent } from './voter/voter.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';

import { routes } from './app.routes';
// import { NavComponent } from './nav/nav.component';
import { HighlightDirective } from './highlight.directive';
import { UserDetailsComponent } from './user-details/user-details.component';
import { TodosComponent } from './todos/todos.component';

@NgModule({
  declarations: [
    AppComponent,
    VoterComponent,
    HomeComponent,
    UsersComponent,
    HighlightDirective,
    UserDetailsComponent,
    TodosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
