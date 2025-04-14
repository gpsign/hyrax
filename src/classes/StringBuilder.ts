export class StringBuilder {
  private parts: string[] = [];
  private uniq: Record<string, boolean> = {};
  private uniqFlag: boolean;
  private condFlag = false;

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
  constructor(uniq = false) {
    this.uniqFlag = uniq;
  }

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
  static init(uniq = false): StringBuilder {
    return new StringBuilder(uniq);
  }

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
  append(str: string, pre: string = ""): this {
    if (!str) return this;
    if (this.uniqFlag && this.uniq[str]) return this;

    this.uniq[str] = true;
    this.parts.push(pre + str);

    return this;
  }

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
  remove(str: string): this {
    this.parts = this.parts.filter((p) => p !== str);
    this.uniq[str] = false;
    return this;
  }

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
  if(cond: unknown, str: string, pre?: string): this {
    this.condFlag = false;

    if (!cond) return this;

    this.append(str, pre);
    this.condFlag = true;

    return this;
  }

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
  elif(cond: unknown, str: string, pre?: string): this {
    if (this.condFlag) return this;
    return this.if(cond, str, pre);
  }

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
  else(str: string, pre?: string): this {
    if (this.condFlag) return this;
    return this.append(str, pre);
  }

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
  get(delim = " "): string {
    return this.parts.join(delim);
  }

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
  [Symbol.toPrimitive]() {
    return this.get();
  }

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
  toString() {
    return this.get();
  }
}
