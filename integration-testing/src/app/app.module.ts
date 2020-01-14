import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VoterComponent } from './voter/voter.component';
import { EventBindingComponent } from './event-binding/event-binding.component';
import { DonutsComponent } from './donuts/donuts.component';
import { DonutsService } from './services/donuts.service';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StubsRouterComponent } from './stubs-router/stubs-router.component';


@NgModule({
  declarations: [
    AppComponent,
    VoterComponent,
    EventBindingComponent,
    DonutsComponent,
    StubsRouterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
        { path: 'voter', component: VoterComponent },
        { path: 'home', component: DonutsComponent },
        { path: '**', redirectTo: 'home' }
    ])
  ],
    providers: [DonutsService],
  bootstrap: [AppComponent]
})
export class AppModule { }


