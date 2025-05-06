"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
describe("isNumeric", () => {
    it("should return true for numeric strings", () => {
        expect((0, utils_1.isNumeric)("123")).toBe(true);
        expect((0, utils_1.isNumeric)(" 123 ")).toBe(true);
    });
    it("should return false for non-numeric strings", () => {
        expect((0, utils_1.isNumeric)("abc")).toBe(false);
        expect((0, utils_1.isNumeric)("123abc")).toBe(false);
    });
    it("should return true for numbers", () => {
        expect((0, utils_1.isNumeric)(123)).toBe(true);
        expect((0, utils_1.isNumeric)(0)).toBe(true);
        expect((0, utils_1.isNumeric)(-456)).toBe(true);
    });
    it("should return true for bigint", () => {
        expect((0, utils_1.isNumeric)(BigInt(1))).toBe(true);
    });
    it("should return false for NaN", () => {
        expect((0, utils_1.isNumeric)(NaN)).toBe(false);
    });
    it("should return false for undefined", () => {
        expect((0, utils_1.isNumeric)(undefined)).toBe(false);
    });
    it("should return false for null", () => {
        expect((0, utils_1.isNumeric)(null)).toBe(false);
    });
    it("should return false for booleans", () => {
        expect((0, utils_1.isNumeric)(true)).toBe(false);
        expect((0, utils_1.isNumeric)(false)).toBe(false);
    });
    it("should return false for empty string", () => {
        expect((0, utils_1.isNumeric)("")).toBe(false);
    });
    it("should return false for plain objects", () => {
        expect((0, utils_1.isNumeric)({})).toBe(false);
    });
    it("should return false for empty array", () => {
        expect((0, utils_1.isNumeric)([])).toBe(false);
    });
    it("should return false for non-empty arrays that don’t represent a single number", () => {
        expect((0, utils_1.isNumeric)([1, 2])).toBe(false);
    });
    it("should return true for Infinity and -Infinity", () => {
        expect((0, utils_1.isNumeric)(Infinity)).toBe(true);
        expect((0, utils_1.isNumeric)(-Infinity)).toBe(true);
    });
});
