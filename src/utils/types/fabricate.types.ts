/**
 * A type representing the overloaded variations of the `fabricate` function.
 */
export type Fabricate = {
  /**
   * Invokes a callback that takes no parameters.
   *
   * ### Example
   * ```ts
   * const result = fabricate(() => 42);
   * // result is 42
   * ```
   *
   * @param callback - A function with no arguments that returns a value of type T.
   * @returns The result of executing the callback.
   */
  <T>(callback: () => T): T;

  /**
   * Invokes a callback with the provided parameters.
   *
   * ### Example
   * ```ts
   * const sum = (a: number, b: number) => a + b;
   * const result = fabricate(sum, [3, 4]);
   * // result is 7
   * ```
   *
   * @param callback - A function that accepts arguments of type P and returns a value of type T.
   * @param params - An array of parameters passed to the callback.
   * @returns The result of executing the callback with the supplied parameters.
   */
  <T, P extends unknown[]>(callback: (...params: P) => T, params: P): T;

  /**
   * Invokes a callback within a provided context. The callback takes no parameters.
   *
   * ### Example
   * ```ts
   * const context = { multiplier: 2 };
   * function multiply(this: typeof context) {
   *   return this.multiplier * 5;
   * }
   * const result = fabricate(context, multiply);
   * // result is 10
   * ```
   *
   * @param context - An object that will be bound as `this` in the callback.
   * @param callback - A function that uses the provided context as `this` and returns a value of type T.
   * @returns The result of executing the callback in the given context.
   */
  <T, C extends object>(context: C, callback: (this: C) => T): T;

  /**
   * Invokes a callback within a provided context using the given parameters.
   *
   * ### Example
   * ```ts
   * const context = { multiplier: 3 };
   
   * const result = fabricate(context, function compute(a: number, b: number) {
   *   return (a + b) * this.multiplier;
   * }, [4, 5]);
   * // result is 27
   * ```
   * 
   * @param context - An object to be used as `this` when executing the callback.
   * @param callback - A function that uses the provided context as `this`, accepts parameters of type P, and returns a value of type T.
   * @param params - An array of parameters passed to the callback.
   * @returns The result of executing the callback in the given context with the supplied parameters.
   */
  <T, C extends object, P extends unknown[]>(
    context: C,
    callback: (this: C, ...params: P) => T,
    params: P
  ): T;
};
