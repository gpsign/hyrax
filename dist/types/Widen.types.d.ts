export type Widen<T> = T extends null ? null : T extends string ? string : T extends number ? number : T extends boolean ? boolean : T extends object ? object : never;
