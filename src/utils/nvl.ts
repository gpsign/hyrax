/**
 * Retorna o primeiro valor que não seja nulo ou indefinido dentre os argumentos fornecidos.
 *
 * @param {...(T[K] | null | undefined)[]} values - Uma lista de valores (em formato de tupla) que podem ser nulos ou indefinidos.
 * @returns {T[number] | null} - O primeiro valor definido encontrado. Se todos os valores forem nulos ou indefinidos, retorna `null`.
 *
 * ### Exemplo
 * ```ts
 * nvl(null, undefined, 0, "exemplo"); // Saída: 0
 * ```
 */
export function nvl<T extends unknown[]>(
  ...values: { [K in keyof T]: T[K] | null | undefined }
): T[number] | null {
  const result = values.find((value) => value != null);
  return result === undefined ? null : result;
}
