import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
@Component({
    selector: 'voter',
    templateUrl: './voter.component.html',
    styleUrls: ['./voter.component.scss']
})
export class VoterComponent implements OnInit {

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




