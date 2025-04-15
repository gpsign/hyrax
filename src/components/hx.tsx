/* eslint-disable react/display-name */
import React, { JSX } from "react";
import { HxExtraProps, HxProps, HxType } from "./types";

const styleShortcuts: Readonly<(keyof React.CSSProperties)[]> = [
  "backgroundColor",
  "width",
  "height",
  "margin",
  "padding",
  "color",
  "textAlign",
  "border",
  "borderRadius",
  "display",
  "position",
  "top",
  "left",
  "right",
  "bottom",
  "opacity",
] as const;

type ShortcutKey = (typeof styleShortcuts)[number];

function removeStyleShortcuts<T extends object>(
  props: T
): Omit<T, ShortcutKey> {
  const result = { ...props } as T & Record<ShortcutKey, unknown>;
  for (const key of styleShortcuts) {
    if (key in result) {
      delete result[key];
    }
  }
  return result;
}

function mergeStyles<P extends object>(
  baseStyle: React.CSSProperties | undefined,
  props: P
): { mergedStyle: React.CSSProperties; restProps: Omit<P, ShortcutKey> } {
  const mergedStyle: React.CSSProperties = { ...baseStyle };

  const propRecord = props as Record<ShortcutKey, never>;
  for (const key of styleShortcuts) {
    const value = propRecord[key];
    if (value !== undefined) {
      mergedStyle[key] = value;
    }
  }
  const restProps = removeStyleShortcuts(props);
  return { mergedStyle, restProps };
}

function createHxComponent<
  P extends { style?: React.CSSProperties; children?: React.ReactNode }
>(
  render: (props: P & { style: React.CSSProperties }) => JSX.Element
): React.FC<P & HxExtraProps<ShortcutKey>> {
  return React.memo((props) => {
    // eslint-disable-next-line react/prop-types
    const { rendered, transient, children, style, ...rest } = props;

    if (rendered === false) return null;
    if (transient) return <>{children}</>;

    const { mergedStyle, restProps } = mergeStyles(style, rest);

    return render({
      ...(restProps as unknown as P),
      style: mergedStyle,
      children,
    });
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const intrinsicCache = new Map<keyof JSX.IntrinsicElements, React.FC<any>>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customCache = new WeakMap<React.ComponentType<any>, React.FC<any>>();

function createIntrinsic<T extends keyof JSX.IntrinsicElements>(
  tag: T
): React.FC<HxProps<T, ShortcutKey>> {
  if (intrinsicCache.has(tag)) {
    return intrinsicCache.get(tag)!;
  }
  const component = createHxComponent((props) =>
    React.createElement(tag, props, props.children)
  );
  intrinsicCache.set(tag, component);
  return component;
}

function wrapCustomComponent<
  P extends { style?: React.CSSProperties; children?: React.ReactNode }
>(Component: React.ComponentType<P>): React.FC<P & HxExtraProps> {
  if (customCache.has(Component)) {
    return customCache.get(Component)!;
  }
  const component = createHxComponent<P>((props) => <Component {...props} />);
  customCache.set(Component, component);
  return component;
}

export const hx = new Proxy(function () {} as object, {
  apply(_target, _thisArg, args) {
    return wrapCustomComponent(args[0]);
  },

  get(_target, prop: string) {
    return createIntrinsic(prop as keyof JSX.IntrinsicElements);
  },
}) as HxType<ShortcutKey>;
