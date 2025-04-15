import { SuspendCallback, SuspendListener } from "./types";

export class Suspend {
  private static last = Date.now();
  private static interval?: NodeJS.Timeout;
  private static timeout = 3000;
  private static frequency = 1000;
  private static listeners: SuspendListener[] = [];

  /**
   * Checks elapsed time since the last detected activity.
   */
  private static check() {
    const current = Date.now();
    const elapsed = current - Suspend.last;

    if (elapsed > Suspend.timeout) Suspend.call(elapsed);

    Suspend.last = current;
  }

  /**
   * Calls registered listener callbacks with the elapsed inactivity time.
   *
   * @param elapsed - Elapsed inactivity time in milliseconds.
   */
  private static call(elapsed: number) {
    for (const { callback, once } of this.listeners) {
      callback(elapsed);
      if (once) Suspend.removeListener(callback);
    }
  }

  /**
   * Initiates the interval checking mechanism.
   */
  private static start() {
    if (Suspend.interval) return;
    Suspend.interval = setInterval(Suspend.check, Suspend.frequency);
    window.addEventListener("beforeunload", Suspend.kill);
  }

  /**
   * Stops the interval checking mechanism.
   */
  private static stop() {
    clearInterval(Suspend.interval);
    delete Suspend.interval;
    window.removeEventListener("beforeunload", Suspend.kill);
  }

  /**
   * Registers a callback to be executed upon detecting system inactivity.
   *
   * @param callback - The callback to execute on inactivity detection.
   * @param once - Whether the callback should execute only once (`true`) or continuously (`false`). Default is `false`.
   */
  static addListener(callback: SuspendCallback, once = false) {
    Suspend.listeners.push({ callback, once });
    if (!Suspend.interval) Suspend.start();
  }
  /**
   * Removes a previously registered inactivity callback.
   *
   * @param callback - The callback to remove.
   */
  static removeListener(callback: SuspendCallback) {
    Suspend.listeners = Suspend.listeners.filter(
      ({ callback: fn }) => fn != callback
    );
    if (!Suspend.listeners.length) Suspend.stop();
  }

  /**
   * Stops inactivity checking and removes all registered listeners immediately.
   */
  static kill(): void {
    Suspend.listeners = [];
    Suspend.stop();
  }
}
