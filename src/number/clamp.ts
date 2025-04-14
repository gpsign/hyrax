import { Numeric } from "../utils/types";
import { Clamp } from "./types";

export const clamp: Clamp = (
  value: Numeric,
  lower: Numeric,
  upper?: Numeric
): number => {
  if (upper === undefined) {
    upper = lower;
    lower = -Infinity;
  }

  [lower, upper] = [lower, upper].map(Number).sort();

  value = Number(value);

  if (value < lower) return lower;
  if (value > upper) return upper;
  return value;
};
