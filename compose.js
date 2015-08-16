module.exports = function compose(f, g) {
	return function composed(a) {
		return f(g(a));
	};
};
