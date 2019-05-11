## Unit Testing Fundamentals

### Clean Coding Practices:

- Small function / methods (10 lines of code or less)
- Proper naming
- Single responsibility

Now let's run `ng test`. This is going to be build the app and then it launches **`karma`** which is our test runner.


Back to our component we have this really simple `fun`

```
export function compute(number) {
  if (number < 0)
    return 0;

  return number + 1;
}
```

In order to test it we create a test file `compute.spec.ts` and this is what `karma` will be looking for.

The `fun` the we are gonna using most of the time are:

- `describe()` to define a _suite_ which is group of of related tests.
- `it()` to define a spec or a test.

This is the body of our test

```
describe('compute', () => {
  it('test name', () => {

  })
})
```

`describe` and `it` both take 2 args: the first one is a `string` representing the name of the `fun` that we wanna test and second one is `() =>`

We call this `fun` and it will tel us if we succeeded or not.

> When we write test here we need to test all the execution paths: one is for negative number `if (number < 0) return 0` and the other one is for positive number `return number + 1`.

So we need to write 2 tests here:

First we import this function: `import { compute } from './compute';`

now we can write the first unit test:

```
describe('compute', () => {
  it('should return zero if input is negative', () => {
    const result = compute(-1);
    expect(result).toBe(1);
  })
})
```

The 2nd unit test:

```
describe('compute', () => {
  it('should return zero if input is negative', () => {
    const result = compute(-1);
    expect(result).toBe(0);
  })

  it('should increment the input if is positive', () => {
    const result = compute(1);
    expect(result).toBe(2);
  })
})
```

## Working with strings and arrays

#### Strings

In `greet.ts` we have this simple `fun`:

```
export function greet(name) {
  return 'Welcome ' + name;
}
```

Now in the `greet.spec.ts` we wanna test it:

```
import { greet } from './greet'

describe('greet', () => {
  it('should include the name in the message', () => {
    expect(greet('mosh')).toBe('Welcome mosh');
  })
})
```

> There is a problem with this implementation. Why?
> This test is too specific!

If we add an `!`

```
export function greet(name) {
  return 'Welcome ' + name + '!';
}
```

our test is gonna brake.

So instead of `toBe` we are gonna use `toContain` to check the existence of our `name` in our string.

```
describe('greet', () => {
  it('should include the name in the message', () => {
    expect(greet('mosh')).toContain('Welcome mosh');
  })
})
```

We did pass the test!

#### Arrays

```
export function getCurrencies() {
  return ['USD', 'AUD', 'EUR'];
}
```

We write  test just to be sure that is returning those string. We don't care about the index.

```
import { getCurrencies } from './getCurrencies'

describe('getCurrencies', () => {
  it('should return the supported currencies', () => {
    const result = getCurrencies();
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');
  })
})
```

## Setup and Teardown

It's time to test an angular component.

In `/vote.components` we have a _property_  `totalVotes` and  _methods_ that modify the value of this property.

```
export class VoteComponent {
  totalVotes = 0;

  upVote() {
    this.totalVotes++;
  }

  downVote() {
    this.totalVotes--;
  }
}
```

> The pattern we have here is **state change**. So in a lot of components we have _methods_ that modify the state of the component.


> In real world app chances are after you change the state you may use a service to make an `API` call to save the changes on the server. But that's a different pattern that we save for later.

In `/vote.component.specs.ts`:

```
import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {
  it('should increment totalVotes when upvoted', () => {
  });

});
```

We create an `instance` of the `vote.component`...

```
describe('VoteComponent', () => {
  it('should increment totalVotes when upvoted', () => {
    let component = new VoteComponent();
  });

});
```

...call the `upVote()` method...


```
describe('VoteComponent', () => {
  it('should increment totalVotes when upvoted', () => {
    let component = new VoteComponent();
    component.upVote();
  });

});
```

...and then `expect`


```
describe('VoteComponent', () => {
  it('should increment totalVotes when upvoted', () => {
    let component = new VoteComponent();

    component.upVote();

    expect(component.totalVotes).toBe(1);
  });

});
```

Now these 3 lines we see here...

