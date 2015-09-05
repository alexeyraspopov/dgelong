const SPATIAL = "SPATIAL",
	TEMPORAL = "TEMPORAL";

export var Types = {SPATIAL, TEMPORAL};

export function isMonad(value) {
	return value && value.type in Types;
}

export function isFunction(value) {
	return value instanceof Function;
}

export function SpatialMonad(bind, value) {
	return {
		constructor: SpatialMonad,
		type: SPATIAL,
		toString: null,
		valueOf: () => value,
		bind: (a, b) => bind(value, a, b),
		pull: (a, b) => bind(value, a, b).valueOf()
	};
}

export function TemporalMonad(bind, producer) {
	return {
		constructor: TemporalMonad,
		type: TEMPORAL,
		toString: null,
		valueOf: function() { return (cb) => producer(cb, (error) => cb(void 0, error)); },
		bind: function() {
			// TODO: implement me...
		},
		subscribe: function() {
			// TODO: implement me...
		}
	};
}
