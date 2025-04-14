import * as hooks from "./hooks";
import * as utils from "./utils";
import * as components from "./components";

import { HyraxDOM } from "./dom";
import { HyraxString } from "./string";
import { HyraxNumber } from "./number";

export * from "./hooks";
export * from "./types";
export * from "./utils";
export * from "./components";
export * from "./dom";
export * from "./string";
export * from "./number";

const Hyrax = {
  health(): number {
    console.info("Hyrax is ready!");
    return 0;
  },
  ...utils,
  ...hooks,
  ...components,
  ...HyraxDOM,
  ...HyraxString,
  ...HyraxNumber,
};

export default Hyrax;
