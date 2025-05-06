import { UseIntervalConfig, UseIntervalReturn, UseStatelessInterval } from "./types";
/**
 * React hook for managing intervals with a internal state mode.
 *
 * ### Example
 * ```tsx
 * const { start, stop, isRunning } = useInterval(() => {
 *   console.log('Interval executed! Status: ', isRunning.current);
 * }, 1000, { stateless: true });
 * ```
 * @param handler - The callback function to execute on each interval.
 * @param delay - The delay in milliseconds between each invocation of the handler.
 * @param config - Configuration options:
 *   - `initial`: if true, the interval will start automatically when the hook mounts.
 *   - `immediate`: if true, the handler is called immediately when the interval starts.
 *   - `stateless`: should be false or undefined.
 *
 * @returns An object containing:
 *   - `start`: Function to start the interval.
 *   - `stop`: Function to stop the interval.
 *   - `isRunning`: Boolean indicating if the interval is currently active.
 */
export declare function useInterval(handler: () => void, delay: number, config?: UseIntervalConfig & {
    stateless?: false;
}): UseIntervalReturn;
/**
 * React hook for managing intervals without a internal state mode.
 *
 * In stateless mode, the hook does not trigger re-renders for the running state and return it as a Ref Object.
 *
 * ### Example
 * ```tsx
 * const { start, stop, isRunning } = useInterval(() => {
 *   console.log('Interval executed! Status: ', isRunning.current);
 * }, 1000, { stateless: true });
 * ```
 * @param handler - The callback function to execute on each interval.
 * @param delay - The delay in milliseconds between each invocation of the handler.
 * @param config - Configuration options:
 *   - `initial`: if true, the interval will start automatically when the hook mounts.
 *   - `immediate`: if true, the handler is called immediately when the interval starts.
 *   - `stateless`: must be true.
 *
 * @returns An object containing:
 *   - `start`: Function to start the interval.
 *   - `stop`: Function to stop the interval.
 *   - `isRunning`: Ref Object indicating if the interval is currently active.
 */
export declare function useInterval(handler: () => void, delay: number, config: UseIntervalConfig & {
    stateless: true;
}): UseStatelessInterval;
