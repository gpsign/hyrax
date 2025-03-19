export type Fabricate = {
  <T>(callback: () => T): T;
  <T, P extends unknown[]>(callback: (...params: P) => T, params: P): T;
  <T, C extends object>(context: C, callback: (this: C) => T): T;
  <T, C extends object, P extends unknown[]>(
    context: C,
    callback: (this: C, ...params: P) => T,
    params: P
  ): T;
};
