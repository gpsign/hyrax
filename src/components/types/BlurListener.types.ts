import { PropsWithChildren, RefObject } from "react";

export type BlurHandler = (ev: MouseEvent) => void;

export type ChildRefsMap = Map<string, RefObject<HTMLElement>>;

export interface BlurListenerProps extends PropsWithChildren {
  onBlur?: BlurHandler;
  /** If true, skips the “focus” requirement on first click away */
  ignoreFocusRequirement?: boolean;
}
