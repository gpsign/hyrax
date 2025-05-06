export type AnyString<T extends string = ""> = T | ({} & string);
