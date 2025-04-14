import { toCamelCase } from "../string";

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
export function getCSSProperties(className: string): React.CSSProperties {
  if (typeof className != "string") return {};
  const body = document.body;
  const dummy = document.createElement("div");

  dummy.classList.add(...className.split("."));

  body.appendChild(dummy);
  const computed = window.getComputedStyle(dummy);
  const properties: React.CSSProperties = {};

  for (const property of Object.values(computed)) {
    properties[toCamelCase(property) as keyof React.CSSProperties] =
      computed.getPropertyValue(property) as never;
  }

  body.removeChild(dummy);

  return properties;
}
