"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alias = alias;
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
function alias(obj, dictionary) {
    const inverse = {};
    for (const key of Object.keys(dictionary)) {
        if (!(key in obj))
            continue;
        const aliases = dictionary[key];
        if (aliases == undefined)
            continue;
        for (const keyAlias of aliases) {
            if (keyAlias === key)
                continue;
            inverse[keyAlias] = key;
        }
    }
    return new Proxy(obj, {
        get(target, p, receiver) {
            if (typeof p !== "string")
                return Reflect.get(target, p, receiver);
            if (inverse[p])
                return Reflect.get(target, inverse[p], receiver);
            return Reflect.get(target, p, receiver);
        },
        set(target, p, newValue, receiver) {
            if (typeof p !== "string")
                return Reflect.set(target, p, newValue, receiver);
            if (inverse[p])
                return Reflect.set(target, inverse[p], newValue, receiver);
            return Reflect.set(target, p, newValue, receiver);
        },
    });
}
