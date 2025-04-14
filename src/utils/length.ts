import { isNumeric } from "./isNumeric";

/**
 * Returns the "length" of a given value, depending on its type.
 *
 * This function returns the length or size of the value passed to it based on the type of the value.
 * It handles different types including strings, numbers, arrays, functions, and objects with a `length` property.
 * If the value cannot be interpreted as having a length, it returns 0.
 *
 * ### Example
 * ```ts
 * length("hello"); // returns 5
 * length([1, 2, 3]); // returns 3
 * length(12345); // returns 5 (length of the number as a string)
 * length({ length: 10 }); // returns 10
 * length({ name: "Hyrax", awawa: true }); // returns 2
 * length(null); // returns 0
 * length(() => {}); // returns 0 (length of the function's argument list)
 * ```
 *
 * @param value - The value whose length is to be determined.
 * @returns {number} - The length of the value. If the value is `null`, `undefined`, or cannot be determined to have a length, it returns 0.
 *
 */
export function length(value: unknown): number {
  if (value == null) return 0;
  if (typeof value === "string" || isNumeric(value))
    return String(value).length;
  if (Array.isArray(value)) return value.length;
  if (typeof value === "function") return value.length;
  if (typeof value != "object") return 0;
  if ("length" in value && typeof value.length === "number")
    return value.length;

  return Object.keys(value).length;
}
