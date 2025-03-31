import { RefObject } from "react";

export type UseInterval = {
  /**
   * Starts the interval.
   */
  start: () => void;
  /**
   * Stops the interval.
   */
  stop: () => void;
};

export type UseStateInterval = UseInterval & {
  /**
   * Indicates whether the interval is currently running.
   */
  isRunning: boolean;
};

export type UseStatelessInterval = UseInterval & {
  /**
   * Ref that indicates whether the interval is currently running.
   */
  isRunning: RefObject<boolean>;
};

export type UseIntervalReturn = UseStateInterval | UseStatelessInterval;

export interface UseIntervalConfig {
  /**
   * If true, the interval is started as soon as the hook is mounted.
   * @default false
   */
  initial?: boolean;
  /**
   * If true, the handler function is invoked immediately when the interval starts.
   * @default false
   */
  immediate?: boolean;
  /**
   * If true, the hook will operate in stateless mode. In stateless mode,
   * the hook will return the `isRunning` as a React Ref, instead of a state.
   * @default false
   */
  stateless?: boolean;
}
