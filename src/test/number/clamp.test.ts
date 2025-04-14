import { clamp } from "../../number";

describe("clamp function - three arguments overload", () => {
  it("should return the value when within the bounds", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("should return the lower bound when value is below the lower bound", () => {
    expect(clamp(-1, 0, 10)).toBe(0);
  });

  it("should return the upper bound when value is above the upper bound", () => {
    expect(clamp(11, 0, 10)).toBe(10);
  });

  it("should work correctly even if lower and upper are provided in reverse order", () => {
    expect(clamp(5, 10, 0)).toBe(5);
  });
});

describe("clamp function - two arguments overload", () => {
  it("should return the value when it is less than or equal to the upper bound", () => {
    expect(clamp(5, 10)).toBe(5);
  });

  it("should return the upper bound when the value exceeds the upper bound", () => {
    expect(clamp(15, 10)).toBe(10);
  });
});
