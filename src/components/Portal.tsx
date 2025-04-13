import React from "react";
import { createPortal } from "react-dom";
import { PortalProps } from "./types";
import { nvl } from "../utils";

export function Portal(props: PortalProps) {
  const { children, disabled, transient } = props;
  const defId = React.useId();
  const id = nvl(props.id, "PORTAL" + defId);
  const open = nvl(props.open, true);

  if (!open) return <></>;
  if (disabled) return children;
  if (transient) return createPortal(children, document.body, id);

  return createPortal(
    <div style={{ position: "fixed" }} id={id}>
      {children}
    </div>,
    document.body,
    id
  );
}
