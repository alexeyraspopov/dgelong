import {isMonad, isFunction, SpatialMonad} from "./monad";

module.exports = exports = Maybe;
exports.Just = Just;
exports.Nothing = Nothing;

function Maybe(value) {
	return isNullable(value) ? Nothing() : Just(value);
}

function Just(value) {
	return isMonad(value) ? value : SpatialMonad(bindJust, value);
}

function Nothing() {
	return SpatialMonad(Nothing);
}

function bindJust(value, right) {
	return isFunction(right) ? Just(right(value)) : Just(value);
}

function isNullable(value) {
	return value === void 0 || value === null;
}
