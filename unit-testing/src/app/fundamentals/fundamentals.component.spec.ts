import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundamentalsComponent } from './fundamentals.component';

describe('FundamentalsComponent', () => {
    let component: FundamentalsComponent;
    let fixture: ComponentFixture<FundamentalsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FundamentalsComponent]
        });
        fixture = TestBed.createComponent(FundamentalsComponent);
        component = fixture.componentInstance;
        fixture.debugElement
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('compute', () => {
        it('should return 0 if input is negative', () => {
            const result = component.compute(-1);
            expect(result).toBe(0);
        })

        it('should increment number if input is positive', () => {
            const result = component.compute(1);
            expect(result).toBe(2);
        })
    })


});
