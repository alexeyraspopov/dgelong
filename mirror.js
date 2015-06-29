'use strict';

function Mirror(list) {
	var keys = Array.isArray(list) ? list : Object.keys(list);

	return Object.freeze(keys.reduce(function(acc, key) {
		acc[key] = key;
		return acc;
	}, Object.create(null)));
}

exports.Mirror = Mirror;