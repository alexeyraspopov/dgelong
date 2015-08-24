export default function onetime(fn, message) {
	return function onetimeWrapper(a) {
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
}
