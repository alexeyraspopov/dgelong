function isMonad(value) {
	return value && value.isMonad;
}

module.exports = function Monad(bind) {
	return function Unit(value) {
		return isMonad(value) ? value : {
			isMonad: true,
			toString: null,
			bind: function(a, b) { return bind(value, a, b); },
			valueOf: function() { return value; }
		};
	};
};
