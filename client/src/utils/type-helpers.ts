/**
 * Make properties in T required and non-nullable whose keys are in the union K. By default, applies to all properties of T.
 */
type RequiredNonNullable<T, K extends keyof T = keyof T> = {
  [P in K]-?: NonNullable<T[P]>;
} & Omit<T, K>;

/**
 * Make properties in GraphQL object type T required and non-nullable, expect for __typename.
 */
type RequiredGraphQLType<T extends object & { __typename?: any }> =
  RequiredNonNullable<T, keyof Omit<T, '__typename'>>;

type OmitNever<T extends Record<string, unknown>> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};

/**
 * Construct a type with the properties whose keys are in both A and B
 */
type Intersection<A, B> = OmitNever<Pick<A & B, keyof A & keyof B>>;

export type { RequiredNonNullable, RequiredGraphQLType, Intersection };
