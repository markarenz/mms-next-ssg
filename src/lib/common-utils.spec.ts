import {
  getAllSlugsByType,
  getContentItemDetailByType,
  getContentItemsByType,
  getMaxContentPagesByType,
  getArrFromRange,
} from './common-utils';
import { CONTENT_TYPES } from './constants';

describe('getAllSlugsByType', () => {
  it('returns a list of slugs for a given content type', () => {
    const result = getAllSlugsByType(CONTENT_TYPES.POSTS);
    expect(result.length).toBeGreaterThan(0);
  });
  it('returns a list of slugs for a non-existent content type', () => {
    const result = getAllSlugsByType('temp');
    expect(result.length).toBe(0);
  });
});

describe('getContentItemDetailByType', () => {
  it('returns content detail object based on slug and type if it exists', () => {
    const result = getContentItemDetailByType(CONTENT_TYPES.POSTS, 'post1');
    expect(result.title).toBeTruthy();
  });

  it('returns dummy detail object based on slug and type if does not exist', () => {
    const result = getContentItemDetailByType(CONTENT_TYPES.POSTS, 'test-slug');
    expect(result.title).toBeFalsy();
  });
});

describe('getContentItemsByType', () => {
  it('returns list of content objects by type and page result number', () => {
    const result = getContentItemsByType(CONTENT_TYPES.POSTS, 1);
    expect(result.length).toBeGreaterThan(0);
  });
  it('returns an empty array if the values are invalid', () => {
    const result = getContentItemsByType('test', 1);
    expect(result.length).toBe(0);
  });
});

describe('getMaxContentPagesByType', () => {
  it('returns max pages by content type', () => {
    const result = getMaxContentPagesByType(CONTENT_TYPES.POSTS);
    expect(result).toBeGreaterThan(0);
  });

  it('returns 0 if type is invalid', () => {
    const result = getMaxContentPagesByType('test');
    expect(result).toBe(-1);
  });
});

describe('getArrFromRange', () => {
  it('returns an array of numbers based on a range', () => {
    const result = getArrFromRange(10, 25, 1);
    expect(result.length).toBe(16);
  });
});
