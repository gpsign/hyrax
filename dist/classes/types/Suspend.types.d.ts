/**
 * Callback function type used for inactivity detection.
 *
 * @param elapsed - The elapsed time (in milliseconds) since last activity detected.
 */
export type SuspendCallback = (elapsed: number) => void;
/**
 * Internal representation of listeners registered to handle inactivity events.
 *
 * @property once - Whether the listener should execute only once.
 * @property callback - The function to execute upon inactivity detection.
 */
export type SuspendListener = {
    once: boolean;
    callback: SuspendCallback;
};
