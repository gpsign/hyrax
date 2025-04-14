export * from "./types";
export * from "./getCSSVar";
export * from "./getPropertySize";

import * as getCSSVar from "./getCSSVar";
import * as getPropertySize from "./getPropertySize";

export const HyraxDOM = {
  ...getCSSVar,
  ...getPropertySize,
};
