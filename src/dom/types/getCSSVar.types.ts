export type GetCSSVar = {
  <T>(name: string, def: T): string | T;
  (name: string): string | null;
  <T>(name: string, def?: T): string | T | null;
};
