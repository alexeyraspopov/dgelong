var expect = require('expect.js'),
	sinon = require('sinon'),
	{Maybe, Just, Nothing} = require('../maybe');

describe('Just', function() {
	var value = 13,
		morphism = n => n * n;

	it('should satisfy the left identity law', function() {
		var m = Just(value),
			left = m.bind(morphism),
			right = morphism(value);

		expect(left.valueOf()).to.be(right);
	});

	it('should satisfy the right identity law', function() {
		var m = Just(value),
			left = m.bind(Just),
			right = m;

		expect(left.valueOf()).to.be(right.valueOf());
	});

	it('should satisfy the associativity law', function() {
		var m = Just(value),
			left = m.bind(Just).bind(morphism),
			right = m.bind(v => Just(v).bind(morphism));

		expect(left.valueOf()).to.be(right.valueOf());
	});
});

describe('Nothing', function() {
	it('should accept alternative way of computation', function() {
		var right = sinon.spy(),
			left = sinon.spy();

		Nothing().bind(right, left);

		expect(right.called).not.to.be(true);
		expect(left.called).to.be(true);
	});

	it('should use Just in alternative way', function() {
		var value = 5;

		Nothing()
			.bind(null, () => Just(value))
			.bind(wrapped => expect(wrapped).to.be(value));
	});
});

describe('Maybe', function() {
	it('should recognize nullable values', function() {
		var subscriber1 = sinon.spy(),
			subscriber2 = sinon.spy(),
			subscriber3 = sinon.spy();

		Maybe(null).bind(subscriber1, subscriber2);
		Maybe(true).bind(subscriber3);

		expect(subscriber1.called).not.to.be(true);
		expect(subscriber2.called).to.be(true);
		expect(subscriber3.called).to.be(true);
	});
});
