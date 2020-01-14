import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";

// BEFORE EXTRACTING A REUSABLE DATA SERVICE
@Injectable()
export class DonutsService {

    constructor(private http: Http) { }

    getDonuts() {
        return this.http.get('https://ga-doughnuts.herokuapp.com/doughnuts')
        .pipe(map(res => res.json()));
    }

    createDonut(newDonut) {
        return this.http.post('https://ga-doughnuts.herokuapp.com/doughnuts', JSON.stringify(newDonut))
        .pipe(map(res => res.json()));
    }

    deleteDonut(donut) {
        return this.http.delete(`https://ga-doughnuts.herokuapp.com/doughnuts/${donut.id}`);
    }
}