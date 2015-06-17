function map(resolve, morphism) {
	return function(value) {
		var result = morphism(value);

		if (result && result.isMonad) {
			result.bind(resolve);
		} else {
			resolve(result);
		}
	};
}

function Future(producer) {
	var pending = [];

	producer(function(value) {
		pending.forEach(function(cb) {
			cb(value);
		});
	});

	return {
		isMonad: true,
		bind: function(right, left) {
			return Future(function(resolve) {
				pending.push(map(resolve, morphism));
			});
		}
	};
}

function asyncResolve(resolve) {
	setTimeout(function() {
		resolve(13);
	}, 1000);
}

Future(asyncResolve).bind(function(value) {
	return value * 3;
}).bind(function(value) {
	console.log(value);
});

var b = Future(asyncResolve);

b.bind(function(value) {
	console.log('1', value);
});

b.bind(function(value) {
	console.log('2', value);
});

Future(asyncResolve).bind(function(value) {
	return Future(function(resolve) {
		setTimeout(function() {
			resolve(value * 2);
		}, 2000);
	});
}).bind(function(a) {
	console.log(a);
})