import { length } from "../../utils";

describe("length", () => {
  it("should return 0 for null and undefined", () => {
    expect(length(null)).toBe(0);
    expect(length(undefined)).toBe(0);
  });

  it("should return the correct length for strings", () => {
    expect(length("hello")).toBe(5);
    expect(length("")).toBe(0);
  });

  it("should return the length of the number when converted to a string", () => {
    // 12345 -> "12345" has length 5.
    expect(length(12345)).toBe(5);
    // Negative numbers include the "-" sign.
    expect(length(-123)).toBe(4); // "-123" -> length 4
  });

  it("should return 0 for booleans", () => {
    expect(length(true)).toBe(0);
    expect(length(false)).toBe(0);
  });

  it("should return the correct length for arrays", () => {
    expect(length([1, 2, 3])).toBe(3);
    expect(length([])).toBe(0);
  });

  it("should return the function arity for functions", () => {
    const func0 = () => {};
    const func2 = (_a: unknown, _b: unknown) => {};
    const func3 = function (_a: unknown, _b: unknown, _c: unknown) {};
    expect(length(func0)).toBe(0);
    expect(length(func2)).toBe(2);
    expect(length(func3)).toBe(3);
  });

  it("should return the length property for objects with a numeric length property", () => {
    expect(length({ length: 10 })).toBe(10);
  });

  it("should treat a non-numeric length property as an entry", () => {
    expect(length({ length: "10" })).toBe(1);
  });

  it("should return the length of entries for objects without a length property", () => {
    expect(length({ name: "Hyrax", awawa: true })).toBe(2);
  });
});
