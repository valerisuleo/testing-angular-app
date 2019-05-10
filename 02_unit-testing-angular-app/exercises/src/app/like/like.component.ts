import { Component, OnInit, Input } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  @Input() totalLikes = 0;
  @Input() iLike = false;

  faCoffee = faCoffee;

  constructor() { }

  click(){
    this.iLike = !this.iLike;
    this.totalLikes += this.iLike ? 1 : -1;
  }

  ngOnInit() {
  }

}
