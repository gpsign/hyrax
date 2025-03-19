import * as hooks from "./hooks";
import * as utils from "./utils";

export * from "./utils";
export * from "./hooks";

const Hyrax = {
  health(): number {
    console.info("Hyrax is ready!");
    return 0;
  },
  ...utils,
  ...hooks,
};

export default Hyrax;
