import { useCallback, useEffect, useRef, useState } from "react";
import {
  UseIntervalConfig,
  UseIntervalReturn,
  UseStatelessInterval,
} from "./types";

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
export function useInterval(
  handler: () => void,
  delay: number,
  config?: UseIntervalConfig & { stateless?: false }
): UseIntervalReturn;

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
export function useInterval(
  handler: () => void,
  delay: number,
  config: UseIntervalConfig & { stateless: true }
): UseStatelessInterval;

export function useInterval(
  handler: () => void,
  delay: number,
  {
    initial = false,
    immediate = false,
    stateless = false,
  }: UseIntervalConfig = {}
): UseIntervalReturn {
  const callback = useRef(handler);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const [isRunningState, setIsRunningState] = useState(initial);
  const isRunningRef = useRef(isRunningState);

  const isRunning = stateless ? isRunningRef.current : isRunningState;

  const setIsRunning = useCallback(
    (value: boolean) => {
      if (stateless) isRunningRef.current = value;
      else setIsRunningState(value);
    },
    [stateless]
  );

  useEffect(() => {
    callback.current = handler;
  }, [handler]);

  const start = useCallback(() => {
    if (timerId.current !== null) return;
    if (immediate) callback.current();

    timerId.current = setInterval(() => {
      callback.current();
    }, delay);

    setIsRunning(true);
  }, [delay, immediate, setIsRunning]);

  const stop = useCallback(() => {
    if (timerId.current !== null) {
      clearInterval(timerId.current);
      timerId.current = null;
      setIsRunning(false);
    }
  }, [setIsRunning]);

  useEffect(() => {
    if (initial) start();

    return () => {
      stop();
    };
  }, [initial, start, stop]);

  useEffect(() => {
    if (!isRunning) return;
    stop();
    start();
  }, [delay]);

  return { start, stop, isRunning: stateless ? isRunningRef : isRunningState };
}
