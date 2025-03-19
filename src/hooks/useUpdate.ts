import { useId, useMemo, useState } from "react";
import { UpdateHook } from "./types";

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
export function useUpdate(): UpdateHook {
  const [counter, setCounter] = useState(0);
  const id = useId();

  const update: UpdateHook = useMemo(() => {
    const func = () => setCounter(counter + 1);
    func.id = id;
    func.counter = counter;
    return func;
  }, [counter, setCounter, id]);

  return update;
}
