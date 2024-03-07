import {
  getAllSlugsByType,
  getArrFromRange,
  getContentDirectoryByType,
  getContentDetail,
  getMaxContentPagesByType,
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

describe('getContentDetail', () => {
  it('returns content detail object based on slug and type if it exists', () => {
    const result = getContentDetail(CONTENT_TYPES.POSTS, 'post1');
    expect(result?.data?.title).toBeTruthy();
  });

  it('returns dummy detail object based on slug and type if does not exist', () => {
    const result = getContentDetail(CONTENT_TYPES.POSTS, 'test-slug');
    expect(result?.data?.title).toBeFalsy();
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

describe('getContentDirectoryByType', () => {
  it('returns a content directory', () => {
    const result = getContentDirectoryByType(CONTENT_TYPES.POSTS);
    expect(result.split('/').slice(-1)[0]).toBe('posts');
  });
});
