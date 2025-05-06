import { HyraxHTMLRef } from "../types";
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
export declare function getBoundingClientRect<T extends HTMLElement>(element?: HyraxHTMLRef<T>): DOMRect;
