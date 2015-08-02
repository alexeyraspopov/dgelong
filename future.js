var Monad = require('./monad');

function run(tasks, value) {
	while (tasks.length) setTimeout(tasks.shift(), 0, value);
}

function pendingValue(producer) {
	var isPending = true, value, pending = [];

	producer(function(result) {
		isPending = false;
		value = result;

		run(pending, value);
	});

	return function(next) {
		if (isPending) {
			pending.push(next);
		} else {
			run([next], value);
		}
	};
}

function flatten(value, resolve) {
	if (Monad.isMonad(value)) {
		value.bind(resolve);
	} else {
		resolve(value);
	}
}

function Future(producer) {
	var wrappedProducer = pendingValue(producer);

	return {
		isMonad: true,
		bind: function(right) {
			return Future(function(resolve) {
				wrappedProducer(function(value) {
					flatten(right(value), resolve);
				});
			});
		}
	};
}

// exports.Resolve = Resolve;
// exports.Reject = Reject;
exports.Future = Future;
