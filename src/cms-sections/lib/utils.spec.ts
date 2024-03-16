import { getValidValueOrDefault } from './utils';

describe('getValidValueOrDefault', () => {
  it('should return the value if it is in the valid values', () => {
    expect(getValidValueOrDefault('left', ['left', 'right', 'center'], 'left')).toBe('left');
  });

  it('should return the default value if the value is not in the valid values', () => {
    expect(getValidValueOrDefault('invalid', ['left', 'right', 'center'], 'left')).toBe('left');
  });

  it('should return the default value if the value is not a string', () => {
    expect(getValidValueOrDefault(undefined, ['left', 'right', 'center'], 'left')).toBe('left');
  });
});
