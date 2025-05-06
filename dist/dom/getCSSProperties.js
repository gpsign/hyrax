"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCSSProperties = getCSSProperties;
const string_1 = require("../string");
/**
 * Retrieves the computed CSS properties for a specified CSS class by creating a temporary DOM element, applying the class, and reading its computed style.
 *
 * ### Example
 * ```ts
 * const styles = getCSSProperties("my-class");
 * console.log(styles);
 * ```
 *
 * @param className - The CSS class name to extract the computed styles from.
 * @returns An object representing the computed CSS properties as React.CSSProperties.
 */
function getCSSProperties(className) {
    if (typeof className != "string")
        return {};
    const body = document.body;
    const dummy = document.createElement("div");
    dummy.classList.add(...className.split("."));
    body.appendChild(dummy);
    const computed = window.getComputedStyle(dummy);
    const properties = {};
    for (const property of Object.values(computed)) {
        properties[(0, string_1.toCamelCase)(property)] =
            computed.getPropertyValue(property);
    }
    body.removeChild(dummy);
    return properties;
}
