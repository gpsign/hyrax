import { Numeric } from "./types";
/**
 * Checks if a value is a number or a string that can be coerced into a number.
 *
 * ### Example
 * ```ts
 * isNumber(42); // returns true
 * isNumber("123"); // returns true
 * isNumber("hello"); // returns false
 * isNumber(null); // returns false
 * ```
 *
 * @param value - The value to check.
 * @returns {boolean} - `true` if the value can be coerced into a valid number, otherwise `false`.
 *
 */
export declare function isNumeric(value: unknown): value is Numeric;
