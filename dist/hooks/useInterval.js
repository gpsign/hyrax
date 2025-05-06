"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInterval = useInterval;
const react_1 = require("react");
function useInterval(handler, delay, { initial = false, immediate = false, stateless = false, } = {}) {
    const callback = (0, react_1.useRef)(handler);
    const timerId = (0, react_1.useRef)(null);
    const [isRunningState, setIsRunningState] = (0, react_1.useState)(initial);
    const isRunningRef = (0, react_1.useRef)(isRunningState);
    const isRunning = stateless ? isRunningRef.current : isRunningState;
    const setIsRunning = (0, react_1.useCallback)((value) => {
        if (stateless)
            isRunningRef.current = value;
        else
            setIsRunningState(value);
    }, [stateless]);
    (0, react_1.useEffect)(() => {
        callback.current = handler;
    }, [handler]);
    const start = (0, react_1.useCallback)(() => {
        if (timerId.current !== null)
            return;
        if (immediate)
            callback.current();
        timerId.current = setInterval(() => {
            callback.current();
        }, delay);
        setIsRunning(true);
    }, [delay, immediate, setIsRunning]);
    const stop = (0, react_1.useCallback)(() => {
        if (timerId.current !== null) {
            clearInterval(timerId.current);
            timerId.current = null;
            setIsRunning(false);
        }
    }, [setIsRunning]);
    (0, react_1.useEffect)(() => {
        if (initial)
            start();
        return () => {
            stop();
        };
    }, [initial, start, stop]);
    (0, react_1.useEffect)(() => {
        if (!isRunning)
            return;
        stop();
        start();
    }, [delay]);
    return { start, stop, isRunning: stateless ? isRunningRef : isRunningState };
}