```
let component = new VoteComponent();
component.upVote();
expect(component.totalVotes).toBe(1);
```
...represent a structure that we see in a lot of unit tests and it's called _**Triple A**_:

- **A**rrange
- **A**ct
- **A**ssert

```
// The Arrange part is where we initialise the system under test.
let component = new VoteComponent();
// The Act part often involves calling a method or a function.
component.upVote();
// The last one is the Assertion.
expect(component.totalVotes).toBe(1);
```

Now let's write the **2nd test**.

```
  it('should decrement totalVotes when downVote', () => {
    let component = new VoteComponent();

    component.downVote();

    expect(component.totalVotes).toBe(-1);
  });
```

>Refactoring...

```
describe('VoteComponent', () => {
  let component = new VoteComponent();

  it('should increment totalVotes when upvoted', () => {
    component.upVote();

    expect(component.totalVotes).toBe(1);
  });

  it('should decrement totalVotes when downVote', () => {
    component.downVote();

    expect(component.totalVotes).toBe(-1);
  });

});
```

> We got a **problem** with this test: if we run the test the _2nd_ one is going to fail. Because in the _1st_ one after `upVotes()` has been invoked `totalVotes = 1`, which it means when `downvote()` will be call the `totalVotes = 0` instead of `-1`. **In order words the execution of one test is affecting the execution of the other test!**

=
> How can we solve this problem?

_Each test should run in an isolated world. So we wanna start with  a clean state._

> How can we do that?


In _**Jasmine**_ we have 4 functions:

- `beforeEach()` as arg we pass a `() =>` and our test runner is going to call this function before each test.

- `afterEach()` it takes a function `() =>` that will be called aster each test and this is a place where you add your **clean up** code.

- `beforeAll()` which is executed once before each test.

- `afterAll()` which is executed once after each test.



```
describe('VoteComponent', () => {
  let component: VoteComponent;

  beforeEach(() => {
    component = new VoteComponent();
  });

  it('should increment totalVotes when upvoted', () => {
    component.upVote();

    expect(component.totalVotes).toBe(1);
  });

  it('should decrement totalVotes when downVote', () => {
    component.downVote();

    expect(component.totalVotes).toBe(-1);
  });

});
```

In _automated testing terms_ we refer to what we write in the `beforeEach()` as the **set up**...

```
  beforeEach(() => {
   // set up
  });
```

...and in the `afterEach()` as the **tear down**:

```
  afterEach(() => {
   // tear down
  });
```


## Working with Forms

Let's have a look at `/todo-form.component`:

```
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

export class TodoFormComponent {
  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: [''],
    });
  }
}
```

In the `constructor` we are using the `FormBuilder` obj:
to create a `FormGroup`:

```
this.form = fb.group({
      name: ['', Validators.required],
      email: [''],
    });
```

with **2 form controls**: _name_ and _email_.

> What should we test here?

1. Once this component has been initialised we have a form group obj with 2 controls.
2. We want to be sure that the name input field is required.

### The first test

In `beforeEach()` we initialise our component like this:

```
describe('TodoFormComponent', () => {
  var component: TodoFormComponent;

  beforeEach(() => {
    component = new TodoFormComponent()''
  });
```

Also we need to pass inside `TodoFormComponent()` an instance of the `FormBuilder`

```
import { TodoFormComponent } from './todo-form.component';
import { FormBuilder } from '@angular/forms';

describe('TodoFormComponent', () => {
  var component: TodoFormComponent;

  beforeEach(() => {
    component = new TodoFormComponent(new FormBuilder());
  });
```

> We don't have any _Act or Arrange_ because we are not acting on it, we have only _expectations_


```
  it('should create  form with 2 controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
  });
```

Here we have a method called `contains()` which takes `'name'` and returns `true` if we have a control with that name.

### The second test

```
  it('should make the name control required', () => {
    let control = component.form.get('name');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });
```

> With `component.form.get('name')` we can get a form control inside this form group. Once we got it we can set its value = `''`. We expect it to return `false`.


## Working with Event Emitter

```

import { EventEmitter } from '@angular/core';

export class VoteComponent {
  totalVotes = 0;
  voteChanged = new EventEmitter();

  upVote() {
    this.totalVotes++;
    this.voteChanged.emit(this.totalVotes);
  }
}
```

