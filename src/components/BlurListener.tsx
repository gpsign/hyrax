import { useEffect, useRef } from "react";
import { useChildrenRefs } from "../hooks/useChildrenRefs";

import { traceHierarchy } from "../utils";
import { BlurListenerProps } from "./types";

export function BlurListener({
  children,
  ignoreFocusRequirement,
  onBlur,
}: BlurListenerProps) {
  const childRefs = useChildrenRefs(children);

  const active = useRef(false);

  const childrenWithRefs = childRefs.getChildrenWithRefs();

  useEffect(() => {
    function compare(t: HTMLElement) {
      return Array.from(childRefs).some((c) => c.current === t);
    }

    function traceClick(e: MouseEvent) {
      const target = e.target;
      if (!(target instanceof HTMLElement) || !onBlur) return;
      const tree = traceHierarchy(target, "parentElement");

      const isWithin = tree.some(compare);

      if (ignoreFocusRequirement) active.current = true;

      if (!isWithin && active.current) {
        active.current = false;
        onBlur(e);
      } else active.current = isWithin;
    }

    document.addEventListener("click", traceClick);

    return () => {
      document.removeEventListener("click", traceClick);
    };
  }, [childRefs, onBlur]);

  return childrenWithRefs;
}
