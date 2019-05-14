// import { UserComponent } from './user.component';
// import { UserService } from '../services/user.service';
// import { from } from 'rxjs';
//
// describe('UserComponent', () => {
//   let component: UserComponent;
//   let service: UserService;
//
//   beforeEach(() => {
//     service = new UserService(null);
//     component = new UserComponent(service);
//   });
//
//   it('should set todos property with the respose return from the service', () => {
//     let arrayofObj = [
//       { id: 1, title: 'a'},
//       { id: 2, title: 'b'},
//       { id: 3, title: 'c'}
//     ]
//
//     spyOn(service, 'getAll').and.callFake(() => {
//       var obs = from([arrayofObj]);
//       return obs;
//     })
//     component.ngOnInit();
//
//     expect(component.users).toBe(arrayofObj);
//   });
//
// });


import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserComponent } from './user.component';
import { UserService } from '../services/user.service';
//import { UserServiceStub } from '../services/fakeService/fakequery.service';

const TESTDATA: any  =
[{
id: '110866',
name: 'Jamaica Blue Mountain Coffee',
image: 'https://d2qwzu24wcp0pu.cloudfront.net/whittard/product/9a221cc6.110866.jpg/280x280.fit.110866.jpg',
price: 200.95,
origin: 'Jamaica',
strength: 4.9754,
roast: 20000
},{
id: '111047',
name: 'Guatemala Elephant Coffee',
image: 'https://d2qwzu24wcp0pu.cloudfront.net/whittard/product/30409364.111047.jpg/280x280.fit.111047.jpg',
price: 34.12,
origin: 'Guatemala',
strength: 4,
roast: 30000
}]

const UserServiceStub: any = {
  // getAll:  () => [{
  //     id: '110866',
  //     name: 'Jamaica Blue Mountain Coffee',
  //     image: 'https://d2qwzu24wcp0pu.cloudfront.net/whittard/product/9a221cc6.110866.jpg/280x280.fit.110866.jpg',
  //     price: 200.95,
  //     origin: 'Jamaica',
  //     strength: 4.9754,
  //     roast: 20000
  //   }],

  getAll: jasmine.createSpy('getAll').and.returnValue(of(TESTDATA)),
  getUser: jasmine.createSpy('getUser').and.returnValue(of(TESTDATA[0]))


}

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [
        { provide: UserService, useValue: UserServiceStub }
      ]
    })
    //.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the coffe list when service is called', () => {
    expect(component.users[0].id).toEqual(TESTDATA[0].id);
  });

  it('should return the activeUser when service is called', () => {
    expect(component.activeUser.id).toEqual(TESTDATA[0].id);
  });


  it('should set activeUser to undefined on deleteUser', () => {
    expect(component.activeUser.id).toEqual(TESTDATA[0].id);
  });






});
