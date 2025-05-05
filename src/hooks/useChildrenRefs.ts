import React, { useMemo } from "react";
import { ChildrenRefs } from "../classes";

export function useChildrenRefs(children: React.ReactNode | undefined) {
  const childrenRefs = useMemo(() => new ChildrenRefs(children), [children]);

  return childrenRefs;
}
