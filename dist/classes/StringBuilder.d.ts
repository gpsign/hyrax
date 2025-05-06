export declare class StringBuilder {
    private parts;
    private uniq;
    private uniqFlag;
    private condFlag;
    /**
     * Creates a new instance of StringBuilder.
     *
     * ### Example
     * ```ts
     * const sb = new StringBuilder(true);
     * ```
     *
     * @param uniq - Flag indicating whether duplicate strings should be ignored.
     */
    constructor(uniq?: boolean);
    /**
     * Initializes a new StringBuilder instance.
     *
     * ### Example
     * ```ts
     * const sb = StringBuilder.init(true);
     * ```
     *
     * @param uniq - Flag indicating whether duplicate strings should be ignored.
     * @returns A new StringBuilder instance.
     */
    static init(uniq?: boolean): StringBuilder;
    /**
     * Appends a string with an optional prefix.
     *
     * ### Example
     * ```ts
     * const sb = new StringBuilder().append("world", "Hello ");
     * ```
     *
     * @param str - The string to append.
     * @param pre - An optional prefix to prepend to the string.
     * @returns The updated StringBuilder instance.
     */
    append(str: string, pre?: string): this;
    /**
     * Removes the specified string from the builder.
     *
     * ### Example
     * ```ts
     * const sb = new StringBuilder().append("sample").remove("sample");
     * ```
     *
     * @param str - The string to remove.
     * @returns The updated StringBuilder instance.
     */
    remove(str: string): this;
    /**
     * Conditionally appends a string if the condition is truthy.
     *
     * ### Example
     * ```ts
     * const sb = new StringBuilder().if(true, "conditional");
     * ```
     *
     * @param cond - The condition to evaluate.
     * @param str - The string to append if the condition is truthy.
     * @param pre - An optional prefix to prepend to the string.
     * @returns The updated StringBuilder instance.
     */
    if(cond: unknown, str: string, pre?: string): this;
    /**
     * Conditionally appends a string if no previous condition was met.
     *
     * ### Example
     * ```ts
     * const sb = new StringBuilder().if(false, "first").elif(true, "second");
     * ```
     *
     * @param cond - The condition to evaluate.
     * @param str - The string to append if the condition is truthy and no previous condition was met.
     * @param pre - An optional prefix to prepend to the string.
     * @returns The updated StringBuilder instance.
     */
    elif(cond: unknown, str: string, pre?: string): this;
    /**
     * Appends a string if no previous condition was met.
     *
     * ### Example
     * ```ts
     * const sb = new StringBuilder().if(false, "first").else("default");
     * ```
     *
     * @param str - The string to append.
     * @param pre - An optional prefix to prepend to the string.
     * @returns The updated StringBuilder instance.
     */
    else(str: string, pre?: string): this;
    /**
     * Concatenates the stored strings using the specified delimiter.
     *
     * ### Example
     * ```ts
     * const result = new StringBuilder().append("Hello").append("World").get(" ");
     * ```
     *
     * @param delim - The delimiter to use between parts.
     * @returns The concatenated string.
     */
    get(delim?: string): string;
    /**
     * Returns the concatenated string representation.
     *
     * ### Example
     * ```ts
     * const str = `${new StringBuilder().append("Hello").append("World")}`;
     * ```
     *
     * @returns The concatenated string.
     */
    [Symbol.toPrimitive](): string;
    /**
     * Returns the concatenated string representation.
     *
     * ### Example
     * ```ts
     * const str = new StringBuilder().append("Hello").toString();
     * ```
     *
     * @returns The concatenated string.
     */
    toString(): string;
}
