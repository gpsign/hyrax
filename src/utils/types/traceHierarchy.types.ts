/**
 * A generic linkage object type where each key of K points to another Node (or null/undefined).
 *
 * @template K - The set of property keys representing linkage fields.
 * @template N - The type of the linked node.
 */
export type LinkLikeObject<K extends PropertyKey, N> = {
  [P in K]: N | null | undefined;
};
