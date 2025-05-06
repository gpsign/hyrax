export * from "./nvl";
export * from "./fabricate";
export * from "./length";
export * from "./isNumeric";
export * from "./alias";
export * from "./types";
export * from "./noop";
export * from "./traceHierarchy";
export declare const utils: {
    traceHierarchy<K extends PropertyKey, N extends import("./types").LinkLikeObject<K, N>>(obj: N, superior: K): N[];
    noop(..._values: unknown[]): void;
    alias<T extends object, D extends Partial<Record<keyof T, readonly string[]>>>(obj: T, dictionary: Readonly<D>): T & import("./types").AliasProperties<T, D>;
    isNumeric(value: unknown): value is import("./types").Numeric;
    length(value: unknown): number;
    nvl<T extends unknown[]>(...values: T): T[number] | null;
    fabricate: import("./types").Fabricate;
};
