# Dgelong

Set of useful first-class structures which allow you to get rid of your developer's pain.

 * **Flatten** by default.
 * **Minimal API sufrace area**.
 * **Immutable**.
 * **Lazy evaluation**.
 * **Full interoperability** between all structures and JavaScript natives.

## Install

    npm install dgelong

## Motivation

I don't want make another implementation that requires Ph.D in Math. The usage of monads should be as simple as functional composition `f(g(a))`. API should be close to native. So if we're talking about data structures, they should be produced in the same way as natives: by calling constructor function with or without `new` operator (I prefer the second approach).

## Usage

```javascript
import Dgelong from 'dgelong';
```

Or just use something specific, for example:

```javascript
import { Option, Either } from 'dgelong';
```

## Option

```javascript
import { Just, Nothing } from 'dgelong';

function square(n) {
    return n * n;
}

function isEven(n) {
    return n % 2 ? Nothing() : Just(n);
}

new Just(5)
    .map(square) // returns Just(25)
    .map(isEven) // returns Nothing()
    .map(alert); // won't be executed
```

## Either

```javascript
import { Success, Failure } from 'dgelong/either';

function validateUserPassword(password) {
  if (password.length < 10) return Failure('Password is too short');
  if (!/[0-9]/g.test(password)) return Failure('Password should contain numbers');

  return Success(password);
}

validateUserPassword('boo')
  .map(savePassword, showError);
```
