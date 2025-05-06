import { AliasProperties } from "./types";
/**
 * Creates a proxy for the given object, enabling access to properties via alias keys.
 *
 * The provided dictionary maps keys of the original object to an array of alias strings.
 * Each alias key in the returned proxy forwards get/set operations to the corresponding original property.
 *
 * Make sure to declare the alias arrays with 'as const' to enable proper type inference.
 *
 * ### Example
 * ```ts
 * const person = { name: "Alice", age: 30 };
 * const aliasDictionary = {
 *   name: ["aliasName"] as const,
 *   age: ["years", "old"] as const,
 * };
 *
 * const aliasPerson = alias(person, aliasDictionary);
 * console.log(aliasPerson.aliasName); // Outputs the same as aliasPerson.name
 * ```
 * @template T - The type of the original object.
 * @template D - A dictionary mapping keys of T to an array of alias strings.
 * @param {T} obj - The original object.
 * @param {D} dictionary - A partial record mapping keys of T to an array of alias strings.
 * @returns {T & AliasProperties<T, D>} A proxy combining the original properties with their alias keys.
 */
export declare function alias<T extends object, D extends Partial<Record<keyof T, readonly string[]>>>(obj: T, dictionary: Readonly<D>): T & AliasProperties<T, D>;
