import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEmitterComponent } from './event-emitter.component';

describe('EventEmitterComponent', () => {
    let component: EventEmitterComponent;
    let fixture: ComponentFixture<EventEmitterComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EventEmitterComponent],
        });
        fixture = TestBed.createComponent(EventEmitterComponent);
        component = fixture.componentInstance;
        fixture.debugElement
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should raise voteChanged event when upVote', () => {
        let totalVotes = null;
        component.voteChanged.subscribe(tv => totalVotes = tv)

        component.upVote();

        // expect(totalVotes).not.toBeNull(); too generic
        expect(totalVotes).toBe(1); // this one better
    });
});
