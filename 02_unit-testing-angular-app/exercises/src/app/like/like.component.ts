import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  totalLikes = 0;
  iLike = false;

  constructor() { }

  click(){
    this.iLike = !this.iLike;
    console.log(this.iLike);
    this.totalLikes += this.iLike ? 1 : -1;
  }

  ngOnInit() {
  }

}
