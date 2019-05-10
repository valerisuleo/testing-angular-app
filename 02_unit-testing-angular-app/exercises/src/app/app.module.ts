import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { TxtSummaryPipe } from './txt-summary/txt-summary.pipe';
import { LikeComponent } from './like/like.component';
import { VoterComponent } from './voter/voter.component';


@NgModule({
  declarations: [
    AppComponent,
    TxtSummaryPipe,
    LikeComponent,
    VoterComponent,
  ],
  imports: [
    BrowserModule,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
