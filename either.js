var Monad = require('./monad');

function bindSuccess(value, right) {
	return Monad.isFunction(right) ? Success(right(value)) : Success(value);
}

function bindFailure(value, right, left) {
	return Monad.isFunction(left) ? Success(left(value)) : Failure(value);
}

function Success(value) {
	return Monad.isMonad(value) ? value : Monad.Spatial(bindSuccess, value);
}

function Failure(value) {
	return Monad.isMonad(value) ? value : Monad.Spatial(bindFailure, value);
}

function Either(fn) {
	try {
		return Success(fn());
	} catch(e) {
		return Failure(e);
	}
}

Either.Success = Success;
Either.Failure = Failure;
module.exports = Either;
