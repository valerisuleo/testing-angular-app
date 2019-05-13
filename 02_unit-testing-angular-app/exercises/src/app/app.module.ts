import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { LikeComponent } from './like/like.component';
import { VoterComponent } from './voter/voter.component';
import { UserComponent } from './user/user.component';

import { TxtSummaryPipe } from './txt-summary/txt-summary.pipe';

import { UserService } from './services/user.service';
import { UserServiceStub } from './services/fakeService/fakequery.service';


@NgModule({
  declarations: [
    AppComponent,
    TxtSummaryPipe,
    LikeComponent,
    VoterComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    UserService,
    UserServiceStub
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
