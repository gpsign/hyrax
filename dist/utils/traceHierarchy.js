"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traceHierarchy = traceHierarchy;
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
function traceHierarchy(obj, superior) {
    const go = (node) => node == null ? [] : [node, ...go(node[superior])];
    return go(obj);
}
