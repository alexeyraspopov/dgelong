var compose = require('./compose');

function filter(fn, predicate) {
	return function(value) {
		return predicate(value) ? fn(value) : void 0;
	};
}

function reducify(reducer, next, acc) {
	return function(value) {
		// TODO: check native .reduce implementation
		if (acc === void 0) {
			acc = value;
		} else {
			acc = reducer(acc, value);
			next(acc);
		}
	};
}

function Observable(producer) {
	function forEach(onNext, onError, onCompleted) {
		// TODO: wrap functions in scheduler
		return producer(onNext, onError, onCompleted);
	}

	function bind(morphism) {
		return Observable(function MappedObservable(onNext, onError, onCompleted) {
			return producer(compose(onNext, morphism), onError, onCompleted);
		});
	}

	return {
		map: bind,
		bind: bind,
		filter: function(predicate) {
			return Observable(function FilteredObservable(onNext, onError, onCompleted) {
				return producer(filter(onNext, predicate), onError, onCompleted);
			});
		},
		reduce: function(reducer, acc) {
			return Observable(function ReducedObservable(onNext, onError, onCompleted) {
				return producer(reducify(reducer, onNext, acc), onError, onCompleted);
			});
		},
		takeUntil: function() {
			// TODO: implement me...
		},
		forEach: forEach,
		subscribe: forEach
	};
}

module.exports = Observable;
