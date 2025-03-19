import * as hooks from "./hooks";
import * as utils from "./utils";

export * from "./utils";
export * from "./hooks";

const Hyrax = {
  ...utils,
  ...hooks,
};

export default Hyrax;
