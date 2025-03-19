import { Utils } from "../../utils/Utils";

describe("Testing Utils.ts", () => {
  it("Health Test", () => {
    const status = Utils.health();
    expect(status).toBe(0);
  });
});
