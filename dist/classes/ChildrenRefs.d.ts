import React, { RefObject } from "react";
import { ChildrenRefsMap } from "./types";
export declare class ChildrenRefs {
    private refs;
    private children;
    constructor(children: React.ReactNode);
    private getKey;
    get<R extends HTMLElement | null = HTMLElement>(child: React.ReactNode): R | undefined;
    set<R extends HTMLElement | null = HTMLElement>(child: React.ReactNode, ref: RefObject<R>): ChildrenRefsMap;
    getChildrenWithRefs(): (string | number | bigint | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>)[] | null | undefined;
    [Symbol.iterator](): IterableIterator<React.RefObject<HTMLElement | null>>;
    values(): IterableIterator<React.RefObject<HTMLElement | null>>;
    entries(): IterableIterator<[string, React.RefObject<HTMLElement | null>]>;
    keys(): IterableIterator<string>;
}
