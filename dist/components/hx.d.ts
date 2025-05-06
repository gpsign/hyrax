import { HxType } from "./types";
declare const styleShortcuts: readonly ["backgroundColor", "width", "height", "margin", "padding", "color", "textAlign", "border", "borderRadius", "display", "position", "top", "left", "right", "bottom", "opacity"];
type ShortcutKey = (typeof styleShortcuts)[number];
export declare const hx: HxType<ShortcutKey>;
export {};
