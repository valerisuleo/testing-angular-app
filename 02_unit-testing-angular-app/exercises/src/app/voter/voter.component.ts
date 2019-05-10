import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.css']
})
export class VoterComponent implements OnInit {

  othersVote = 0;
  myVote = 0;

  @Output() myVoteChanged = new EventEmitter();

  constructor() { }

  upVote(){
    if (this.myVote == 1)
    return;

    this.myVote++;

    this.myVoteChanged.emit({ myVote: this.myVote });
  }

  downVote(){
    if (this.myVote == -1)
    return;

    this.myVote--;

    this.myVoteChanged.emit({ myVote: this.myVote });
  }

  get totalVotes(): number {
    return this.othersVote + this.myVote;
  }



  ngOnInit() {
  }

}
