"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoundingClientRect = getBoundingClientRect;
/**
 * Returns the bounding client rectangle for the provided element or ref.
 *
 * ### Example
 * ```ts
 * const element = document.getElementById('myElement');
 * const rect = getBoundingClientRect(element);
 * ```
 *
 * @param element - An HTML element or a ref to an HTML element.
 * @returns The bounding client rectangle of the element.
 */
function getBoundingClientRect(element) {
    const isRef = (value) => {
        if (typeof value != "object" || value === null)
            return false;
        return "current" in value;
    };
    if (!element) {
        return new DOMRect();
    }
    if (isRef(element)) {
        return getBoundingClientRect(element.current);
    }
    return element.getBoundingClientRect();
}
