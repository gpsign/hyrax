/**
 * Computes the percentage representation of a value within a specified range.
 *
 * ### Example
 * ```ts
 * percent(50);          // returns 0.5 (50 is half of 100)
 * percent(75, 100, 50);   // returns 0.5 (75 is exactly halfway between 50 and 100)
 * ```
 *
 * @param value - The value to evaluate.
 * @param hundred - The upper bound of the range (default is 100).
 * @param zero - The lower bound of the range (default is 0).
 * @returns The percentage of the value relative to the range, as a decimal.
 */
export function percent(
  value: number,
  hundred: number = 100,
  zero: number = 0
): number {
  const range = hundred - zero;
  if (range === 0) return 0;
  return (value - zero) / range;
}
