import compose from "./compose";
import onetime from "./onetime";

module.exports = exports = Future;
exports.Resolve = Resolve;
exports.Reject = Reject;

const ERROR_MSG = "Function can be called only once";

function Future(producer) {
	return {
		isMonad: true,
		bind: function(right, left) {
			return Future(function(resolve, reject) {
				return producer(compose(resolve, right), compose(reject, left));
			});
		},
		subscribe: function(onRight, onLeft) {
			return producer(onetime(onRight, ERROR_MSG), onetime(onLeft, ERROR_MSG));
		}
	};
}

function Resolve(value) {
	return Future(resolve => resolve(value));
}

function Reject(error) {
	return Future((resolve, reject) => reject(error));
}
