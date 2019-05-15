## Working with Spies

```
ngOnInit() {
	this.userService.getAll()
	.subscribe((response: any[]) => {
	this.users = response;
})
```
  
> What should we test here?

Let's see what's happening in this method:

1. We are calling `userService.getAll()` which returns an `observable`.
2. We `subcribe` to the `observable`
3. We initialise the `users` property


> What should we test here again?

So in our **test** we wanna call `ngOnInit` and be sure to initialise the `users property`.


However **we are not gonna use this `service`** because in unit test we dont'wanna touch files system, database or call back a service. We wanna isolate the component from external resources.
So we are gonna give to this component a _fakeService_

```
describe('TodosComponent', () => {
  let component: TodosComponent;
});
```

1. I am gonna declare a `service` and replacing the original service with the fake one `{ provide: UserService, useValue: UserServiceStub }`

	```
	  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [
        { provide: UserService, useValue: UserServiceStub }
      ]
    })
  }));
  	```

2. Now we cau use a `spy` to change the implementaion of the method `getAll()`

	```
	const UserServiceStub: any = {
	  getAll:jasmine.createSpy('getAll').and.returnValue(of(TESTDATA))
	}
	```





