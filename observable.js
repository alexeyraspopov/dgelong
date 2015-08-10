var compose = require('./compose');

function filter(fn, predicate) {
	return function(value) {
		return predicate(value) ? fn(value) : null;
	};
}

function Observable(producer) {
	return {
		map: function(morphism) {
			return Observable(function(onNext, onError, onCompleted) {
				return producer(compose(onNext, morphism), onError, onCompleted);
			});
		},
		filter: function(predicate) {
			return Observable(function(onNext, onError, onCompleted) {
				return producer(filter(onNext, predicate), onError, onCompleted);
			});
		},
		reduce: function(reducer, acc) {
			var accNotDefined = typeof acc === 'undefined';

			return Observable(function(onNext, onError, onCompleted) {
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
		// TODO: move this to operators
		unique: function() {
			var cache;

			return Observable(function(onNext, onError, onCompleted) {
				return producer(function(value) {
					if (typeof cache === 'undefined' || cache !== value) {
						cache = value;
						onNext(value);
					}
				}, onError, onCompleted);
			});
		},
		forEach: function(onNext, onError, onCompleted) {
			// TODO: wrap functions in scheduler
			return producer(onNext, onError, onCompleted);
		}
	};
}

module.exports = Observable;
