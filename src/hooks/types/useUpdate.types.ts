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
