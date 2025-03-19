/**
 * Interface que define a função de atualização retornada pelo hook `useUpdate`.
 *
 * A função atua como um disparador para re-renderizar o componente onde o hook é utilizado,
 * incrementando um contador interno. A função possui duas propriedades adicionais:
 *
 * - **id**: Um identificador único gerado pelo React, que pode ser útil para rastreamento ou debugging.
 * - **counter**: Valor atual do contador que indica quantas vezes o componente foi atualizado.
 */
export interface UpdateHook {
  (): void;
  /**
   * Identificador único da instância do hook.
   */
  id: string;
  /**
   * Contador de atualizações, incrementado a cada chamada da função.
   */
  counter: number;
}

/**
 * Interface que define a função de atualização retornada pelo hook `useUpdate`.
 *
 * A função atua como um disparador para re-renderizar o componente onde o hook é utilizado,
 * incrementando um contador interno. Além disso, a função possui duas propriedades adicionais:
 *
 * - **id**: Um identificador único gerado pelo React, que pode ser útil para rastreamento ou debugging.
 * - **counter**: Valor atual do contador que indica quantas vezes o componente foi atualizado.
 *
 * **Importante:**
 * Diferentemente do `useRef`, que armazena um valor mutável sem causar re-renderização quando alterado,
 * o hook `useUpdate` foi projetado para forçar a re-renderização do componente sempre que a função for chamada.
 */
export interface UpdateHook {
  (): void;
  /**
   * Identificador único da instância do hook.
   */
  id: string;
  /**
   * Contador de atualizações, incrementado a cada chamada da função.
   */
  counter: number;
}

/**
 * Hook que retorna uma função para disparar a re-renderização do componente.
 *
 * Este hook é ideal para casos em que você deseja atualizar a interface do usuário sem depender de
 * alterações diretas em um estado que afete a renderização.
 *
 * ## Exemplo
 *
 *
 * ```tsx
 *
 * function DisplayOnClick() {
 *   const update = useUpdate();
 *
 *   // Cria uma referência para o input. O valor digitado não causará re-renderização ao ser alterado.
 *   const inputRef = useRef<HTMLInputElement>(null);
 *
 *   return (
 *     <div>
 *       <input type="text" ref={inputRef} placeholder="Digite algo..." />
 *       <button onClick={update}>Mostrar valor</button>
 *       <p>Valor do input: {inputRef.current ? inputRef.current.value : ''}</p>
 *       <p>Número de atualizações: {update.counter}</p>
 *       <small>ID do hook: {update.id}</small>
 *     </div>
 *   );
 * }
 *
 * ```
 * @returns Uma função de atualização que, além de disparar a re-renderização, possui as propriedades
 * `id` e `counter` para facilitar o rastreamento das atualizações.
 */

export default function useUpdate(): UpdateHook;
