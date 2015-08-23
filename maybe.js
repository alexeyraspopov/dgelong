import * as Monad from './monad';

export default function Maybe(value) {
	return isNullable(value) ? Nothing() : Just(value);
}

export function Just(value) {
	return Monad.isMonad(value) ? value : Monad.SpatialMonad(bindJust, value);
}

export function Nothing() {
	return Monad.SpatialMonad(bindNothing);
}

function bindJust(value, right) {
	return Monad.isFunction(right) ? Just(right(value)) : Just(value);
}

function bindNothing(value, right, left) {
	return Monad.isFunction(left) ? Just(left()) : Nothing();
}

function isNullable(value){
	return value === void 0 || value === null;
}
