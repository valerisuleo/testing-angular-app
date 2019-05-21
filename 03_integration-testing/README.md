# Integration Testing

## Introduction

So we learned how to write unit test in isolation, but they have a **limitation**: we cannot test the integration of a component with its template.

That's what _Integration Test_ are for!

### In this section...

- Testing templates
- Testing navigaiton
- Testing directives
- Dealing with asynch operations

## Setup Code

```
import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {

  beforeEach(() => {
  });

  it('', () => {
  });
});
```

In the `beforeEach` block we need to create an instance of our component but in _i.t._ we can't write:

```
beforeEach(() => {
    new VoterComponent()
  });
```

**This is only for unit test!**

If we wanna write _i.t._ we need to ask to angular an instance of that component for us.

**1)** On the top we import `import { TestBed } from '@angular/core/testing'`. This class provide a nuhmber of utility methods.

**2)** Now we need to create a _dynamic  testing module_ and put our compnent in that module, just like we do in the `/app.module`:

```
  beforeEach(() => {
    TestBed.configureTestingModule()
  });
```

Now here we only gonna use the `declaretion` part because we don't need anything else, this is a vey simple component.

```
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    })
  });
```

**3)** Now in order to create an instance of this component we call: `TestBed.createComponent(VoterComponent)` and the arg. of this method is the component itself.

> Look at the return type of this method: it does not return an instance of the component, it return: `ComponentFixture<VoterComponent>` whic is a generic class. So this ComponentFixture is a wrapper around our component instance; with that we can get access to both the component's instance and its template.

**4)**`import { TestBed, ComponentFixture } from '@angular/core/testing'`

**5)** Let's declare now a couple of variables:

```
describe('VoterComponent', () => {
  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    });
    TestBed.createComponent(VoterComponent)
  });
```

**6)** Now initialize these variables:

```
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    });
    fixture = TestBed.createComponent(VoterComponent);
  });
```

and then from fixture we can get the component instance:

```
describe('VoterComponent', () => {
  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    });
    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;
  });
```

Now this fixture also has some properties: 

- `fixture.nativeElement` which return an html element;
- `fixture.debugElement`  which is a wrapper around native element and with this debug element we got some useful methods for curing the DOM.

```
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    });
    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;
    // fixture.nativeElement
    fixture.debugElement
  });
```

So this is the basic setup for writing integration test.

### Why the setup code is differente when we use Angular CLI ?

Just like before we have the declaration of component and its fixture:

```
describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
```

> However we have now 2 `beforeEach` blocks ?!

In the **first** `beforeEach` block we configure our testing module

```
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ]
    })
    .compileComponents();
  }));
```

In the **second** block we create the component.

```
  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
```

> Why has it been implemented in this way?

The reason for this it's because the component's template is in a separate file and we need to instruct angular to compile that template as part of the stylesheet with the component implementation.

**Note** that we have a call to `compileComponents()` method which is chained to `configureTestingModule`; so with this we are telling angulare to compile all the componets we've declared here `declarations: [ UsersComponent ]` along with theri templates and stylesheets.

Now because these files are external angular needs to access to the files systems, and access to the files systems is a littel bit slow. That's why `compileComponents` does this async:

```
beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ]
    })
    .compileComponents();
  }));
```

#### Refactoring...

> In the last lecture we didn't have a call to `compileComponents()`. Why?

Because when we use `webpack`automatically inlines the component template and stylesheet in our javascript file and this means we don't really have to call this `compileComponents()` method and it's adding extra complexity (we have 2 `beforeEach` block). So we can do:

```
describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ]
    });
    
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## Testing Property and Class Binding

Anywhere we have **bindings**: property, class, style or event.

```
    <i
        class="glyphicon glyphicon-menu-up vote-button"
        [class.highlighted]="myVote == 1"
        (click)="upVote()"></i>

    <span class="vote-count">{{ totalVotes }}</span>
```

> What are we gonna test here?

1. wanna ensure that the `totalVotes` property is rendering properly.
2. if `upVote()` I wanna be sure that we apply the `highlighted` class to our icon.
3. I wanna be sure that when I click this icon the `upVote()` method is called and `totalVotes` is increased.


#### First test

```
  it('it should render totalVotes', () => {
    component.othersVote = 20;
    component.myVote = 1;
  });
```

It shpuld return `21` but what matters for us now is **where** we are gonna display this result?

`<span class="vote-count">{{ totalVotes }}</span>`

So we wanna `query` the **DOM** and get a reference for this element, and to do that will use a **`fixture`**

`fixture.debugElement.query()`

> This `query` method takes a `predicate` which is basically a `fn` that will return `true` if some condition is met.

To do that, on the top `import { By } from '@angular/platform-browser'` 

```
  it('it should render totalVotes', () => {
    component.othersVote = 20;
    component.myVote = 1;

    fixture.debugElement.query(By.css(''))
  });
