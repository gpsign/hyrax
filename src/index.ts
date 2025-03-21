import * as hooks from "./hooks";
import * as utils from "./utils";

export * from "./hooks";
export * from "./types";
export * from "./utils";

const Hyrax = {
  health(): number {
    console.info("Hyrax is ready!");
    return 0;
  },
  ...utils,
  ...hooks,
};

export default Hyrax;
