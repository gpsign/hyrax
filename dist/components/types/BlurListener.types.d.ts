import { PropsWithChildren } from "react";
export type BlurHandler = (ev: MouseEvent) => void;
export interface BlurListenerProps extends PropsWithChildren {
    onBlur?: BlurHandler;
    /** If true, skips the “focus” requirement on first click away */
    ignoreFocusRequirement?: boolean;
}
