"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNumber = toNumber;
const dom_1 = require("../dom");
const isNumeric_1 = require("./isNumeric");
/**
 * Converts a given value to a number.
 *
 * If the value is numeric (or a numeric string), it returns the corresponding number.
 * If the value is not numeric, it is assumed to be a CSS variable or a DOM property (accepting units such as px, rem, %, dvh, etc.).
 * In that case, the function first retrieves the CSS variable's or DOM property's value using `getCSSVar`,
 * and then calculates its numeric (pixel) size using `getPropertySize`.
 *
 * For any other type, the function returns 0.
 *
 * ### Example
 * ```ts
 * // Direct numeric conversion:
 * console.log(toNumber("42")); // Outputs: 42
 *
 * // Conversion when the value is assumed to be a CSS variable or DOM property:
 * // the following will compute its size in pixels.
 * console.log(toNumber("2em")); // Outputs the computed pixel value corresponding to "2em"
 * ```
 * @param value - The value to be converted, which can be a number, numeric string, or a CSS variable/DOM property reference.
 * @returns The numeric conversion of the value, or 0 if the conversion is not possible.
 */
function toNumber(value) {
    if ((0, isNumeric_1.isNumeric)(value))
        return Number(value);
    if (typeof value !== "string")
        return 0;
    const property = dom_1.HyraxDOM.getCSSVar(value, value);
    return dom_1.HyraxDOM.getPropertySize(property);
}
