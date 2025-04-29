import React, { createRef, useEffect, useMemo, useRef } from "react";
import { BlurListenerProps } from "./types";
import { nvl, traceHierarchy } from "../utils";
import { Any } from "../types";

export function BlurListener({
  children,
  ignoreFocusRequirement,
  onBlur,
}: BlurListenerProps) {
  function getChildKey(child: React.ReactNode, index: number) {
    if (!React.isValidElement(child)) return String(index);
    return nvl(child.key, (child.props as Any)?.key, String(index)) as string;
  }

  const childRefs = useMemo(() => {
    const map = new Map<string, React.RefObject<HTMLElement | null>>();
    React.Children.forEach(children, (c, i) => {
      const key = getChildKey(c, i);
      map.set(key, createRef<HTMLElement>());
    })!;
    return map;
  }, [children]);

  const active = useRef(false);

  const childrenWithRefs = React.Children.map(children, (child, i) => {
    if (!React.isValidElement(child)) return child;
    const key = getChildKey(child, i);

    const forward = nvl(
      "ref" in child ? child.ref : null,
      (child.props as Any)?.ref
    ) as React.RefObject<HTMLElement | null> | null;

    if (forward) {
      childRefs.set(key, forward);
    }

    const ref = childRefs.get(key);

    return React.cloneElement(child, {
      ...(child.props ?? {}),
      ref,
    } as Any);
  });

  useEffect(() => {
    function compare(t: HTMLElement) {
      return Array.from(childRefs.values()).some((c) => c.current === t);
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
