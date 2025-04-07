import * as hooks from "./hooks";
import * as utils from "./utils";
import * as components from "./components";

export * from "./hooks";
export * from "./types";
export * from "./utils";
export * from "./components";

const Hyrax = {
  health(): number {
    console.info("Hyrax is ready!");
    return 0;
  },
  ...utils,
  ...hooks,
  ...components,
};

export default Hyrax;
