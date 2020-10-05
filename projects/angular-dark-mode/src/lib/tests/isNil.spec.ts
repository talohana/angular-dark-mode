import { isNil } from '../isNil';

describe('isNil', () => {
  it('should return true for null value', () => {
    expect(isNil(null)).toBe(true);
  });

  it('should return true for undefined value', () => {
    expect(isNil(undefined)).toBe(true);
  });

  it('should return false for non null/undefined value', () => {
    expect(isNil('non-null')).toBe(false);
  });
});
