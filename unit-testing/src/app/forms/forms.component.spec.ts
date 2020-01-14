import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { FormsComponent } from './forms.component';

describe('FormsComponent', () => {
    let component: FormsComponent;
    let fixture: ComponentFixture<FormsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FormsComponent],
            providers: [FormBuilder]
        });
        fixture = TestBed.createComponent(FormsComponent);
        component = fixture.componentInstance;
        // fixture.nativeElement
        fixture.debugElement
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create a form with 2 controls', () => {
        expect(component.form.contains('name')).toBeTruthy();
        expect(component.form.contains('email')).toBeTruthy();
    });

    it('should make the name control required', () => {

        let controlName = component.form.get('name');

        controlName.setValue('');

        expect(controlName.valid).toBeFalsy();
    });
});
