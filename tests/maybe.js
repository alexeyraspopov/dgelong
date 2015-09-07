import expect from "expect.js";
import sinon from "sinon";
import Maybe, {Just, Nothing} from "../lib/maybe";

describe("Just", function() {
	var value = 13;
	var morphism = n => n * n;

	it("should satisfy the left identity law", function() {
		var m = Just(value);
		var left = m.bind(morphism);
		var right = morphism(value);

		expect(left.valueOf()).to.be(right);
	});

	it("should satisfy the right identity law", function() {
		var m = Just(value);
		var left = m.bind(Just);
		var right = m;

		expect(left.valueOf()).to.be(right.valueOf());
	});

	it("should satisfy the associativity law", function() {
		var m = Just(value);
		var left = m.bind(Just).bind(morphism);
		var right = m.bind(v => Just(v).bind(morphism));

		expect(left.valueOf()).to.be(right.valueOf());
	});
});

describe("Nothing", function() {
	it("should not accept alternative way of computation", function() {
		var right = sinon.spy();
		var left = sinon.spy();

		var result = Nothing().bind(right, left);

		expect(right.called).not.to.be(true);
		expect(left.called).to.be(true);
		expect(result.valueOf()).to.be(null);
	});

	it("should use Just in alternative way", function() {
		var value = 5;

		Nothing()
			.bind(null, () => Just(value))
			.bind(wrapped => expect(wrapped).to.be(value));
	});
});

describe("Maybe", function() {
	it("should recognize nullable values", function() {
		var subscriber1 = sinon.spy();
		var subscriber2 = sinon.spy();
		var subscriber3 = sinon.spy();

		Maybe(null).bind(subscriber1, subscriber2);
		Maybe(true).bind(subscriber3);

		expect(subscriber1.called).not.to.be(true);
		expect(subscriber2.called).to.be(true);
		expect(subscriber3.called).to.be(true);
	});
});
