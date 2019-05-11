import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LikeComponent } from './like/like.component';
import { VoterComponent } from './voter/voter.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LikeComponent,
        VoterComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

});
