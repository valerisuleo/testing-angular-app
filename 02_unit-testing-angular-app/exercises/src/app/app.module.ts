import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TxtSummaryPipe } from './txt-summary/txt-summary.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TxtSummaryPipe,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
