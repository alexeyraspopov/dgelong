module.exports = function once(fn, message) {
	return function onetime(a) {
		var result;

		if (fn instanceof Function) {
			result = fn(a);
			fn = null;

			return result;
		}

		if (message !== void 0) {
			throw new Error(message);
		}
	};
};
