"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
class Random {
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
    constructor(seed) {
        this.seed = (Date.now() * Math.random()).toString();
        this.count = 0;
        this.UUID_CACHE = new Set();
        if (seed != undefined)
            this.seed = String(seed);
        const hash = cyrb128(this.seed);
        this.generator = sfc32(...hash);
    }
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
    static number(min = 0, max = min + 100, digits = 0) {
        return new Random().number(min, max, digits);
    }
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
    number(min = 0, max = min + 100, digits = 0) {
        const originalMin = min;
        const originalMax = max;
        min = Math.min(originalMin, originalMax);
        max = Math.max(originalMin, originalMax);
        const result = this.generator() * (max - min) + min;
        this.count++;
        const hash = cyrb128(this.seed + this.count);
        this.generator = sfc32(hash[0], hash[1], hash[2], hash[3]);
        if (digits < 1)
            return Math.round(result);
        return Number(result.toFixed(digits));
    }
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
    pop(arr) {
        const popped = this.from(arr);
        const index = arr.indexOf(popped);
        arr.splice(index, 1);
        return popped;
    }
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
    static pop(arr) {
        return new Random().pop(arr);
    }
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
    date(after, before) {
        const min = new Date(after ?? 0).getTime();
        const max = new Date(before ?? Date.now()).getTime();
        return new Date(this.number(min, max));
    }
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
    static date(after, before) {
        return new Random().date(after, before);
    }
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
    from(value) {
        if (typeof value === "string" || Array.isArray(value)) {
            const random = this.number(0, value.length - 1);
            return value[random];
        }
        if (typeof value === "object" && value != null) {
            const keys = Object.keys(value);
            const random = this.number(0, keys.length - 1);
            const key = keys[random];
            return value[key];
        }
    }
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
    static from(value) {
        return new Random().from(value);
    }
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
    shuffle(array) {
        const copy = [...array];
        let currentIndex = copy.length;
        while (currentIndex != 0) {
            const randomIndex = Math.floor(this.number(0, 1, 100) * currentIndex);
            currentIndex--;
            [copy[currentIndex], copy[randomIndex]] = [
                copy[randomIndex],
                copy[currentIndex],
            ];
        }
        return copy;
    }
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
    static shuffle(array) {
        return new Random().shuffle(array);
    }
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
    boolean(percent = 50) {
        const random = this.number(0, 100);
        return Boolean(random <= percent);
    }
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
    static boolean(percent = 50) {
        return new Random().boolean(percent);
    }
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
    uuid(length = 10) {
        const generate = () => {
            let uuid = "";
            const dictionary = this.shuffle(chars);
            for (let i = 0; i < length; i++)
                uuid += this.from(dictionary);
            return uuid;
        };
        const attempts = 10;
        let uuid = "";
        for (let i = 0; i < attempts; i++) {
            uuid = generate();
            if (this.UUID_CACHE.has(uuid))
                continue;
            this.UUID_CACHE.add(uuid);
            return uuid;
        }
        console.error("Combinations exhausted! Using duplicate UUID...");
        return uuid;
    }
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
    static uuid(length = 10) {
        return new Random().uuid(length);
    }
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
    [Symbol.toPrimitive](hint) {
        if (hint === "number") {
            return this.number();
        }
        return this.toString();
    }
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
    toString() {
        return this.uuid();
    }
}
exports.Random = Random;
const CYRB_CACHE = {};
const SFC_CACHE = {};
const letters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
];
const uppercase = letters.map((s) => s.toUpperCase());
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const chars = [...letters, ...uppercase, ...numbers];
function cyrb128(str) {
    if (CYRB_CACHE[str])
        return CYRB_CACHE[str];
    let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (h1 ^= h2 ^ h3 ^ h4), (h2 ^= h1), (h3 ^= h1), (h4 ^= h1);
    CYRB_CACHE[str] = [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
    return CYRB_CACHE[str];
}
function sfc32(a, b, c, d) {
    const key = `${a},${b},${c},${d}`;
    return function () {
        if (SFC_CACHE[key])
            return SFC_CACHE[key];
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        const t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        SFC_CACHE[key] = (t >>> 0) / 4294967296;
        return SFC_CACHE[key];
    };
}
