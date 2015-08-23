var compose = require('./compose'),
	once = require('./once');

const ERROR_MSG = 'function can be called only once';

function Future(producer) {
	return {
		isMonad: true,
		bind: function(right, left) {
			return Future(function(resolve, reject) {
				return producer(compose(resolve, right), compose(reject, left));
			});
		},
		subscribe: function(onRight, onLeft) {
			return producer(once(onRight, ERROR_MSG), once(onLeft, ERROR_MSG));
		}
	};
}

function Resolve(value) {
	return Future(function(resolve) {
		return resolve(value);
	});
}

function Reject(error) {
	return Future(function(resolve, reject) {
		return reject(error);
	});
}

Future.Resolve = Resolve;
Future.Reject = Reject;
module.exports = Future;
