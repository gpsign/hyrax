export declare class Random {
    seed: string;
    private generator;
    private count;
    /**
     * Creates an instance of Random with an optional seed.
     *
     * ### Example
     * ```ts
     * const random = new Random("mySeed");
     * ```
     *
     * @param seed - Optional seed to initialize the generator.
     */
    constructor(seed?: string);
    /**
     * Generates a random number between the specified min and max with optional fixed decimal digits using a new Random instance.
     *
     * ### Example
     * ```ts
     * const num = Random.number(0, 10, 2);
     * ```
     *
     * @param min - The minimum value.
     * @param max - The maximum value.
     * @param digits - The number of decimal places (0 for integer).
     * @returns A random number.
     */
    static number(min?: number, max?: number, digits?: number): number;
    /**
     * Generates a random number between the specified min and max with optional fixed decimal digits.
     *
     * ### Example
     * ```ts
     * const random = new Random();
     * const num = random.number(0, 10, 2);
     * ```
     *
     * @param min - The minimum value.
     * @param max - The maximum value.
     * @param digits - The number of decimal places (0 for integer).
     * @returns A random number.
     */
    number(min?: number, max?: number, digits?: number): number;
    /**
     * Removes and returns a random element from the provided array.
     *
     * ### Example
     * ```ts
     * const arr = [1, 2, 3, 4];
     * const element = new Random().pop(arr);
     * ```
     *
     * @param arr - The array from which a random element is removed.
     * @returns The removed random element, or undefined if not found.
     */
    pop<T>(arr: T[]): T | undefined;
    /**
     * Removes and returns a random element from the provided array using a new Random instance.
     *
     * ### Example
     * ```ts
     * const arr = [1, 2, 3, 4];
     * const element = Random.pop(arr);
     * ```
     *
     * @param arr - The array from which a random element is removed.
     * @returns The removed random element, or undefined if not found.
     */
    static pop<T>(arr: T[]): T | undefined;
    /**
     * Generates a random Date between the given 'after' and 'before' values.
     *
     * ### Example
     * ```ts
     * const date = new Random().date("2020-01-01", "2020-12-31");
     * ```
     *
     * @param after - The lower bound date (inclusive).
     * @param before - The upper bound date (inclusive).
     * @returns A random Date within the specified range.
     */
    date(after?: number | string | Date, before?: number | string | Date): Date;
    /**
     * Generates a random Date between the given 'after' and 'before' values using a new Random instance.
     *
     * ### Example
     * ```ts
     * const date = Random.date("2020-01-01", "2020-12-31");
     * ```
     *
     * @param after - The lower bound date (inclusive).
     * @param before - The upper bound date (inclusive).
     * @returns A random Date within the specified range.
     */
    static date(after?: number | string | Date, before?: number | string | Date): Date;
    /**
     * Returns a random element from a string, array, or object's values.
     *
     * ### Example
     * ```ts
     * const element = new Random().from([10, 20, 30]);
     * ```
     *
     * @param value - A string, array, or object to select a random element from.
     * @returns A random element extracted from the provided value.
     */
    from(value: unknown): any;
    /**
     * Returns a random element from a string, array, or object's values using a new Random instance.
     *
     * ### Example
     * ```ts
     * const element = Random.from("hello");
     * ```
     *
     * @param value - A string, array, or object to select a random element from.
     * @returns A random element extracted from the provided value.
     */
    static from(value: unknown): any;
    /**
     * Returns a new array with the elements shuffled.
     *
     * ### Example
     * ```ts
     * const shuffled = new Random().shuffle([1, 2, 3, 4]);
     * ```
     *
     * @param array - The array to shuffle.
     * @returns A new array with the elements in random order.
     */
    shuffle<T>(array: Array<T>): Array<T>;
    /**
     * Returns a new array with the elements shuffled using a new Random instance.
     *
     * ### Example
     * ```ts
     * const shuffled = Random.shuffle([1, 2, 3, 4]);
     * ```
     *
     * @param array - The array to shuffle.
     * @returns A new array with the elements in random order.
     */
    static shuffle<T>(array: Array<T>): T[];
    /**
     * Returns a random boolean value based on the specified chance for true.
     *
     * ### Example
     * ```ts
     * const flag = new Random().boolean(75);
     * ```
     *
     * @param percent - The percentage chance for returning true.
     * @returns A random boolean value.
     */
    boolean(percent?: number): boolean;
    /**
     * Returns a random boolean value based on the specified chance for true using a new Random instance.
     *
     * ### Example
     * ```ts
     * const flag = Random.boolean(75);
     * ```
     *
     * @param percent - The percentage chance for returning true.
     * @returns A random boolean value.
     */
    static boolean(percent?: number): boolean;
    private UUID_CACHE;
    /**
     * Generates a unique identifier string of the specified length.
     *
     * ### Example
     * ```ts
     * const id = new Random().uuid(8);
     * ```
     *
     * @param length - The length of the UUID.
     * @returns A unique identifier string.
     */
    uuid(length?: number): string;
    /**
     * Generates a unique identifier string of the specified length using a new Random instance.
     *
     * ### Example
     * ```ts
     * const id = Random.uuid(8);
     * ```
     *
     * @param length - The length of the UUID.
     * @returns A unique identifier string.
     */
    static uuid(length?: number): string;
    /**
     * Converts the Random instance to a primitive number.
     *
     * ### Example
     * ```ts
     * const num = +new Random();
     * ```
     *
     * @returns A random number.
     */
    [Symbol.toPrimitive](hint: string): string | number;
    /**
     * Returns a string representation of the Random instance, using a generated UUID.
     *
     * ### Example
     * ```ts
     * const str = new Random().toString();
     * ```
     *
     * @returns A unique identifier string.
     */
    toString(): string;
}
