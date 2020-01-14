import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'event-binding',
  templateUrl: './event-binding.component.html',
  styleUrls: ['./event-binding.component.scss']
})
export class EventBindingComponent implements OnInit {

    @Input() othersVote = 0;
    @Input() myVote = 0;
    @Output() myVoteChanged = new EventEmitter();

    constructor() { }

    upVote() {
        if (this.myVote == 1)
            return;

        this.myVote++;

        this.myVoteChanged.emit({ myVote: this.myVote });
    }

    downVote() {
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
