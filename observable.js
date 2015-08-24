import {isMonad} from "./lib/monad";
import compose from "./lib/compose";
import onetime from "./lib/onetime";

function filter(fn, predicate) {
	return function(value) {
		return predicate(value) ? fn(value) : void 0;
	};
}

function reducify(reducer, next, acc) {
	return function(value) {
		// TODO: check native .reduce implementation
		// TODO: compare with Rx's version
		if (acc === void 0) {
			acc = value;
		} else {
			acc = reducer(acc, value);
			next(acc);
		}
	};
}

function JustObservable(monad) {
	return Observable(function(onNext, onError, onCompleted) {
		return monad.bind(onCompleted, onError);
	});
}

export default function Observable(producer) {
	function forEach(onNext, onError, onCompleted) {
		// TODO: wrap functions in scheduler
		return producer(onNext, onError, onCompleted);
	}

	function bind(morphism) {
		return Observable(function MappedObservable(onNext, onError, onCompleted) {
			return producer(compose(onNext, morphism), onError, onetime(onCompleted, "Function can be called only once"));
		});
	}

	return isMonad(producer) ? JustObservable(producer) : {
		// TODO: use types instead of flags
		isMonad: true,
		map: bind,
		bind: bind,
		filter: function(predicate) {
			return Observable(function FilteredObservable(onNext, onError, onCompleted) {
				return producer(filter(onNext, predicate), onError, onCompleted);
			});
		},
		reduce: function(reducer, acc) {
			return Observable(function ReducedObservable(onNext, onError, onCompleted) {
				return producer(reducify(reducer, onNext, acc), onError, onCompleted);
			});
		},
		forEach: forEach,
		subscribe: forEach
	};
}
