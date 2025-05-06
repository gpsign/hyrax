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
export declare function getCSSProperties(className: string): React.CSSProperties;
