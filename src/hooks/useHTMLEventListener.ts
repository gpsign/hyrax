import { useCallback, useEffect } from "react";
import { HyraxHTMLRef } from "../types";

/**
 * useHTMLEventListener
 *
 * A custom React hook for attaching an event listener to a given HTML element.
 * It abstracts away the process of adding and removing the event listener,
 * ensuring proper cleanup when the component unmounts or dependencies change.
 *
 *
 * ## Example
 * ```tsx
 * import { useRef } from 'react';
 *
 * const MyComponent = () => {
 *   const divRef = useRef<HTMLDivElement>(null);
 *
 *   useHTMLEventListener(divRef, 'click', (event) => {
 *     console.log('Div was clicked!', event);
 *   }, []);
 *
 *   return <div ref={divRef}>Click me</div>;
 * };
 * ```
 *
 * @param {HyraxHTMLRef<T>} ref - A reference to the HTML element. It can be a React ref object,
 *                                a direct HTML element, or null.
 * @param {K} type - The event type to listen for (e.g., "click", "mouseover").
 * @param {(event: HTMLElementEventMap[K]) => void} listener - The callback function invoked when the event occurs.
 * @param {React.DependencyList} dependency - A dependency list that controls when the listener callback is updated.
 *                                           The listener is memoized using these dependencies.
 * @param {boolean | AddEventListenerOptions} [options] - Optional event listener options, such as capture, once, or passive.
 *
 * @returns {void}
 */
export default function useHTMLEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLElement
>(
  ref: HyraxHTMLRef<T>,
  type: K,
  listener: (event: HTMLElementEventMap[K]) => void,
  dependency: React.DependencyList,
  options?: boolean | AddEventListenerOptions
): void {
  const callback = useCallback(listener, [listener, ...dependency]);

  const element =
    ref && typeof ref === "object" && "current" in ref ? ref.current : ref;

  useEffect(() => {
    if (!element) return;
    element.addEventListener(type, callback, options);
    return () => {
      element.removeEventListener(type, callback);
    };
  }, [element, type, callback, options]);
}
