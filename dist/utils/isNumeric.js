"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumeric = isNumeric;
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
function isNumeric(value) {
    const type = typeof value;
    if (type != "string" && type != "bigint" && type != "number")
        return false;
    if (value === "")
        return false;
    return !isNaN(Number(value));
}
