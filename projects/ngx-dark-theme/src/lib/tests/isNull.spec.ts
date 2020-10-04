import { isNil } from '../isNil';

describe('isNull', () => {
  it('should return true for null value', () => {
    expect(isNil(null)).toBe(true);
  });

  it('should return true for non-null value', () => {
    expect(isNil('non-null')).toBe(false);
  });
});
