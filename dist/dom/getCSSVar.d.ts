import { GetCSSVar } from "./types";
/**
 * Retrieves the computed value of a specified CSS property from the document's body element.
 *
 * ### Example
 * ```ts
 * // Given a CSS variable defined as:
 * // :root { --primary-color: #3498db; }

 * const primaryColor = getCSSVar("--primary-color", "#000000");
 * console.log(primaryColor); // Outputs: "#3498db"
 *
 * // When the CSS variable is not defined, the default value is used:
 * const fallbackColor = getCSSVar("--non-existent", "red");
 * console.log(fallbackColor); // Outputs: "red"
 * ```
 *
 * @param name - The name of the CSS property to retrieve (e.g., "--primary-color").
 * @param def - An optional default value to return if the property is not set.
 * @returns The computed value of the CSS property if it exists; otherwise, the provided default value or null.
 */
export declare const getCSSVar: GetCSSVar;
