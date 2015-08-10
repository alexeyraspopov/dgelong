module.exports = function compose(f, g) {
	return function(a) {
		return f(g(a));
	};
};
