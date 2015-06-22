'use strict';

function Iterator(input) {
	return typeof input === 'function' ? FnIterator(input) : ArrayIterator(input);
}

function ArrayIterator(collection) {
	var pointer = 0, count = collection.length;

	return {
		next: function() {
			return {
				value: collection[pointer++],
				done: pointer >= count
			};
		}
	};
}

function FnIterator(fn) {
	var cached;

	return {
		next: function() {
			cached = fn(cached);

			return {
				value: cached,
				done: false
			};
		}
	};
}

module.exports = Iterator;
