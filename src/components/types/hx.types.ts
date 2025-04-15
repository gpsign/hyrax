import React, { JSX } from "react";

export type HxExtraProps<K extends keyof React.CSSProperties = never> = {
  rendered?: boolean;
  transient?: boolean;
} & {
  [Key in K]?: React.CSSProperties[Key];
};

export type HxProps<
  T extends keyof JSX.IntrinsicElements,
  K extends keyof React.CSSProperties
> = JSX.IntrinsicElements[T] & HxExtraProps<K>;

export type HxType<T extends keyof React.CSSProperties = never> = {
  <P extends { style?: React.CSSProperties; children?: React.ReactNode }>(
    Component: React.ComponentType<P>
  ): React.FC<P & HxExtraProps<T>>;
} & {
  [K in keyof JSX.IntrinsicElements]: React.FC<HxProps<K, T>>;
};
