import { RefObject } from "react";
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
export function getBoundingClientRect<T extends HTMLElement>(
  element?: HyraxHTMLRef<T>
): DOMRect {
  const isRef = (value: unknown): value is RefObject<T | null> => {
    if (typeof value != "object" || value === null) return false;
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
