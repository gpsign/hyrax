/**
 * Retorna o primeiro valor que não seja nulo ou indefinido dentre os argumentos fornecidos.
 *
 * @param {...(T | null | undefined)[]} values - Uma lista de valores de qualquer tipo, que podem ser nulos ou indefinidos.
 * @returns {T | null} - O primeiro valor definido encontrado. Se todos os valores forem nulos ou indefinidos, retorna `null`.
 *
 * ### Exemplo
 * ```ts
 * nvl(null, undefined, 0, "exemplo"); // Saída: 0
 * ```
 */
export function nvl<T>(...values: Array<T | undefined | null>): T | null {
  const result = values.find((value) => value != null);
  return result === undefined ? null : result;
}
