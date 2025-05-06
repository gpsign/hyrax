export * from "./types";
export * from "./clamp";
export * from "./map";
export * from "./percent";
export declare const HyraxNumber: {
    percent(value: number, hundred?: number, zero?: number): number;
    map(x: number, inMin: number, inMax: number, outMin: number, outMax: number): number;
    clamp: import("./types").Clamp;
};
