import curry from "../lib/curry";
import expect from "expect.js";

describe("curry", function() {
	function add(a, b, c) {
		return a + b + c;
	}

	it("should curry", function() {
		var cAdd = curry(add);

		expect(cAdd(1, 2, 3)).to.be(6);
		expect(cAdd(1)(2, 3)).to.be(6);
		expect(cAdd(1, 2)(3)).to.be(6);
		expect(cAdd(1)(2)(3)).to.be(6);
	});
});
