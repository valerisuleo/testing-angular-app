import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EventBindingComponent } from './event-binding.component';

describe('EventBindingComponent', () => {
    let component: EventBindingComponent;
    let fixture: ComponentFixture<EventBindingComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EventBindingComponent],
        });
        fixture = TestBed.createComponent(EventBindingComponent);
        component = fixture.componentInstance;
        fixture.debugElement
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Note: this is an integration test so we care only about the realationhip with its template. To have a COMPLETE test have a look inside 'unit-testing' folder.
   
    it('should increase tot votes when click upVote btn', () => {
        let btn = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
        
        btn.triggerEventHandler('click', null);

        expect(component.totalVotes).toBe(1);
    });


});
