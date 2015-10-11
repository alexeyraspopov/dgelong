const SYMBOL_SUPPORTED = typeof Symbol === 'function';

export const ITERATOR_SYMBOL = SYMBOL_SUPPORTED ? Symbol.iterator : '@@iterator';
export const ITERATOR_FUNCTION = SYMBOL_SUPPORTED ? realIterator : fakeIterator;

function realIterator(v) {
	return typeof v[Symbol.iterator] === 'function' ? v[Symbol.iterator]() : [v][Symbol.iterator]();
}

function fakeIterator(v) {
	var iterated = false;

	return {
		next: function() {
			var entry = { value: iterated ? void 0 : v, done: iterated };
			iterated = true;
			return entry;
		}
	};
}
