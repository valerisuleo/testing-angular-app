import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LikeComponent } from './like.component';

xdescribe('LikeComponent', () => {

  let component: LikeComponent;
  let fixture: ComponentFixture<LikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LikeComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    // component = new LikeComponent();
    fixture = TestBed.createComponent(LikeComponent);
    component = fixture.componentInstance;
  });


  it('should toggle the iLike property when I click it', () => {
    component.iLike = true;

    component.click();

    expect(component.iLike).toBe(false);
  });


  it('should increment totalLikes when clicked', () => {

    component.click();

    expect(component.totalLikes).toBe(1);
  });

  it('should decrement totalLikes if btn has already been clicked ', () => {

    component.totalLikes = 1;
    component.iLike = true;

    component.click();

    expect(component.totalLikes).toBe(0);
  });

  it('should add class on click ', () => {

    let el = fixture.nativeElement.querySelector('#mind');
    console.log('before', el, component.iLike);

    component.click();

    fixture.detectChanges();

    console.log('after', el, component.iLike);

    expect(el.getAttribute('class')).toContain('highlighted');
  });
})
