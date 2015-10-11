import expect from "expect.js";
import {Just, Nothing} from '../lib/Maybe';

describe('Maybe', function() {
	var v = 13;
	var morphism = n => n ** 2;

	describe('Just', function() {
		it('should satisfy left identity law', function() {
			var m = Just(v);
			var left = m.map(morphism);
			var right = morphism(v);

			expect(left.valueOf()).to.be(right);
		});

		it('should satisfy right identity law', function() {
			var m = Just(v);
			var left = m.map(Just);
			var right = m;

			expect(left.valueOf()).to.be(right.valueOf());
		});

		it('should satisfy associativity law', function() {
			var m = Just(v);
			var left = m.map(Just).map(morphism);
			var right = m.map(v => Just(v).map(morphism));

			expect(left.valueOf()).to.be(right.valueOf());
		});

		it('should be idempotent', function() {
			var m = Just(v);
			var n = Just(m);

			expect(n).to.be(m);
			expect(n.valueOf()).to.be(v);
		});
	});

	describe('Nothing', function() {

	});
});
