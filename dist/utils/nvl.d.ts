/**
 * Returns the first value that is not null or undefined among the provided arguments.
 *
 * ### Example
 * ```ts
 * nvl(null, undefined, 0, "example"); // Output: 0
 * ```
 *
 * @param {...T} values - A list of values that may be null or undefined.
 * @returns {T[number] | null} - The first defined value found. If all values are null or undefined, it returns `null`.
 *
 */
export declare function nvl<T extends unknown[]>(...values: T): T[number] | null;
