import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {
  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




  it('should increment myVote when upVoted', () => {

    component.upVote();

    expect(component.myVote).toBe(1);
  });


  it('should raised myVoteChanged when upVoted', () => {
    // ARRANGE
    let myVar = null;

    component.myVoteChanged
    .subscribe((data: any) => {
      // console.log('data', data);
      myVar = data;
    });
    // ACT
    component.upVote();
    // ASSERT
    expect(myVar).not.toBeNull();
    expect(myVar).toEqual({myVote: 1});
  });


  it('should raised myVoteChanged when downVoted', () => {
    // ARRANGE
    let myVar = null;

    component.myVoteChanged
    .subscribe((data: any) => {
      // console.log('data', data);
      myVar = data;
    });
    // ACT
    component.downVote();
    // ASSERT
    expect(myVar).not.toBeNull();
    expect(myVar).toEqual({myVote: -1});
  });


  it('should NOT increment totalVotes if myVote is already equal to 1', () => {
    component.myVote = 1;

    component.upVote();

    expect(component.myVote).toBe(1);
  });

  it('should NOT decrement totalVotes if myVote is already equal to -1', () => {
    component.myVote = -1;

    component.downVote();

    expect(component.myVote).toBe(-1);
  });


  it('should NOT raise totalVotes if myVote is already equal to 1', () => {

    component.myVote = 1

    let myVar = null;

    component.myVoteChanged
    .subscribe((data: any) => {
      myVar = data;
    });

    component.upVote();

    expect(myVar).toBeNull();
  });

  it('should NOT raise totalVotes if myVote is already equal to -1', () => {

    component.myVote = -1

    let myVar = null;

    component.myVoteChanged
    .subscribe((data: any) => {
      myVar = data;
    });

    component.downVote();

    expect(myVar).toBeNull();
  });



  it('should calculate total votes properly', () => {
    component.myVote = 1;
    component.othersVote = 2;
    expect(component.totalVotes).toBe(3);
  });


  it('should update total votes when upVoted', () => {

    component.upVote();

    expect(component.totalVotes).toBe(1);
  });

  it('should update total votes when downVoted', () => {

    component.downVote();

    expect(component.totalVotes).toBe(-1);
  });


});
