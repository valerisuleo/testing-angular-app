import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StubsRouterComponent } from './stubs-router.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

fdescribe('StubsRouterComponent', () => {
    let component: StubsRouterComponent;
    let fixture: ComponentFixture<StubsRouterComponent>;

    class RouterStub {
        navigate(args) {

        }
    }
    
    class ActivatedRouteStub {
        private subject = new Subject();

        push(value) {
            this.subject.next(value);
        }
        // params: Observable<any>;

        get params() {
            return this.subject.asObservable();
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [StubsRouterComponent],
            providers: [
                { provide: Router, useClass: RouterStub},
                { provide: ActivatedRoute, useClass: ActivatedRouteStub},
            ]
        });
        fixture = TestBed.createComponent(StubsRouterComponent);
        component = fixture.componentInstance;
        fixture.debugElement
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('should redirect user to donuts on save', () => {
        let router = TestBed.get(Router)
        let spy = spyOn(router, 'navigate');

        component.save();

        expect(spy).toHaveBeenCalledWith(['donuts'])
    });
    
    it('should redirect user to "not found" if invalid id', () => {
        const router = TestBed.get(Router);
        const route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
        const spy = spyOn(router, 'navigate');
        
        fixture.detectChanges();
        route.push({ id: 0 });        
        
        expect(spy).toHaveBeenCalledWith(['not-found']);
    });

});
