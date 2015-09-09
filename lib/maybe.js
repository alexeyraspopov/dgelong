import {instanceOf, isMonad, isFunction, SpatialMonad} from "./monad";

module.exports = exports = Maybe;
exports.Just = Just;
exports.Nothing = Nothing;

function Maybe(value) {
	return isNullable(value) ? Nothing() : Just(value);
}

function Just(value) {
	return isMonad(value) ? value : SpatialMonad(Just, bindJust, value);
}

function Nothing() {
	return SpatialMonad(Nothing, bindNothing, null);
}

function bindJust(value, right) {
	return isFunction(right) ? Just(right(value)) : Just(value);
}

function bindNothing(value, right, left) {
	return isFunction(left) ? unwrapLeft(left()) : Nothing();
}

function unwrapLeft(value) {
	return instanceOf(value, Just) ? value : Nothing();
}

function isNullable(value) {
	return value === void 0 || value === null;
}
