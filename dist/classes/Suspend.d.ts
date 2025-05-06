import { SuspendCallback } from "./types";
export declare class Suspend {
    private static last;
    private static interval?;
    private static timeout;
    private static frequency;
    private static listeners;
    /**
     * Checks elapsed time since the last detected activity.
     */
    private static check;
    /**
     * Calls registered listener callbacks with the elapsed inactivity time.
     *
     * @param elapsed - Elapsed inactivity time in milliseconds.
     */
    private static call;
    /**
     * Initiates the interval checking mechanism.
     */
    private static start;
    /**
     * Stops the interval checking mechanism.
     */
    private static stop;
    /**
     * Registers a callback to be executed upon detecting system inactivity.
     *
     * @param callback - The callback to execute on inactivity detection.
     * @param once - Whether the callback should execute only once (`true`) or continuously (`false`). Default is `false`.
     */
    static addListener(callback: SuspendCallback, once?: boolean): void;
    /**
     * Removes a previously registered inactivity callback.
     *
     * @param callback - The callback to remove.
     */
    static removeListener(callback: SuspendCallback): void;
    /**
     * Stops inactivity checking and removes all registered listeners immediately.
     */
    static kill(): void;
}
