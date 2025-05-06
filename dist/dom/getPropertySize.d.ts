/**
 * Computes the pixel equivalent of a CSS size property.
 *
 * ### Example
 * ```ts
 * const pixelSize = getPropertySize("2em");
 * console.log(pixelSize); // Outputs the computed pixel value corresponding to "2em"
 * ```
 *
 * @param property - The CSS size property value (e.g., "2em", "50%", "200px") whose pixel size is to be calculated.
 * @returns The calculated size in pixels as a number. If the property is not a valid string or cannot be parsed into a number, returns 0.
 */
export declare function getPropertySize(property: string): number;
