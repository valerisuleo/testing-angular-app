import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

    form: FormGroup

  constructor(fb: FormBuilder) {
      this.form = fb.group({
          name: ['', Validators.required],
          email: ['']
      })
   }

  ngOnInit() {
  }

}
