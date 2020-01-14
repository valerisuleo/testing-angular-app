import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkWithSpyComponent } from './work-with-spy.component';
import { DonutsService } from '../services/donuts.service';
import { from, EMPTY, throwError } from 'rxjs';
import { HttpModule } from '@angular/http';

const fakeService = [
    {
        "id": 1,
        "style": "Old Fashioned",
        "flavour": "Chocolate"
    },
    {
        "id": 2,
        "style": "Cake",
        "flavour": "Coconut"
    },
    {
        "id": 3,
        "style": "Yeast",
        "flavour": "Frosted"
    },
    {
        "id": 4,
        "style": "Glazed",
        "flavour": "Plain"
    },
]

describe('WorkWithSpyComponent', () => {
    let component: WorkWithSpyComponent;
    let fixture: ComponentFixture<WorkWithSpyComponent>;
    let service: DonutsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [WorkWithSpyComponent],
            providers: [DonutsService],
            imports: [HttpModule]
        });
        fixture = TestBed.createComponent(WorkWithSpyComponent);
        component = fixture.componentInstance;
        service = TestBed.get(DonutsService);
        fixture.debugElement
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set all property with the item restured from the server', () => {
        // ARRANGE
        spyOn(service, 'getDonuts').and.callFake(() => {
            const obs = from([fakeService]);
            return obs;
        });
        // ACT
        fixture.detectChanges();
        // ASSERTETION
        expect(component.all.length).toEqual(4);
    });
    
    it('should set all property with the item restured from the server', () => {
        // ARRANGE
        spyOn(service, 'getDonuts').and.callFake(() => {
            const obs = from([fakeService]);
            return obs;
        });
        // ACT
        fixture.detectChanges();
        // ASSERTETION
        expect(component.all.length).toEqual(4);
    });

    describe('addDonut', () => {

        it('should call the server to save the changes when a new donut is addded', () => {
            // ARRANGE
            const spy = spyOn(service, 'createDonut').and.callFake(() => {
                return EMPTY
            });
            // ACT
            component.addDonut();
            // ASSERTETION
            expect(spy).toHaveBeenCalled();
        });
        
        it('should add the new donut returned from the server', () => {
            // ARRANGE
            const newDonutStub = {
                id: 10,
                style: "string",
                flavour: "string"
            }
            // Classic solution more verbose...
            // spyOn(service, 'createDonut').and.callFake(() => {
            //     const obs = from([newDonutStub]);
            //     return obs;
            // });
            
            // Alternative solution more dry:
            spyOn(service, 'createDonut').and.returnValue(from([newDonutStub]));

            // ACT
            component.addDonut();
            // ASSERTETION
            expect(component.all.length).toBeGreaterThan(0);            
        });

        it('should set the message property if server returns when adding a newTodo', () => {
            // ARRANGE
            let error = 'error from the server';
            spyOn(service, 'createDonut').and.returnValue(throwError(error));
            // ACT
            component.addDonut();
            // ASSERTETION
            expect(component.message).toBe(error);
        });

    });

    describe('delete', () => {

        it('should call the server to delete a todo item if the user confirms', () => {
            // ARRANGE
            spyOn(window, 'confirm').and.returnValue(true);
            const spy = spyOn(service, 'deleteDonut').and.returnValue(EMPTY);
            // ACT
            component.delete(1);
            // ASSERTETION
            expect(spy).toHaveBeenCalledWith(1);
        });
        
        it('should NOT call the server to delete a todo item if the user confirms', () => {
            // ARRANGE
            spyOn(window, 'confirm').and.returnValue(false);
            const spy = spyOn(service, 'deleteDonut').and.returnValue(EMPTY);
            // ACT
            component.delete(1);
            // ASSERTETION
            expect(spy).not.toHaveBeenCalledWith(1);
        });
    });
});


