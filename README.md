# Dgelong

***It's not ready for production. Stay tuned.***

Set of useful first-class structures which allow you to get rid of your developer's pain.

 * **Flatten** by default.
 * **Minimal API sufrace area**.
 * **Immutable**.
 * **Lazy evaluation**.
 * **Full interoperability** between all structures and JavaScript natives.

## Install

	npm install dgelong --save

## Motivation

I don't want make another implementation that requires Ph.D in Math. The usage of monads should be as simple as functional composition `f(g(a))`. API should be close to native. So if we're talking about data structures, they should be produced in the same way as natives: by calling constructor function with or without `new` operator (I prefer the second approach).

## Usage

```javascript
import Dgelong from 'dgelong';
```

Or just use something specific, for example:

```javascript
import { Option, Future } from 'dgelong';
```

But, along with that, you can import particular structures by using direct paths:

```javascript
import Option, { Just, Nothing } from 'dgelong/lib/Option';
import Either, { Right, Left } from 'dgelong/lib/Either';
import Future, { Resolve, Reject } from 'dgelong/lib/Future';
import Observable from 'dgelong/lib/Observable';
```

## Option

```javascript
import { Just, Nothing } from 'dgelong/option';

function square(n) {
    return n * n;
}

function isEven(n) {
    return n % 2 ? Nothing() : Just(n);
}

Just(5)
    .map(square) // returns Just(25)
    .map(isEven) // returns Nothing()
    .map(alert); // won't work
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

## Future

```javascript
import Future from 'dgelong/future';

function fetch(url) {
	return Future(function(resolve, reject) {
		var xhr = new XMLHttpRequest();

		xhr.onload = () => resolve(this.response);
		xhr.onerror = () => reject(this);

		xhr.open(url);
		xhr.send(null);

		return {
			dispose() { xhr.abort(); }
		};
	});
}

fetch('/products')
	.bind(products => ...)
	.subscribe(showProducts);
```

## Observable

```javascript
import Observable from 'dgelong/observable';

var clicks = Observable(function(next){
	document.addEventListener('click', next);

	return {
		dispose(){ document.removeEventListener('click', next); }
	};
});

clicks
	.map(event => event.target)
	.forEach(element => ...);
```

## License

MIT
