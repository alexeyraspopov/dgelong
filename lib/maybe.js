import {instanceOf, isMonad, isFunction, SpatialMonad} from "./monad";

module.exports = exports = Maybe;
exports.Just = Just;
exports.Nothing = Nothing;

function Maybe(value) {
	return isNullable(value) ? Nothing() : Just(value);
}

function Just(value) {
	return isMonad(value) ? value : SpatialMonad(Just, value, bindJust);
}

function Nothing() {
	return SpatialMonad(Nothing, null, bindNothing, pullNothing);
}

function bindJust(value, right) {
	return isFunction(right) ? Just(right(value)) : Just(value);
}

function bindNothing(value, right, left) {
	return isFunction(left) ? unwrapJust(left(value)) : Nothing();
}

function unwrapJust(value) {
	return instanceOf(value, Just) ? value : Nothing();
}

function pullNothing(value, right, left) {
	return isFunction(left) ? left(value) : value;
}

function isNullable(value) {
	return value === void 0 || value === null;
}
