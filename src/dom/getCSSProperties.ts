import { toCamelCase } from "../string";

export function getCSSProperties(className: string): React.CSSProperties {
  if (typeof className != "string") return {};
  const body = document.body;
  const dummy = document.createElement("div");

  dummy.classList.add(...className.split("."));

  body.appendChild(dummy);
  const computed = window.getComputedStyle(dummy);
  const properties: React.CSSProperties = {};

  for (const property of Object.values(computed)) {
    properties[toCamelCase(property) as keyof React.CSSProperties] =
      computed.getPropertyValue(property) as never;
  }

  body.removeChild(dummy);

  return properties;
}
