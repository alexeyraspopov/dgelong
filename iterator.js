'use strict';

function Iterator(collection) {
	var pointer = 0, count = collection.length;

	return {
		next: function() {
			return {
				value: collection[pointer++],
				done: pointer === count
			};
		}
	};
}

module.exports = Iterator;