We have this property here `voteChanged` which is an `EventEmitter`

When we upvote this component should raise an event called `voteChanged` and upgrade the `totalVotes`.

### Test

```
import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {
  var component: VoteComponent;

  beforeEach(() => {
    component = new VoteComponent();
  });

  it('should raise voteChanged when upVoted', () => {
	// some code here...
});

```

> How do we do that?

`component.voteChanged` is an `EventEmitter` and as we know _EventEmitter are `observables`_ which it means we can `subscribe()` and get the event that has been raised.


#### Arrange

```
  it('should raise voteChanged when upVoted', () => {
    let totalVotes = null;
    component.voteChanged.subscribe(tv => totalVotes = tv);
  });
```

Now when we subscribe to observable we can set this `let totalVotes` variable to what we get from the event.

#### Act

```
component.upVote();
```

#### Assert

```
expect(totalVotes).not.toBeNull();
```

## Working with Spies

Now we are gonna take a look at a component who use `service` to call the backend.

Go to `/todos.component.ts`

```
  ngOnInit() {
this.service.getTodos()
.subscribe((response: any) => {
  this.todos = response;
})
}
```
  
> What should we test here?

Let's see what's happening in this method:

1. We are calling `service.getTodos()` which returns an `observable`.
2. We `subcribe` to the `observable`
3. We initialise the to `todos` property


> What should we test here again?

So in our **test** we wanna call `ngOnInit` and be sure to initialise the `todos property`.


However **we are not gonna use this `service`** because in unit test we dont'wanna touch files system, database or call back a service. We wanna isolate the component from external resources.
So we are gonna give to this component a _fakeService_

```
describe('TodosComponent', () => {
  let component: TodosComponent;
});
```

1. I am gonna declare a `service` here: 

	```
	describe('TodosComponent', () => {
	  let component: TodosComponent;
	  let service: TodoService;
	});
	```

2. Initialize the `service`
	
	```
	describe('TodosComponent', () => {
	  let component: TodosComponent;
	  let service: TodoService;
	
	  beforeEach(() => {
	    service = new TodoService();
	  });
	```
	
	> Now here in the constructor `service = new TodoService()` we need to pass an instance of the `Http` service in angular. We are not gonna do that because it would made things overcomplicated. 

3. Instead we are gonna pass **`null`**, althought it doesn't really matter because we are not gonna use the `Http` service anyway.

	```
	let component: TodosComponent;
	let service: TodoService;
		
	beforeEach(() => {
	service = new TodoService(null);
	component = new TodosComponent(service);
	});
	```

4. Now let's write the **Test**

	```
	it('should set todos property with the respose return from the service', () => {
		});
	});
	```

#### Arrange

We wanna change the implementation of `getTodos()`. To do that we use a function in _Jasmine_ called `spyOn()`.

> `spyOn()` _put a spy on a method in a class_.

With that spy we can: 

- check if a method has been called;
- change the implementation of that method; 
- return a different value;
- throw an error;

It takes 2 `args`: 
the **first** arg is the `obj` we wanna put a spy on

```
spyOn(service, )
```

and the **second** is the name of the method in that `obj`

```
spyOn(service, 'getTodos')
```

```
it('should set todos property with the respose return from the service', () => {
    spyOn(service, 'getTodos').and.callFake()
  });
```

> With `.and.callFake()` we can change the implementation of `getTodos()` method.
 
Let's have a quick look at the implementation of this method:

```
  getTodos() {
    return this.http.get('...')
    .map(response => response.json());
  }
```

`getTodos()` is a method with no parameters which returns an `observable`.

So here:

```
it('should set todos property with the respose return from the service', () => {
    spyOn(service, 'getTodos').and.callFake()
  });
```

we need to pass a function with the exact same signature.

```
it('should set todos property with the respose return from the service', () => {
    spyOn(service, 'getTodos').and.callFake(() => {
      var obs = from([1, 2, 3, 4]);
      return obs;
    })
  });
```

> We need to `import { Observable, from} from 'rxjs';`

#### Act

#### Assert








	









































