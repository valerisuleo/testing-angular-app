import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hyde',
  templateUrl: './hyde.component.html',
  styleUrls: ['./hyde.component.css']
})
export class HydeComponent implements OnInit {

  form: FormGroup;
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: [''],
    });
  }

  ngOnInit() {
  }

}
