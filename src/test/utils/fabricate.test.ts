import { fabricate } from "../../utils";

describe("fabricate", () => {
  it("should return the value for a simple callback without parameters", () => {
    const result = fabricate(() => 42);
    expect(result).toBe(42);
  });

  it("should pass parameters to a callback without context", () => {
    const result = fabricate((a: number, b: number) => a + b, [2, 3]);
    expect(result).toBe(5);
  });

  it("should use the context in a callback without parameters", () => {
    const context = { value: 10 };
    const result = fabricate(context, function () {
      return this.value;
    });
    expect(result).toBe(10);
  });

  it("should use the context and pass parameters to the callback", () => {
    const context = { base: 10 };
    const result = fabricate(
      context,
      function (x: number) {
        return this.base + x;
      },
      [5]
    );
    expect(result).toBe(15);
  });
});
