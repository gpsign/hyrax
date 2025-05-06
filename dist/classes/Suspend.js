"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suspend = void 0;
class Suspend {
    /**
     * Checks elapsed time since the last detected activity.
     */
    static check() {
        const current = Date.now();
        const elapsed = current - Suspend.last;
        if (elapsed > Suspend.timeout)
            Suspend.call(elapsed);
        Suspend.last = current;
    }
    /**
     * Calls registered listener callbacks with the elapsed inactivity time.
     *
     * @param elapsed - Elapsed inactivity time in milliseconds.
     */
    static call(elapsed) {
        for (const { callback, once } of this.listeners) {
            callback(elapsed);
            if (once)
                Suspend.removeListener(callback);
        }
    }
    /**
     * Initiates the interval checking mechanism.
     */
    static start() {
        if (Suspend.interval)
            return;
        Suspend.interval = setInterval(Suspend.check, Suspend.frequency);
        window.addEventListener("beforeunload", Suspend.kill);
    }
    /**
     * Stops the interval checking mechanism.
     */
    static stop() {
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
    static addListener(callback, once = false) {
        Suspend.listeners.push({ callback, once });
        if (!Suspend.interval)
            Suspend.start();
    }
    /**
     * Removes a previously registered inactivity callback.
     *
     * @param callback - The callback to remove.
     */
    static removeListener(callback) {
        Suspend.listeners = Suspend.listeners.filter(({ callback: fn }) => fn != callback);
        if (!Suspend.listeners.length)
            Suspend.stop();
    }
    /**
     * Stops inactivity checking and removes all registered listeners immediately.
     */
    static kill() {
        Suspend.listeners = [];
        Suspend.stop();
    }
}
exports.Suspend = Suspend;
Suspend.last = Date.now();
Suspend.timeout = 3000;
Suspend.frequency = 1000;
Suspend.listeners = [];
