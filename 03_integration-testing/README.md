# Integration Testing

## Introduction

So we learned how to write unit test in isolation, but they have a **limitation**: we cannot test the integration of a component with its template.

That's what _Integration Test_ are for!

### In this section...

- Testing templates
- Testing navigaiton
- Testing directives
- Dealing with asynch operations

## Setup code

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

> Look at the return type of this method: it does not return an instance of the component, it return: `ComponentFixture<VoterComponent>` whic is a generic class. So this ComponentFixture is a wrapper around our component instance; we that we can get access to both the component's instance and its template.

**4)**`import { TestBed, ComponentFixture } from '@angular/core/testing'`

**5)** Let's declare now a couple of variable:

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








