import compose from './lib/compose';
import onetime from './lib/onetime';

const ERROR_MSG = 'function can be called only once';

export default function Future(producer) {
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

export function Resolve(value) {
	return Future(resolve => resolve(value));
}

export function Reject(error) {
	return Future((resolve, reject) => reject(error));
}
