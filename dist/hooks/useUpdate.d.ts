import { UpdateHook } from "./types";
/**
 * Hook that returns a function to trigger the re-rendering of the component.
 *
 * This hook is ideal for cases where you want to update the user interface without depending on
 * direct changes to a state that affects the rendering.
 * ## Example
 *
 *
 * ```tsx
 *
 * function DisplayOnClick() {
 *   const update = useUpdate();
 *
 *   // Creates a reference for the input. The value typed will not cause re-rendering when changed.
 *   const inputRef = useRef<HTMLInputElement>(null);
 *
 *   return (
 *     <div>
 *       <input type="text" ref={inputRef} placeholder="Type here..." />
 *       <button onClick={update}>Show value</button>
 *       <p>Input Value: {inputRef.current ? inputRef.current.value : ''}</p>
 *       <p>Updates: {update.counter}</p>
 *       <small>Hook ID: {update.id}</small>
 *     </div>
 *   );
 * }
 *
 * ```
 * @returns An update function that, in addition to triggering re-rendering, has the `id` and `counter` properties.
 */
export declare function useUpdate(): UpdateHook;
