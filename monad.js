function isMonad(value) {
	return value && value.isMonad;
}

function isFunction(value) {
	return value instanceof Function;
}

function SpatialMonad(bind, value) {
	return {
		isMonad: true,
		toString: null,
		valueOf: function() { return value; },
		bind: function(a, b) { return bind(value, a, b); },
		lift: function(a, b) { return bind(value, a, b).valueOf(); }
	};
}

function TemporalMonad(bind, producer) {
	return {
		isMonad: true,
		toString: null,
		valueOf: function() { return function(cb) {
			return producer(cb, function(error) {
				cb(void 0, error);
			});
		}; },
		bind: function() {
			// TODO: implement me...
		},
		subscribe: function() {
			// TODO: implement me...
		}
	};
}

exports.isMonad = isMonad;
exports.isFunction = isFunction;
exports.Spatial = SpatialMonad;
exports.Temporal = TemporalMonad;
