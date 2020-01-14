## What is automated testing?

It's the practice of writing code to test our code and then run those test in automated way.

Imagine we have this function somewhere in our application. It's base calculating `fn` and based on some conditions return a different value.
Now with _manual testing_ we have to launch the app on the browser and it takes time...

```
function calculate(input) {
  if (x) {
    return...;
  } else if (y) {
    return...;
  }
}
```

With _automated testing_ it takes few seconds to test the this `fun` with different input.

```
var result = calculate(x);
var result = calculate(y);
```

**Automated testing help you to catch defects before realising your software.**

>Be **pragmatic**

Although automated test has lots of pros, it does not always fit any team or project. First the team needs discipline in order to write and maintain automated tests. If you don't work in a team like that, it may cost you more than the value you can get out of it, because you will spend lots of time trying to fix broken code test.

Another factor is **time** and **budget** of your project. Let's say you are a _startup_ and you have 3 months to turn a project into a real working software. It's better writing test only for part of app that will take more time testing manually.



## Type of Tests

In general we have 3 different types of tests:

1. Unit
2. Integration
3. End-to-end

### Unit Test

_Test a component in **isolation**, without external resources (e.g. file system, database, api endpoints)._

In `angular` terms that means testing a components in isolation without its templates or any other resources.

So if our component is using a `service` to talk to an api endpoint or a `router`  we give to him a `Fake Service/router`, we assume that the service is doing its job properly and we focus on the functionality of the component.

They are:

- Easiest to write
- Super fast
- Don't give us much confidence about the functionality of our app.

### Integration Test

_Test a component with external resources (e.g. file system, database, api endpoints)._

In `angular` terms that means testing a components along with its templates.

We can't look at this `class` as a plain typescript class we need to look at it as angular `component` and It need to be tested into an angular environment. So we need to instruct angular to compile this class along with its template.

> Require more code than a simple Unit Test.

Again if our component is using a `service` to talk to an api endpoint we give to him a `Fake Service`, we assume that the service is doing its job properly and we focus on the functionality of the component.

> What's the difference with Unit?

It involves 2 pieces together: component + template. In other words **we are testing the integration of our component with its template**


### End-to-end

_Test the entire app as a whole._

Now we can write few integration tests for our component and it might pass the test, however the app might not still works as we expect. Because we are still looking at the individual component and not at the app as a whole.

They are:

- very slow
- very fragile
- give us confidence about the functionality of our app

**We should use _e2e_ test only for key functionality.**
