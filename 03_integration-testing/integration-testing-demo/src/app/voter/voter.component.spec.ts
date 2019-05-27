import { VoterComponent } from './voter.component';
import { TestBed, ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

describe('VoterComponent', () => {
  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    });
    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;
    // fixture.nativeElement
    fixture.debugElement
  });

  it('it should render totalVotes', () => {
    component.othersVote = 20;
    component.myVote = 1;
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.vote-count'));
    let el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain('21');
  });

  it('it should increase totalVotes when I click the upvote btn', () => {
    let de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
  });
});
