import { AnyRecord } from "../../types";
import { alias } from "../../utils";

describe("alias", () => {
  interface Person {
    name: string;
    age: number;
    city?: string;
  }

  const model: Person = { name: "Alice", age: 30 };
  let person: Person = { ...model };

  const aliasDictionary = {
    name: ["aliasName"] as const,
    age: ["years", "old"] as const,
    // 'city' is intentionally missing to test non-aliased property behavior.
  };

  let aliasPerson: Person & { aliasName: string; years: number; old: number };

  beforeEach(() => {
    person = { ...model };
    aliasPerson = alias(person, aliasDictionary);
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
      nonExistent: ["ghost"] as const,
    };
    const extendedAlias = alias(person, extendedDictionary);
    // Accessing alias for non-existent property should be undefined.
    // Also, the original properties should work normally.
    expect((extendedAlias as AnyRecord).ghost).toBeUndefined();
    expect(extendedAlias.name).toBe(person.name);
  });

  it("should not create an alias when alias key is identical to original key", () => {
    // If alias name equals the original property name, it should not override.
    const sameNameDictionary = {
      name: ["name"] as const,
    };
    const sameNameAlias = alias(person, sameNameDictionary);
    // Accessing by "name" should still be the original property.
    expect(sameNameAlias.name).toBe("Alice");
  });
});
