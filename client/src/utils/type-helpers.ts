/**
 * Make properties in T required and non-nullable whose keys are in the union K. By default, applies to all properties of T.
 */
type RequiredNonNullable<T, K extends keyof T = keyof T> = {
  [P in K]-?: NonNullable<T[P]>;
} & Omit<T, K>;

export type { RequiredNonNullable };
