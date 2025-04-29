import { LinkLikeObject } from "./types";

/**
 * Traces a hierarchy by following a specified “superior” link from the starting node
 * up to the root (where the link is null or undefined).
 *
 * @template K - The property key used to point to the superior node.
 * @template N - The node type, which must have a property of key K pointing to Node.
 *
 * @param obj - The starting node in the hierarchy.
 * @param superior - The key of the property that references the parent (superior) node.
 * @returns An array of nodes, beginning with `obj` and continuing through each superior
 *          until a node with no superior is reached.
 *
 * @example
 * ```ts
 * interface Employee extends LinkObj<'manager', Employee> {
 *   name: string;
 * }
 *
 * const alice: Employee = { name: 'Alice', manager: null };
 * const bob: Employee = { name: 'Bob', manager: alice };
 * const carol: Employee = { name: 'Carol', manager: bob };
 *
 * // Traces Carol -> Bob -> Alice
 * const chain = traceHierarchy(carol, 'manager');
 * console.log(chain.map(e => e.name)); // ['Carol', 'Bob', 'Alice']
 * ```
 */
export function traceHierarchy<
  K extends PropertyKey,
  N extends LinkLikeObject<K, N>
>(obj: N, superior: K): N[] {
  const go = (node: N | null | undefined): N[] =>
    node == null ? [] : [node, ...go(node[superior])];
  return go(obj);
}
