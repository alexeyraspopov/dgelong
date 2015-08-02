var Monad = require('./monad');

function run(tasks, value) {
	while (tasks.length) setTimeout(tasks.shift(), 0, value);
}

function pendingValue(producer) {
	var status = 'pending', value, pending = [];

	producer(function(result) {
		status = 'resolved';
		value = result;
		run(pending, value);
	});

	return function(cont) {
		if (status === 'resolved') {
			run([cont], value);
		} else {
			pending.push(cont);
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
