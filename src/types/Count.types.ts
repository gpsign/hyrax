export type Count<
  N extends number,
  A extends unknown[] = []
> = A["length"] extends N
  ? `${A["length"]}`
  : `${A["length"]}` | Count<N, [...A, unknown]>;
