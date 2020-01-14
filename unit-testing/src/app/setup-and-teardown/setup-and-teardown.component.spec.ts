import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupAndTeardownComponent } from './setup-and-teardown.component';

describe('SetupAndTeardownComponent', () => {
    let component: SetupAndTeardownComponent;
    let fixture: ComponentFixture<SetupAndTeardownComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SetupAndTeardownComponent]
        });
        fixture = TestBed.createComponent(SetupAndTeardownComponent);
        component = fixture.componentInstance;
        // fixture.nativeElement
        fixture.debugElement
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Vote Functions', () => {
        it('should increment total votes when upVote', () => {
            component.upVote();
            expect(component.totalVotes).toBe(1);
        });

        it('should decrement total votes when downVote', () => {
            component.downVote();
            expect(component.totalVotes).toBe(-1);
        });
    })
});
