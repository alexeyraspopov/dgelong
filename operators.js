var Observable = require('./observable');

exports.merge = function(monads) {
	return Observable(function(onNext) {
		monads.forEach(function(monad) {
			if (monad.isAsync) {
				monad.subscribe(onNext);
			} else {
				monad.bind(onNext);
			}
		});
	});
};

exports.concat = function(monads) {};

exports.combine = function(monads) {};
