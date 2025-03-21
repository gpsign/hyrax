import { nvl } from "../../utils";

describe("nvl", () => {
  it("should return null if all values are null or undefined", () => {
    expect(nvl(null, undefined, null)).toBeNull();
  });

  it("should return the first non-null, non-undefined value", () => {
    expect(nvl(null, undefined, 42, "test")).toBe(42);
    expect(nvl(undefined, "first", "second")).toBe("first");
  });

  it("should return the first argument if it is defined", () => {
    expect(nvl("hello", "world")).toBe("hello");
  });

  it("should handle falsy values (0, false, empty string) as valid", () => {
    // 0, false and "" are falsy but valid values.
    expect(nvl(null, 0, false, "")).toBe(0);
    expect(nvl(null, undefined, false, "")).toBe(false);
    expect(nvl(null, undefined, undefined, "")).toBe("");
  });

  it("should work correctly with objects", () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    expect(nvl(null, obj1, obj2)).toBe(obj1);
  });

  it("should return null when called with no arguments", () => {
    expect(nvl()).toBeNull();
  });
});
