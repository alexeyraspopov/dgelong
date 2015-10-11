import curry from "../lib/curry";
import expect from "expect.js";

describe("curry", function() {
	it("should curry", function() {
		var add = curry((a, b, c) => a + b + c);

		expect(add(1, 2, 3)).to.be(6);
		expect(add(1)(2, 3)).to.be(6);
		expect(add(1, 2)(3)).to.be(6);
		expect(add(1)(2)(3)).to.be(6);
	});
});