```

> We also have another method `fixture.debugElement.query(By.directive('.vote-count'));`. So if you have a custom directive and you wanna find an element that has that directive applied to it we can pass the directive inside the type selector `('')`.

As we know `fixture` is just a wrapper around our html element `let de = fixture.debugElement.query(By.css('.vote-count'));`

In order to access to the actual element we can do: `de.nativeElement` however because by default the type is set to `any` we haven't access to intellisense.
We can fix it in this way:

```
  it('it should render totalVotes', () => {
    component.othersVote = 20;
    component.myVote = 1;

    let de = fixture.debugElement.query(By.css('.vote-count'));
    let el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain('21');
  });
```

Now if we run this test we can see in the terminal this error: _Expected '' to contain '21'._

> Why our test in broken?

Because outside of these tests angular regulary runs its algorithm to detect changes and updating the DOM, but here we have to tell esplicitly to do that.

So if we do:

```
  it('it should render totalVotes', () => {
    component.othersVote = 20;
    component.myVote = 1;
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.vote-count'));
    let el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain('21');
  });
```

It will work! :) 

#### Second test

if `upVote()` I wanna be sure that we apply the `highlighted` class to our icon.



## Providing Stubs

Ok, now let's test a component who uses router for navigation.

```
  save() { 
    this.router.navigate(['users']);
  }
```

In this component when we click call the `save()` we are gonna take the user to `/users`.

We write 2 tests:

1. to ensure this component is interacting with the `router` properly .
2. to ensure that we have a proper `route`.

> We don't wanna interact with the real `service` so will replace it with a **Stub**.

Let's have a look at the component:

`constructor(private router: Router, private route: ActivatedRoute)`

In our test we need to tell angular to replace both `Router` and `ActivatedRoute` with stubs.

> How?

```
class RouterStub {
  navigate(params) {

  }
}

class ActivatedRouteStub {
  parmas: Observable<any>;
}

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ],
    })
    .compileComponents();
  }));
```

At this point we are gonna get an **err** `Cannot read property 'subscribe' of undefined`.

> Why?

Bacause we subscribed to this observable `this.route.params.subscribe`; however in we did not initalise this property `parmas: Observable<any>` so it's `undefined`.

> Fix it

Let's initialise this `params: Observable<any> = EMPTY;` to empty observable.


## Testing Navigation

**1** We wanna add a `spy` on the `navigate` method of the router, in order to do that we need a reference to this router:

```
  it('should redirect user to the user page after saving', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');
	
    component.save();
	
    expect(spy).toHaveBeenCalledWith(['users']);
  });
```

**2** We wanna ensure that we have a `route` configured for this path.

`touch app/app.routes.ts`
	
```
import { routes } from './app.routes';
import { UsersComponent } from './users/users.component';
	
describe('routes', () => {
	
  it('should contain a route for /users', () => {
	
    expect(routes).toContain({ path: 'users', component: UsersComponent });
  });
	
	
});
```





## Dealing With Routes Params


```
  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p['id'] === 0)
        this.router.navigate(['not-found']);
    });
  }
```

Here we are subscribing to the `params` property of these `route ` which is an **observable**. 

> How can we work with this `params` property or in other words with the `ActivatedRoute`?


We wanna get a reference to the `router` and we wanna put a `spy` on it to be sure that the `navigate` method has been called.

```
  it('should navigate the user to the not found page when an invalid user id is passed', () => {
    let router = TestBed.(Router);
    let spy = spyOn(router, 'navigate');
  });
```

We need to get a reference to the activated route obj:

```
  it('should navigate the user to the not found page when an invalid user id is passed', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');

    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute)
    
  });
```

>The `type` of this object is `ActivatedRouteStub` because we told to Angular: `{ provide: ActivatedRoute, useClass: ActivatedRouteStub }`

Back to our test:

```
 let route: ActivatedRouteStub = TestBed.(ActivatedRoute);
 route.params.
```

>Intellisense is showing us only reading methods. We don't have any method to push a new value to this observable. 

Let's make it right!

```
class ActivatedRouteStub {
  private subject = new Subject();
  
  params: Observable<any> = EMPTY;
}
```

We define a private field `subject` and initialise it to a new instance of the subject class.

>`Subject()` is a class define in `rxjs`, it is an observable + has a method `next()` that we can call to push a new value into to this observable.

```
class ActivatedRouteStub {
  private subject = new Subject();
  
  push(value: any) {
    this.subject.next(value)
  }
    // params: Observable<any> = EMPTY;
    get params() {
    return this.subject.asObservable();
  }
}
```




