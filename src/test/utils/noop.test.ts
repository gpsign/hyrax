import { noop } from "../../utils";

describe("noop", () => {
  it("should return undefined when called with no arguments", () => {
    expect(noop()).toBeUndefined();
  });

  it("should return undefined when called with multiple arguments", () => {
    expect(noop(1, "a", {}, null)).toBeUndefined();
  });

  it("should not throw an error regardless of the arguments passed", () => {
    expect(() => noop(42, "hello", [1, 2, 3])).not.toThrow();
  });
});
