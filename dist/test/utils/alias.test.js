"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
describe("alias", () => {
    const model = { name: "Alice", age: 30 };
    let person = { ...model };
    const aliasDictionary = {
        name: ["aliasName"],
        age: ["years", "old"],
        // 'city' is intentionally missing to test non-aliased property behavior.
    };
    let aliasPerson;
    beforeEach(() => {
        person = { ...model };
        aliasPerson = (0, utils_1.alias)(person, aliasDictionary);
    });
    it("should forward get operations for alias keys", () => {
        expect(aliasPerson.aliasName).toBe(person.name);
        expect(aliasPerson.years).toBe(person.age);
        expect(aliasPerson.old).toBe(person.age);
    });
    it("should forward get operations for original keys", () => {
        expect(aliasPerson.name).toBe("Alice");
        expect(aliasPerson.age).toBe(30);
    });
    it("should forward set operations from alias keys to original properties", () => {
        aliasPerson.aliasName = "Bob";
        expect(person.name).toBe("Bob");
        expect(aliasPerson.name).toBe("Bob");
        aliasPerson.years = 40;
        expect(person.age).toBe(40);
        expect(aliasPerson.age).toBe(40);
        aliasPerson.old = 50;
        expect(person.age).toBe(50);
        expect(aliasPerson.age).toBe(50);
    });
    it("should forward set operations from original keys to alias keys", () => {
        aliasPerson.name = "Charlie";
        expect(aliasPerson.aliasName).toBe("Charlie");
        aliasPerson.age = 35;
        expect(aliasPerson.years).toBe(35);
        expect(aliasPerson.old).toBe(35);
    });
    it("should not affect non-aliased properties", () => {
        // city is not defined in aliasDictionary, so direct access works as normal.
        aliasPerson.city = "Wonderland";
        expect(aliasPerson.city).toBe("Wonderland");
    });
    it("should ignore dictionary entries for keys not present in the object", () => {
        // Create an alias dictionary with a key that does not exist in the object.
        const extendedDictionary = {
            ...aliasDictionary,
            nonExistent: ["ghost"],
        };
        const extendedAlias = (0, utils_1.alias)(person, extendedDictionary);
        // Accessing alias for non-existent property should be undefined.
        // Also, the original properties should work normally.
        expect(extendedAlias.ghost).toBeUndefined();
        expect(extendedAlias.name).toBe(person.name);
    });
    it("should not create an alias when alias key is identical to original key", () => {
        // If alias name equals the original property name, it should not override.
        const sameNameDictionary = {
            name: ["name"],
        };
        const sameNameAlias = (0, utils_1.alias)(person, sameNameDictionary);
        // Accessing by "name" should still be the original property.
        expect(sameNameAlias.name).toBe("Alice");
    });
});
