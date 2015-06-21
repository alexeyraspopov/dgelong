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
	return {
		next: function(a) {
			return {
				value: fn(a),
				done: false
			};
		}
	};
}

module.exports = Iterator;
