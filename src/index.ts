import * as hooks from "./hooks";
import * as utils from "./utils";
import * as components from "./components";
import { HyraxDOM } from "./dom";

export * from "./hooks";
export * from "./types";
export * from "./utils";
export * from "./components";
export * from "./dom";

const Hyrax = {
  health(): number {
    console.info("Hyrax is ready!");
    return 0;
  },
  ...utils,
  ...hooks,
  ...components,
  ...HyraxDOM,
};

export default Hyrax;
