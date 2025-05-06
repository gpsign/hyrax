"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const number_1 = require("../../number");
describe("clamp function - three arguments overload", () => {
    it("should return the value when within the bounds", () => {
        expect((0, number_1.clamp)(5, 0, 10)).toBe(5);
    });
    it("should return the lower bound when value is below the lower bound", () => {
        expect((0, number_1.clamp)(-1, 0, 10)).toBe(0);
    });
    it("should return the upper bound when value is above the upper bound", () => {
        expect((0, number_1.clamp)(11, 0, 10)).toBe(10);
    });
    it("should work correctly even if lower and upper are provided in reverse order", () => {
        expect((0, number_1.clamp)(5, 10, 0)).toBe(5);
    });
});
describe("clamp function - two arguments overload", () => {
    it("should return the value when it is less than or equal to the upper bound", () => {
        expect((0, number_1.clamp)(5, 10)).toBe(5);
    });
    it("should return the upper bound when the value exceeds the upper bound", () => {
        expect((0, number_1.clamp)(15, 10)).toBe(10);
    });
});
