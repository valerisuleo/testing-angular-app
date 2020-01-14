import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { FundamentalsComponent } from './fundamentals/fundamentals.component';
import { ArrayAndStringsComponent } from './array-and-strings/array-and-strings.component';
import { SetupAndTeardownComponent } from './setup-and-teardown/setup-and-teardown.component';
import { FormsComponent } from './forms/forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventEmitterComponent } from './event-emitter/event-emitter.component';
import { WorkWithSpyComponent } from './work-with-spy/work-with-spy.component';
import { DonutsService } from './services/donuts.service';

@NgModule({
  declarations: [
    AppComponent,
    FundamentalsComponent,
    ArrayAndStringsComponent,
    SetupAndTeardownComponent,
    FormsComponent,
    EventEmitterComponent,
    WorkWithSpyComponent,
  ],
  imports: [
      BrowserModule,
      ReactiveFormsModule,
      HttpModule
  ],
    providers: [DonutsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
