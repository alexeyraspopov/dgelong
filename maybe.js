var Monad = require('./monad'),
	Just, Nothing, Maybe;

Just = Monad(function(value, right) {
	return Just(right(value));
});

Nothing = Monad(function(value, _, left) {
	return isFunction(left) ? Just(left(value)) : Nothing();
});

function Maybe(value) {
	return (isNullable(value) ? Nothing() : Just(value));
}

exports.Just = Just;
exports.Nothing = Nothing;
exports.Maybe = Maybe;

function isFunction(value) {
	return typeof value === 'function';
}

function isNullable(value){
	return typeof value === 'undefined' || value === null;
}
