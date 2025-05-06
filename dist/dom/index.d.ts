export * from "./types";
export * from "./getCSSVar";
export * from "./getPropertySize";
export * from "./getCSSProperties";
export declare const HyraxDOM: {
    getCSSProperties(className: string): React.CSSProperties;
    getPropertySize(property: string): number;
    getCSSVar: import("./types").GetCSSVar;
};
