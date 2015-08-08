function Future(producer) {
	return {
		isMonad: true,
		bind: function(right) {
			return Future(function(resolve) {
				producer(function(value) {
					resolve(right(value));
				});
			});
		},
		fork: function(fn) {
			return producer(fn);
		}
	};
}

var a = Future(function(resolve) {
	setTimeout(resolve, 1000, 13);
});

a.fork(function(v) {
	console.log(v)
});
