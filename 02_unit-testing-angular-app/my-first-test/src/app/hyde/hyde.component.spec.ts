import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HydeComponent } from './hyde.component';
import { FormBuilder } from '@angular/forms';


describe('HydeComponent', () => {
  let component: HydeComponent;
  let fixture: ComponentFixture<HydeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HydeComponent ],
      providers: [
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HydeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create  form with 2 controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
  });

     it('should make the name control required', () => {
      let control = component.form.get('name');

      control.setValue('');

      expect(control.valid).toBeFalsy();
    });
});
