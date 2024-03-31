import { getPostDetail, mapSummaryFromPost } from '@/cms-posts/lib/post-utils';
import {
  getAllSlugsByType,
  getArrFromRange,
  getContentDirectoryByType,
  getContentDetail,
  getMaxContentPagesByType,
  cleanIndexText,
  getContentIndex,
} from './common-utils';
import { CONTENT_TYPES } from '@/common/lib/constants';

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
    const result = getContentDetail(CONTENT_TYPES.POSTS, 'games-react');
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
    expect(result).toBe(0);
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

describe('cleanIndexText', () => {
  it('returns an cleaned text', () => {
    const result = cleanIndexText('This is test content - with ! *Markdown* _and_ punctuation.?');
    expect(result).toEqual('this is test content with markdown and punctuation');
  });
});

describe('getContentIndex', () => {
  it('returns an index of content', () => {
    const result = getContentIndex(CONTENT_TYPES.POSTS, getPostDetail, mapSummaryFromPost);
    expect(result).toBeTruthy();
  });
});
