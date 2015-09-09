import {isMonad, isFunction, SpatialMonad} from "./monad";

module.exports = exports = Maybe;
exports.Just = Just;
exports.Nothing = Nothing;

function Maybe(value) {
	return isNullable(value) ? Nothing() : Just(value);
}

function Just(value) {
	return isMonad(value) ? value : SpatialMonad(value, bindJust);
}

function Nothing() {
	return SpatialMonad(null, bindNothing, pullNothing);
}

function bindJust(value, right) {
	return isFunction(right) ? Just(right(value)) : Just(value);
}

function bindNothing(value, right, left) {
	return isFunction(left) ? unwrapJust(left(value)) : Nothing();
}

function unwrapJust(value) {
	// FIXME: pass only Just
	return isMonad(value) ? value : Nothing();
}

function pullNothing(value, right, left) {
	return isFunction(left) ? left(value) : value;
}

function isNullable(value) {
	return value === void 0 || value === null;
}
