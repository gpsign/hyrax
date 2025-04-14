export * from "./types";
export * from "./getCSSVar";
export * from "./getPropertySize";
export * from "./getCSSProperties";

import * as getCSSProperties from "./getCSSProperties";
import * as getCSSVar from "./getCSSVar";
import * as getPropertySize from "./getPropertySize";

export const HyraxDOM = {
  ...getCSSVar,
  ...getPropertySize,
  ...getCSSProperties,
};
