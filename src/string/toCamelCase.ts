/**
 * Converts a given string to camel case by transforming each word.
 *
 * ### Example
 * ```ts
 * toCamelCase("hello world"); // returns "helloWorld"
 * toCamelCase("Convert THIS text"); // returns "convertThisText"
 * ```
 *
 * @param input - The string to be converted to camel case.
 * @returns The camel case representation of the input string.
 */
export function toCamelCase(input: string): string {
  if (!input || typeof input != "string") return input;

  const words = input.split(/[^\p{L}]+/u).filter(Boolean);

  const toCased = (word: string, index: number) => {
    const lowerCasedWord = word.toLowerCase();
    if (index === 0) return lowerCasedWord;
    return lowerCasedWord.charAt(0).toUpperCase() + lowerCasedWord.slice(1);
  };

  const camelCased = words.map(toCased);

  return camelCased.join("");
}
