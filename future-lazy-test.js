var compose = require('./compose');

function Future(producer) {
	return {
		isMonad: true,
		bind: function(right) {
			return Future(function(resolve) {
				producer(compose(resolve, right));
			});
		},
		subscribe: function(fn) {
			return producer(fn);
		}
	};
}

var a = Future(function(resolve) {
	setTimeout(resolve, 1000, 13);
});

a.subscribe(function(v) {
	console.log(v)
});
