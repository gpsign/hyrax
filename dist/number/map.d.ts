/**
 * Maps a number from one range to another.
 *
 * ### Example
 * ```ts
 * const result = map(5, 0, 10, 0, 100); // returns 50
 * ```
 *
 * @param x - The number to map.
 * @param inMin - The minimum of the input range.
 * @param inMax - The maximum of the input range.
 * @param outMin - The minimum of the output range.
 * @param outMax - The maximum of the output range.
 * @returns The mapped number in the output range.
 */
export declare function map(x: number, inMin: number, inMax: number, outMin: number, outMax: number): number;
