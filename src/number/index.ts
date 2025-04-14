export * from "./types";
export * from "./clamp";
export * from "./map";
export * from "./percent";

import * as clamp from "./clamp";
import * as map from "./map";
import * as percent from "./percent";

export const HyraxNumber = {
  ...clamp,
  ...map,
  ...percent,
};
