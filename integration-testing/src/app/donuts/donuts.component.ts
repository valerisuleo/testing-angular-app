import { Component, OnInit } from '@angular/core';
import { DonutsService } from '../services/donuts.service';

@Component({
    selector: 'donuts',
    templateUrl: './donuts.component.html',
    styleUrls: ['./donuts.component.scss']
})
export class DonutsComponent implements OnInit {

    constructor(private service: DonutsService) { }

    donutsAll = [];

    ngOnInit() {
        this.service.getDonuts()
        .subscribe((response) => {
            this.donutsAll = response;
        });
    }

}
