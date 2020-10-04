/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
export function isNil(value: any): value is null | undefined {
  return value === null || value === undefined;
}
