var Monad = require('./monad'),
	Just, Nothing, Maybe;

Just = Monad(function(value, right) {
	return Just(right(value));
});

Nothing = Monad(function(value, _, left) {
	return isFunction(left) ? Just(left(value)) : Nothing();
});

Maybe = Monad(function(value, right, left) {
	return (isNullable(value) ? Just(value) : Nothing()).bind(right, left);
});

Maybe.Just = Just;
Maybe.Nothing = Nothing;
exports.Maybe = Maybe;

function isNullable(value){
	return typeof value === 'undefined' || value === null;
}

function isFunction(value) {
	return typeof value === 'function';
}
