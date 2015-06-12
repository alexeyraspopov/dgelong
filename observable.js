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
		reduce: function(reducer, initial) {
			return bind(this, function(value, onNext) {
				initial = reducer(initial, value);
				onNext(initial);
			});
		},
		merge: function() {
			// TODO: implement me...
		},
		concat: function() {
			// TODO: implement me...
		},
		forEach: function(onNext, onError, onCompleted) {
			return producer(onNext, onError, onCompleted);
		}
	};
}

module.exports = Observable;
