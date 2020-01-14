import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fundamentals',
  templateUrl: './fundamentals.component.html',
  styleUrls: ['./fundamentals.component.scss']
})
export class FundamentalsComponent implements OnInit {

  constructor() { }

    compute(number) {
        if (number < 0)
            return 0;

        return number + 1;
    }

  ngOnInit() {
  }

}



