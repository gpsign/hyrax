/**
 * Returns the first value that is not null or undefined among the provided arguments.
 *
 * @param {...(T[K] | null | undefined)[]} values - A list of values that may be null or undefined.
 * @returns {T[number] | null} - The first defined value found. If all values are null or undefined, it returns `null`.
 *
 * ### Example
 * ```ts
 * nvl(null, undefined, 0, "example"); // Output: 0
 * ```
 */
export function nvl<T extends unknown[]>(
  ...values: { [K in keyof T]: T[K] | null | undefined }
): T[number] | null {
  const result = values.find((value) => value != null);
  return result === undefined ? null : result;
}
