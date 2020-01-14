import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-event-emitter',
    templateUrl: './event-emitter.component.html',
    styleUrls: ['./event-emitter.component.scss']
})
export class EventEmitterComponent implements OnInit {

    constructor() { }

    totalVotes = 0;
    voteChanged = new EventEmitter();

    upVote() {
        this.totalVotes++;
        this.voteChanged.emit(this.totalVotes);
    }

    ngOnInit() {
    }

}
