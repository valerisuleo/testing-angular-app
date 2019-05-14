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







 













