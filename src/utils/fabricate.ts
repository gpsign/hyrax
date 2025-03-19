import { Fabricate } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fabricate: Fabricate = ((...args: any[]): any => {
  if (typeof args[0] === "object") {
    const context = args[0];
    const callback = args[1];
    const params = args[2] || [];

    return callback.call(context, ...params);
  }

  const callback = args[0];
  const params = args[1] || [];

  return callback(...params);
}) as Fabricate;
