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
	var value = 13;

	it("should accept alternative way of computation only for Just", function() {
		var right = sinon.spy();
		var left = sinon.stub().returns(Just(value));

		var result = Nothing().bind(right, left);

		expect(right.called).to.be(false);
		expect(left.called).to.be(true);
		expect(result.valueOf()).to.be(value);
	});
});

describe("Maybe", function() {
	it("should recognize nullable values", function() {
		var subscriber1 = sinon.spy();
		var subscriber2 = sinon.spy();
		var subscriber3 = sinon.spy();

		Maybe(null).bind(subscriber1, subscriber2);
		Maybe(true).bind(subscriber3);

		expect(subscriber1.called).to.be(false);
		expect(subscriber3.called).to.be(true);
	});
});
