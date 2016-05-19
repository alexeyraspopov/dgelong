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

_**Note:** [Babel](https://babeljs.io/) is used for transpiling Dgelong's sources. The author highly recommends you to start using ECMAScript 6 in your project._

Dgelong's bundle uses UMD so it can be used in all environments (CommonJS, AMD, ES6 modules, browser).

### CommonJS Modules

```javascript
var Dgelong = require('dgelong');
```

### ES6 Modules

Just like in CommonJS Modules style you can grab everything in one object:

```javascript
import Dgelong from 'dgelong';
```

Or just use something specific, for example:

```javascript
import {Maybe, Future} from 'dgelong';
```

But, along with that, you can import particular structures by using direct paths:

```javascript
import Maybe, {Just, Nothing} from 'dgelong/maybe';
import Either, {Right, Left} from 'dgelong/either';
import Future, {Resolve, Reject} from 'dgelong/future';
import Observable from 'dgelong/observable';
```

### Browser

```html
<script src="node_modules/dgelong/bundle.js"></script>
```

It will provide you `Dgelong` global variable.

## Time & Space

 - Time (`bind`, `subscribe`)
   - Future (async task as value)
   - Observable (async lists)
 - Space (`bind`, `pull`)
   - Maybe (null-safe computations)
   - Either (two-way composition)

## Maybe

```javascript
import {Just, Nothing} from 'dgelong/maybe';

function square(n) {
    return n * n;
}

function isEven(n) {
    return n % 2 ? Nothing() : Just(n);
}

Just(5)
    .bind(square) // returns Just(25)
    .bind(isEven) // returns Nothing()
    .bind(alert); // won't work
```

## Either

```javascript
import {Right as Success, Left as Failure} from 'dgelong/either';

function validateUserPassword(password) {
    if (password.length < 10) return Failure('Password too short');
    if (!/[0-9]/g.test(password)) return Failure('Password should contain numbers');

    return Success(password);
}

validateUserPassword('boo')
    .bind(savePassword, showError);
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

[MIT (c) Alexey Raspopov](./LICENSE)
