function bind(source, binder) {
	return Observable(function(onNext, onError, onCompleted) {
		return source.forEach(function(value) {
			binder(value, onNext);
		}, onError, onCompleted);
	});
}

function Observable(producer) {
	return {
		map: function(morphism) {
			return bind(this, function(value, onNext) {
				onNext(morphism(value));
			});
		},
		filter: function(predicate) {
			return bind(this, function(value, onNext) {
				if (predicate(value)) onNext(value);
			});
		},
		reduce: function(reducer, acc) {
			var accNotDefined = typeof acc === 'undefined';

			return bind(this, function(value, onNext) {
				if (accNotDefined) {
					acc = value;
				} else {
					acc = reducer(acc, value);
					onNext(acc);
				}
			});
		},
		merge: function() {
			// TODO: implement me...
		},
		concat: function() {
			// TODO: implement me...
		},
		takeUntil: function() {
			// TODO: implement me...
		},
		unique: function() {
			var cache;

			return bind(this, function(value, onNext) {
				if (typeof cache === 'undefined' || cache !== value) {
					cache = value;
					onNext(value);
				}
			});
		},
		forEach: function(onNext, onError, onCompleted) {
			// TODO: wrap functions in scheduler
			return producer(onNext, onError, onCompleted);
		}
	};
}

module.exports = Observable;
