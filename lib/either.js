import {isMonad, isFunction, SpatialMonad} from "./monad";

module.exports = exports = Either;
exports.Right = Right;
exports.Left = Left;

function Either(fn) {
	try {
		return Right(fn());
	} catch(e) {
		return Left(e);
	}
}

function Right(value) {
	return isMonad(value) ? value : SpatialMonad(Right, bindRight, value);
}

function Left(value) {
	return isMonad(value) ? value : SpatialMonad(Left, bindLeft, value);
}

function bindRight(value, right) {
	return isFunction(right) ? Right(right(value)) : Right(value);
}

function bindLeft(value, right, left) {
	return isFunction(left) ? Right(left(value)) : Left(value);
}
