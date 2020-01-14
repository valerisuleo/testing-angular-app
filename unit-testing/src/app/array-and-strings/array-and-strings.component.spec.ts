import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayAndStringsComponent } from './array-and-strings.component';

describe('ArrayAndStringsComponent', () => {
  let component: ArrayAndStringsComponent;
  let fixture: ComponentFixture<ArrayAndStringsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ArrayAndStringsComponent]
        });
        fixture = TestBed.createComponent(ArrayAndStringsComponent);
        component = fixture.componentInstance;
        // fixture.nativeElement
        fixture.debugElement
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('greet', () => {
      it('should include the nane in the message', () => {
          const stringName = 'Mosh';
          expect(component.greet(stringName)).toContain(stringName);
      })
  })
  
  describe('getCurrencies', () => {
      it('should return the supported currencies', () => {
          const result = component.getCurrencies();
          expect(component.getCurrencies()).toContain('USD');
      })
  })
});
