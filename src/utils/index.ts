export * from "./nvl";
export * from "./fabricate";
export * from "./length";
export * from "./isNumeric";
export * from "./alias";
export * from "./types";
export * from "./noop";
export * from "./clamp";

import * as length from "./length";
import * as fabricate from "./fabricate";
import * as nvl from "./nvl";
import * as isNumber from "./isNumeric";
import * as alias from "./alias";
import * as noop from "./noop";
import * as clamp from "./clamp";

export const utils = {
  ...fabricate,
  ...nvl,
  ...length,
  ...isNumber,
  ...alias,
  ...noop,
  ...clamp,
};
