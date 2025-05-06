"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
describe("noop", () => {
    it("should return undefined when called with no arguments", () => {
        expect((0, utils_1.noop)()).toBeUndefined();
    });
    it("should return undefined when called with multiple arguments", () => {
        expect((0, utils_1.noop)(1, "a", {}, null)).toBeUndefined();
    });
    it("should not throw an error regardless of the arguments passed", () => {
        expect(() => (0, utils_1.noop)(42, "hello", [1, 2, 3])).not.toThrow();
    });
});
