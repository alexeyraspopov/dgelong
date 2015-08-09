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
			/*return Observable(function(onNext) {
				return producer(function(value) {
					onNext(morphism(value));
				});
			});*/
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
		// TODO: should be in separate module
		merge: function() {
			// TODO: implement me...
		},
		// TODO: should be in separate module
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
