var Monad = require('./monad');

function run(tasks, value) {
	while (tasks.length) {
		setTimeout(tasks.shift(), 0, value);
	}
}

function pendingValue(producer) {
	var isPending = true, value, pending = [];

	// TODO: ensure that only one way will be invoked and only once
	producer(function(result) {
		isPending = false;
		value = result;

		run(pending, value);
	}, function(error) {
		// TODO: implement left part
	});

	return function(next) {
		if (isPending) {
			pending.push(next);
		} else {
			run([next], value);
		}
	};
}

function flatten(value, right, left) {
	if (Monad.isMonad(value)) {
		return value.bind(right, left);
	} else {
		return right(value);
	}
}

function bindFuture(next, right, left) {
	return Future(function(resolve, reject) {
		next(function(value) {
			flatten(right(value), resolve);
		}, reject);
	});
}

function Future(producer) {
	var value = pendingValue(producer);

	return {
		isMonad: true,
		bind: function(right, left) {
			return bindFuture(value, right, left);
		}
	};
}

function Resolve(value) {
	return Future(function(resolve) {
		resolve(value);
	});
}

function Reject(error) {
	return Future(function(resolve, reject) {
		reject(error);
	});
}

exports.Resolve = Resolve;
exports.Reject = Reject;
exports.Future = Future;
