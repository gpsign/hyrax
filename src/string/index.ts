export * from "./types";
export * from "./toCamelCase";

import * as toCamelCase from "./toCamelCase";

export const HyraxString = {
  ...toCamelCase,
};
