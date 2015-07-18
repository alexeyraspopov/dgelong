function isMonad(value) {
	return value && value.isMonad;
}

function map(resolve, morphism) {
	return function(value) {
		var result = morphism(value);

		if (isMonad(result)) {
			result.bind(resolve);
		} else {
			resolve(result);
		}
	};
}

function Future(producer) {
	var pending = [];

	producer(function(value) {
		pending.forEach(function(cb) {
			cb(value);
		});
	});

	return {
		isMonad: true,
		bind: function(right, left) {
			return Future(function(resolve) {
				pending.push(map(resolve, right));
			});
		}
	};
}

// exports.Resolve = Resolve;
// exports.Reject = Reject;
exports.Future = Future;
