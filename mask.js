'use strict';

function Mask(keys, hasSum) {
	var acc = Object.create(null);

	if (hasSum) {
		acc.ALL = Math.pow(2, keys.length) - 1;
	}

	return Object.freeze(keys.reduce(function(acc, key, index) {
		acc[key] = Math.pow(2, index);
		return acc;
	}, acc));
}

exports.Mask = Mask;
