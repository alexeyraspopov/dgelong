# Dgelong

***It's not ready for production. Stay tuned.***

Set of useful first-class structures which allow to you get rid of your developer's pain.

 * **Flatten** by default.
 * **Minimal API sufrace area**.
 * **Immutable**.
 * **Lazy evaluation**.
 * **Full interoperability** between all structures and JavaScript natives.

## Maybe

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

## Either

	function validateUserPassword(password) {
	    if (password.length < 10) return Failure('Password too short');
	    if (!/[0-9]/g.test(password)) return Failure('Password should contain numbers');

	    return Success(password);
	}

	validateUserPassword('boo')
	    .bind(savePassword, showError);

## Future

	function fetch(url) {
		return Future(function(resolve, reject) {
			var xhr = new XMLHttpRequest();

			xhr.onload = () => resolve(this.response);
			xhr.onerror = () => reject(this);
		});
	}

	fetch('/products')
		.bind(products => ...)
		.subscribe(showProducts);

## Observable

	var clicks = Observable(function(next){
		document.addEventListener('click', next);

		return {
			dispose(){ document.removeEventListener('click', next); }
		};
	});

	clicks
		.map(event => event.target)
		.forEach(element => ...);

## License

MIT (c) Alexey Raspopov
