export type AliasFor<T, K extends keyof T, V extends readonly string[]> = {
    [P in V[number]]: T[K];
};
export type UnionToIntersection<U> = (U extends object ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type AliasProperties<T, D extends Partial<Record<keyof T, readonly string[]>>> = UnionToIntersection<{
    [K in keyof D & keyof T]: D[K] extends readonly string[] ? AliasFor<T, K, D[K]> : {};
}[keyof D & keyof T]>;
