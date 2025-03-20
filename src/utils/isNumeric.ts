import { Numeric } from "./types/isNumeric.types";

/**
 * Checks if a value is a number or a string that can be coerced into a number.
 *
 * @param value - The value to check.
 * @returns {boolean} - `true` if the value can be coerced into a valid number, otherwise `false`.
 *
 * ### Example
 * ```ts
 * isNumber(42); // returns true
 * isNumber("123"); // returns true
 * isNumber("hello"); // returns false
 * isNumber(null); // returns false
 * ```
 */
export function isNumeric(value: unknown): value is Numeric {
  return !isNaN(Number(value));
}
