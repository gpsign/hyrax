"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
describe("length", () => {
    it("should return 0 for null and undefined", () => {
        expect((0, utils_1.length)(null)).toBe(0);
        expect((0, utils_1.length)(undefined)).toBe(0);
    });
    it("should return the correct length for strings", () => {
        expect((0, utils_1.length)("hello")).toBe(5);
        expect((0, utils_1.length)("")).toBe(0);
    });
    it("should return the length of the number when converted to a string", () => {
        // 12345 -> "12345" has length 5.
        expect((0, utils_1.length)(12345)).toBe(5);
        // Negative numbers include the "-" sign.
        expect((0, utils_1.length)(-123)).toBe(4); // "-123" -> length 4
    });
    it("should return 0 for booleans", () => {
        expect((0, utils_1.length)(true)).toBe(0);
        expect((0, utils_1.length)(false)).toBe(0);
    });
    it("should return the correct length for arrays", () => {
        expect((0, utils_1.length)([1, 2, 3])).toBe(3);
        expect((0, utils_1.length)([])).toBe(0);
    });
    it("should return the function arity for functions", () => {
        const func0 = () => { };
        const func2 = (_a, _b) => { };
        const func3 = function (_a, _b, _c) { };
        expect((0, utils_1.length)(func0)).toBe(0);
        expect((0, utils_1.length)(func2)).toBe(2);
        expect((0, utils_1.length)(func3)).toBe(3);
    });
    it("should return the length property for objects with a numeric length property", () => {
        expect((0, utils_1.length)({ length: 10 })).toBe(10);
    });
    it("should treat a non-numeric length property as an entry", () => {
        expect((0, utils_1.length)({ length: "10" })).toBe(1);
    });
    it("should return the length of entries for objects without a length property", () => {
        expect((0, utils_1.length)({ name: "Hyrax", awawa: true })).toBe(2);
    });
});
