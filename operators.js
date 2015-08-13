var Observable = require('./observable');

exports.merge = function merge(monads) {
	return Observable(function(onNext) {
		return monads.forEach(function(monad) {
			if (monad.isAsync) {
				monad.subscribe(onNext);
			} else {
				monad.bind(onNext);
			}
		});
	});
};

exports.concat = function concat(monads) {};

exports.combine = function combine(monads) {};

exports.unique = function unique(observable) {
	return Observable(function(onNext, onError, onCompleted) {
		var cache;

		return observable.forEach(function(value) {
			if (typeof cache === 'undefined' || cache !== value) {
				cache = value;
				onNext(value);
			}
		}, onError, onCompleted);
	});
};

exports.lift = function lift(fn, a, b) {
	return a.bind(function(valueA) {
		return b.bind(function(valueB) {
			return fn(a, b);
		});
	});
};
