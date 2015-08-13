var compose = require('./compose');

function Future(producer) {
	return {
		isMonad: true,
		bind: function(right, left) {
			return Future(function(resolve, reject) {
				return producer(compose(resolve, right), compose(reject, left));
			});
		},
		subscribe: function(onRight, onLeft) {
			return producer(onRight, onLeft);
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

Future.Resolve = Resolve;
Future.Reject = Reject;
module.exports = Future;

/*
Future(function(resolve) {
	var timer = setTimeout(resolve, 1000, 13);

	return {
		dispose: function() {
			clearTimeout(timer);
		}
	}
})
*/