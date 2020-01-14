import { Component, OnInit } from '@angular/core';
import { DonutsService } from '../services/donuts.service';

@Component({
    selector: 'work-with-spy',
    templateUrl: './work-with-spy.component.html',
    styleUrls: ['./work-with-spy.component.scss']
})
export class WorkWithSpyComponent implements OnInit {

    all = [];
    message: any;

    newDonut = {
        id: null,
        style: "bestemmia",
        flavour: "amara"
    };


    constructor(private service: DonutsService) { }

    addDonut() {
        this.service.createDonut(this.newDonut)
            .subscribe((response) => {
                this.newDonut.id = response.id;
                this.all.push(this.newDonut);                
            }, error => {
                this.message = error;
            });
    }

    delete(id) {
        if (confirm('Are you sure?')) {
            this.service.deleteDonut(id).subscribe();
        }
    }

    ngOnInit() {
        this.service.getDonuts()
            .subscribe((response) => {
                this.all = response;
            });
    }
}
