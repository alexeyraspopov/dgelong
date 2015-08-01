function isMonad(value) {
	return value && value.isMonad;
}

function isFunction(value) {
	return value instanceof Function;
}

function Spatial(bind, value) {
	return {
		isMonad: true,
		toString: null,
		valueOf: function() { return value; },
		bind: function(a, b) { return bind(value, a, b); }
	};
}

function TemporalMonad(bind, producer) {
	var value;

	return {
		isMonad: true,
		toString: null,
		valueOf: function() { return value; },
		bind: function() {
			// TODO: implement me...
		}
	};
}

exports.isMonad = isMonad;
exports.isFunction = isFunction;
exports.Spatial = Spatial;
exports.TemporalMonad = TemporalMonad;
