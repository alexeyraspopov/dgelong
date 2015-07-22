function isMonad(value) {
	return value && value.isMonad;
}

function isFunction(value) {
	return typeof value === 'function';
}

function Spatial(bind, value) {
	return {
		isMonad: true,
		toString: null,
		valueOf: function() { return value; },
		bind: function(a, b) { return bind(value, a, b); }
	};
}

function TemporalMonad(bind) {
	return {
		isMonad: true,
		toString: null,
		valueOf: function() {
			// TODO: implement me...
		},
		bind: function() {
			// TODO: implement me...
		}
	};
}

exports.isMonad = isMonad;
exports.isFunction = isFunction;
exports.Spatial = Spatial;
exports.TemporalMonad = TemporalMonad;
