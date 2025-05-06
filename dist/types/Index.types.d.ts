import { Count } from "./Count.types";
export type Index<T extends readonly unknown[] | number> = T extends number ? Count<T> : Exclude<keyof T, keyof unknown[]>;
