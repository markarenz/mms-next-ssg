import { getPostDetail, getPosts } from './post-utils';

describe('getPostDetail', () => {
  it('returns post detail by slug', () => {
    const result = getPostDetail('post1');
    expect(result?.title).toBeTruthy();
  });

  it('returns dummy content if post does not exist by that slug', () => {
    const result = getPostDetail('no-post');
    expect(result?.title).toBeFalsy();
  });
});

describe('getPosts', () => {
  it('returns a list of post by page', () => {
    const result = getPosts(0);
    expect(result.length).toBeGreaterThan(0);
  });

  it('returns an empty array if page number is invalid', () => {
    const result1 = getPosts(-1);
    expect(result1.length).toBe(0);
    const result2 = getPosts(9999);
    expect(result2.length).toBe(0);
  });
});
