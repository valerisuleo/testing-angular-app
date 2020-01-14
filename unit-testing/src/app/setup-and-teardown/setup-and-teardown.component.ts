import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup-and-teardown',
  templateUrl: './setup-and-teardown.component.html',
  styleUrls: ['./setup-and-teardown.component.scss']
})
export class SetupAndTeardownComponent implements OnInit {
    
    totalVotes = 0;

  constructor() { }


    upVote() {
        this.totalVotes++;
    }

    downVote() {
        this.totalVotes--;
    }

  ngOnInit() {
  }

}
