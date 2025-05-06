"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clamp = void 0;
const clamp = (value, lower, upper) => {
    if (upper === undefined) {
        upper = lower;
        lower = -Infinity;
    }
    [lower, upper] = [lower, upper].map(Number).sort();
    value = Number(value);
    if (value < lower)
        return lower;
    if (value > upper)
        return upper;
    return value;
};
exports.clamp = clamp;
