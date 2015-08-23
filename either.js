import * as Monad from './Monad';

export default function Either(fn) {
	try {
		return Success(fn());
	} catch(e) {
		return Failure(e);
	}
}

export function Success(value) {
	return Monad.isMonad(value) ? value : Monad.SpatialMonad(bindSuccess, value);
}

export function Failure(value) {
	return Monad.isMonad(value) ? value : Monad.SpatialMonad(bindFailure, value);
}

function bindSuccess(value, right) {
	return Monad.isFunction(right) ? Success(right(value)) : Success(value);
}

function bindFailure(value, right, left) {
	return Monad.isFunction(left) ? Success(left(value)) : Failure(value);
}
