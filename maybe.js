var Monad = require('./monad').SpatialMonad,
	Just, Nothing, Maybe;

Just = Monad(function(value, right) {
	return Just(right(value));
});

Nothing = Monad(function(value, _, left) {
	return isFunction(left) ? Just(left(value)) : Nothing();
});

Maybe = Monad(function(value, right, left) {
	return (isNullable(value) ? Nothing() : Just(value)).bind(right, left);
});

exports.Just = Just;
exports.Nothing = Nothing;
exports.Maybe = Maybe;

function isFunction(value) {
	return typeof value === 'function';
}

function isNullable(value){
	return typeof value === 'undefined' || value === null;
}
