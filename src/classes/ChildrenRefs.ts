import React, { createRef, isValidElement, RefObject } from "react";
import { fabricate } from "../utils";
import { ChildrenRefsMap } from "./types";

export class ChildrenRefs {
  private refs: ChildrenRefsMap;
  private children: React.ReactNode;

  constructor(children: React.ReactNode) {
    this.refs = new Map<string, React.RefObject<HTMLElement>>();
    this.children = children;

    React.Children.forEach(children, (child) => {
      const ref = fabricate(() => {
        if (!isValidElement(child)) return createRef<HTMLElement>();
        if ("ref" in child) return child.ref as React.RefObject<HTMLElement>;

        const props = child.props as { ref?: RefObject<HTMLElement> };
        if ("ref" in props) return props.ref!;

        return createRef<HTMLElement>();
      });

      this.set(child, ref);
    })!;
  }

  private getKey(child: React.ReactNode) {
    let index = -1;

    React.Children.forEach(this.children, (c, i) => {
      if (index != -1) return;
      if (c === child) index = i;
    });

    if (!React.isValidElement(child)) return String(index);
    return (child.key ?? String(index)) as string;
  }

  get<R extends HTMLElement | null = HTMLElement>(child: React.ReactNode) {
    const key = this.getKey(child);
    return this.refs.get(key) as R | undefined;
  }

  set<R extends HTMLElement | null = HTMLElement>(
    child: React.ReactNode,
    ref: RefObject<R>
  ) {
    const key = this.getKey(child);
    return this.refs.set(key, ref);
  }

  getChildrenWithRefs() {
    return React.Children.map(this.children, (child) => {
      if (!React.isValidElement(child)) return child;

      const ref = this.get(child);

      return React.cloneElement(child, {
        ...(child.props ?? {}),
        ref,
      } as object);
    });
  }

  *[Symbol.iterator](): IterableIterator<React.RefObject<HTMLElement | null>> {
    for (const ref of this.refs.values()) {
      yield ref;
    }
  }

  values(): IterableIterator<React.RefObject<HTMLElement | null>> {
    return this.refs.values();
  }

  entries(): IterableIterator<[string, React.RefObject<HTMLElement | null>]> {
    return this.refs.entries();
  }

  keys(): IterableIterator<string> {
    return this.refs.keys();
  }
}
