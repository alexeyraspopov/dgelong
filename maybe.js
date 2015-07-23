var Monad = require('./monad');

function bindJust(value, right) {
	return Monad.isFunction(right) ? Just(right(value)) : Just(value);
}

function bindNothing(value, right, left) {
	return Monad.isFunction(left) ? Just(left()) : Nothing();
}

function Just(value) {
	return Monad.isMonad(value) ? value : Monad.Spatial(bindJust, value);
}

function Nothing() {
	return Monad.Spatial(bindNothing);
}

function Maybe(value) {
	return isNullable(value) ? Nothing() : Just(value);
}

Maybe.Just = Just;
Maybe.Nothing = Nothing;
module.exports = Maybe;

function isNullable(value){
	return typeof value === 'undefined' || value === null;
}
