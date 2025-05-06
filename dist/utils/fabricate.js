"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabricate = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.fabricate = ((...args) => {
    if (typeof args[0] === "object") {
        const context = args[0];
        const callback = args[1];
        const params = args[2] || [];
        return callback.call(context, ...params);
    }
    const callback = args[0];
    const params = args[1] || [];
    return callback(...params);
});
