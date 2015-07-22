var Monad = require('./monad').SpatialMonad,
	Success, Failure, Either;

Success = Monad(function(value, right) {
	return Success(right(value));
});

Failure = Monad(function(value, _, left) {
	return isFunction(left) ? Success(left(value)) : Failure(value);
});

Either = Monad(function(fn, right, left) {
	return run(fn).bind(right, left);
});

Either.Success = Success;
Either.Failure = Failure;
module.exports = Either;

function isFunction(value) {
	return typeof value === 'function';
}

function run(fn) {
	try {
		return Success(fn());
	} catch(e) {
		return Failure(e);
	}
}
