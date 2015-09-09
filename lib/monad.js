const SPATIAL = "SPATIAL",
	TEMPORAL = "TEMPORAL";

export var Types = {SPATIAL, TEMPORAL};

export function isMonad(value) {
	return value && value.type in Types;
}

export function isFunction(value) {
	return value instanceof Function;
}

export function SpatialMonad(value, bindOperator, pull = defaultPull(bindOperator)) {
	return {
		constructor: SpatialMonad,
		type: SPATIAL,
		toString: null,
		valueOf: () => value,
		bind: (a, b) => bindOperator(value, a, b),
		pull: (a, b) => pull(value, a, b)
	};
}

export function TemporalMonad(bindOperator, producer) {
	return {
		constructor: TemporalMonad,
		type: TEMPORAL,
		toString: null,
		valueOf: function() { return (cb) => producer(cb, (error) => cb(void 0, error)); },
		bind: function() {
			// TODO: implement bind...
		},
		subscribe: function() {
			// TODO: implement subscribe...
		}
	};
}

function defaultPull(bind) {
	return (value, a, b) => bind(value, a, b).valueOf();
}
