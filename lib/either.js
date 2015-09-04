import {isMonad, isFunction, SpatialMonad} from "./monad";

module.exports = exports = Either;
exports.Success = Success;
exports.Failure = Failure;

function Either(fn) {
	try {
		return Success(fn());
	} catch(e) {
		return Failure(e);
	}
}

function Success(value) {
	return isMonad(value) ? value : SpatialMonad(bindSuccess, value);
}

function Failure(value) {
	return isMonad(value) ? value : SpatialMonad(bindFailure, value);
}

function bindSuccess(value, right) {
	return isFunction(right) ? Success(right(value)) : Success(value);
}

function bindFailure(value, right, left) {
	return isFunction(left) ? Success(left(value)) : Failure(value);
}
