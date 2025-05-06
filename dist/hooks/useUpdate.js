"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUpdate = useUpdate;
const react_1 = require("react");
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
function useUpdate() {
    const [counter, setCounter] = (0, react_1.useState)(0);
    const id = (0, react_1.useId)();
    const update = (0, react_1.useMemo)(() => {
        const func = () => setCounter(counter + 1);
        func.id = id;
        func.counter = counter;
        return func;
    }, [counter, setCounter, id]);
    return update;
}
