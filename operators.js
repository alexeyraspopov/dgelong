import Observable from './observable';
import Future from './future';

export function merge(monads) {
	return Observable(function(onNext) {
		return monads.forEach(monad => monad.isAsync ? monad.subscribe(onNext) : monad.bind(onNext));
	});
}

export function concat(monads) {}

export function combine(monads) {}

export function unique(observable) {
	return Observable(function(onNext, onError, onCompleted) {
		var cache;

		return observable.forEach(function(value) {
			if (typeof cache === 'undefined' || cache !== value) {
				cache = value;
				onNext(value);
			}
		}, onError, onCompleted);
	});
}

export function async(generator) {
	return Future(function(resolve, reject) {
		var iterator = generator();

		// TODO: implement me...
		// TODO: throw error if Observable was used
		// TODO: possibly add coroutine for Observables
	});
}
