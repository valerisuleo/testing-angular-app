import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-array-and-strings',
    templateUrl: './array-and-strings.component.html',
    styleUrls: ['./array-and-strings.component.scss']
})
export class ArrayAndStringsComponent implements OnInit {

    constructor() { }

    greet(name) {
        return 'Welcome ' + name;
    }
    
    getCurrencies() {
        return ['USD', 'AUD', 'EUR'];
    }   

    ngOnInit() {
    }

}
