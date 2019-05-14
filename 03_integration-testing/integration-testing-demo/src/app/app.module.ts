import { BrowserModule } from '@angular/platform-browser';
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

@NgModule({
  declarations: [
    AppComponent,
    VoterComponent,
    HomeComponent,
    UsersComponent,
    HighlightDirective,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
