import { useId, useMemo, useState } from "react";
import { UpdateHook } from "./types";

export default function useUpdate(): UpdateHook {
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
