import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutsComponent } from './donuts.component';
import { DonutsService } from '../services/donuts.service';
import { HttpModule } from '@angular/http';
import { of } from 'rxjs/internal/observable/of';
import { from } from 'rxjs/internal/observable/from';

describe('DonutsComponent', () => {
  let component: DonutsComponent;
  let fixture: ComponentFixture<DonutsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DonutsComponent],
            providers: [DonutsService],
            imports: [HttpModule]
        });
        fixture = TestBed.createComponent(DonutsComponent);
        component = fixture.componentInstance;
        fixture.debugElement
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should get donuts on init', () => {
    let service = TestBed.get(DonutsService);
      spyOn(service, 'getDonuts').and.returnValue(from([ [
          { id: 1, style: "Old Fashioned", flavour: "Chocolate"},
          { id: 2, style: "Old cod", flavour: "Chocolate"},
          { id: 3, style: "new cod", flavour: "Chocolate"}
      ] ]))

      fixture.detectChanges();

      expect(component.donutsAll.length).toBe(3);
  });
});
