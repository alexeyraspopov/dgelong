function isMonad(value) {
	return value && value.isMonad;
}

function SpatialMonad(bind) {
	return function Unit(value) {
		return isMonad(value) ? value : {
			isMonad: true,
			toString: null,
			bind: function(a, b) { return bind(value, a, b); },
			valueOf: function() { return value; }
		};
	};
}

function TemporalMonad(bind) {
	return function Unit(value) {
		var pending = [];

		return isMonad(value) ? value : {
			isMonad: true,
			toString: null,
			bind: function() {

			},
			valueOf: function() { return value; }
		}
	};
}

exports.SpatialMonad = SpatialMonad;
exports.TemporalMonad = TemporalMonad;
