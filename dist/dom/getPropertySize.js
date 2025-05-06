"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropertySize = getPropertySize;
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
function getPropertySize(property) {
    if (typeof property != "string")
        return 0;
    const body = document.body;
    const dummy = document.createElement("div");
    dummy.style.width = property;
    dummy.style.opacity = "0";
    dummy.style.pointerEvents = "none";
    dummy.style.position = "fixed";
    dummy.style.bottom = "100%";
    dummy.style.left = "0";
    body.appendChild(dummy);
    const size = window.getComputedStyle(dummy).getPropertyValue("width");
    body.removeChild(dummy);
    const number = Number(size.replaceAll("px", ""));
    if (isNaN(number))
        return 0;
    return number;
}
