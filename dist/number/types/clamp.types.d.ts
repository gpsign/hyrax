import { Numeric } from "../../utils";
export type Clamp = {
    /**
     * Clamps the given numeric value between the specified lower and upper bounds.
     *
     * ### Example
     * ```ts
     * clamp(5, 0, 10); // returns 5
     * clamp(-1, 0, 10); // returns 0
     * clamp(11, 0, 10); // returns 10
     * ```
     *
     * @param value - The numeric value to be clamped.
     * @param lower - The lower bound.
     * @param upper - The upper bound.
     * @returns The clamped value.
     */
    (value: Numeric, lower: Numeric, upper: Numeric): number;
    /**
     * Caps the given numeric value to the specified upper bound.
     *
     * In this overload, the first argument is the value to be capped, and the second argument
     * is the upper bound.
     *
     * ### Example
     * ```ts
     * clamp(5, 10); // returns 5
     * clamp(11, 10); // returns 10
     * ```
     *
     * @param value - The numeric value to be capped.
     * @param upper - The upper bound.
     * @returns The capped value.
     */
    (value: Numeric, upper: Numeric): number;
};
