var Observable = require('./observable'),
	Future = require('./future');

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

exports.async = function async(generator) {
	return Future(function(resolve, reject) {
		var iterator = generator();

		// TODO: implement me...
		// TODO: throw error if Observable was used
		// TODO: possibly add coroutine for Observables
	});
};
