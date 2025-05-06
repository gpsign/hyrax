import { PropsWithChildren } from "react";
export interface PortalProps extends PropsWithChildren {
    id?: string;
    disabled?: boolean;
    open?: boolean;
    transient?: boolean;
}
