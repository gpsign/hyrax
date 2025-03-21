export * from "./nvl";
export * from "./fabricate";
export * from "./length";
export * from "./isNumeric";
export * from "./alias";
export * from "./types";

import * as length from "./length";
import * as fabricate from "./fabricate";
import * as nvl from "./nvl";
import * as isNumber from "./isNumeric";
import * as alias from "./alias";

export const utils = {
  ...fabricate,
  ...nvl,
  ...length,
  ...isNumber,
  ...alias,
};
