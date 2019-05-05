## Unit Testing Fundamentals

### Clean Coding Practices:

- Small function / methods (10 lines of code or less)
- Proper naming
- Single responsability

Now let's run `ng test`. This is going to be build the app and then it launches **`karma`** which is our test runner.


Back to our component we have this really simple `fun`

```
export function compute(number) {
  if (number < 0)
    return 0;

  return number + 1;
}
```

In order to test it we cerate a test file `compute.spec.ts` and this is what `karma` will be looking for.

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

### Strings

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

### Arrays

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
