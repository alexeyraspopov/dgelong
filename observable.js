var compose = require('./compose');

function filter(fn, predicate) {
	return function(value) {
		return predicate(value) ? fn(value) : null;
	};
}

function Observable(producer) {
	function forEach(onNext, onError, onCompleted) {
		// TODO: wrap functions in scheduler
		return producer(onNext, onError, onCompleted);
	}

	function bind(morphism) {
		return Observable(function(onNext, onError, onCompleted) {
			return producer(compose(onNext, morphism), onError, onCompleted);
		});
	}

	return {
		map: bind,
		bind: bind,
		filter: function(predicate) {
			return Observable(function(onNext, onError, onCompleted) {
				return producer(filter(onNext, predicate), onError, onCompleted);
			});
		},
		reduce: function(reducer, acc) {
			return Observable(function(onNext, onError, onCompleted) {
				var accNotDefined = typeof acc === 'undefined';

				return producer(function(value) {
					if (accNotDefined) {
						acc = value;
					} else {
						acc = reducer(acc, value);
						onNext(acc);
					}
				}, onError, onCompleted);
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
