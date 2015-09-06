export default function curry(fn, count = fn.length) {
	function curried(args) {
		return function(...newArgs) {
			var fullArgs = args.concat(newArgs);

			return fullArgs.length < count ? curried(fullArgs) : fn(...fullArgs);
		}
	}

	return curried([]);
}
