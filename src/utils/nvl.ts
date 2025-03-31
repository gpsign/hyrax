/**
 * Returns the first value that is not null or undefined among the provided arguments.
 *
 * @param {Array<T | null | undefined>} values - A list of values that may be null or undefined.
 * @returns {T[number] | null} - The first defined value found. If all values are null or undefined, it returns `null`.
 *
 * ### Example
 * ```ts
 * nvl(null, undefined, 0, "example"); // Output: 0
 * ```
 */
export function nvl<T = unknown>(
  ...values: Array<T | null | undefined>
): T | null {
  const result = values.find((value) => value != null);
  return result === undefined ? null : result;
}
