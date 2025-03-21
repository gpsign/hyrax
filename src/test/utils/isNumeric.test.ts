import { isNumeric } from "../../utils";

describe("isNumeric", () => {
  it("should return true for numeric strings", () => {
    expect(isNumeric("123")).toBe(true);
    expect(isNumeric(" 123 ")).toBe(true);
  });

  it("should return false for non-numeric strings", () => {
    expect(isNumeric("abc")).toBe(false);
    expect(isNumeric("123abc")).toBe(false);
  });

  it("should return true for numbers", () => {
    expect(isNumeric(123)).toBe(true);
    expect(isNumeric(0)).toBe(true);
    expect(isNumeric(-456)).toBe(true);
  });

  it("should return true for bigint", () => {
    expect(isNumeric(BigInt(1))).toBe(true);
  });

  it("should return false for NaN", () => {
    expect(isNumeric(NaN)).toBe(false);
  });

  it("should return false for undefined", () => {
    expect(isNumeric(undefined)).toBe(false);
  });

  it("should return false for null", () => {
    expect(isNumeric(null)).toBe(false);
  });

  it("should return false for booleans", () => {
    expect(isNumeric(true)).toBe(false);
    expect(isNumeric(false)).toBe(false);
  });

  it("should return false for empty string", () => {
    expect(isNumeric("")).toBe(false);
  });

  it("should return false for plain objects", () => {
    expect(isNumeric({})).toBe(false);
  });

  it("should return false for empty array", () => {
    expect(isNumeric([])).toBe(false);
  });

  it("should return false for non-empty arrays that don’t represent a single number", () => {
    expect(isNumeric([1, 2])).toBe(false);
  });

  it("should return true for Infinity and -Infinity", () => {
    expect(isNumeric(Infinity)).toBe(true);
    expect(isNumeric(-Infinity)).toBe(true);
  });
});
