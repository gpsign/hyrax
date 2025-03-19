export * from "./nvl";
export * from "./fabricate";
export * from "./types";

import * as fabricate from "./fabricate";
import * as nvl from "./nvl";

export const utils = {
  ...fabricate,
  ...nvl,
};
