import { getPostDetail, getPosts, getPostMetadata } from './post-utils';

describe('getPostDetail', () => {
  it('returns post detail by slug', () => {
    const result = getPostDetail('games-react', true);
    expect(result?.title).toBeTruthy();
  });

  it('returns dummy content if post does not exist by that slug', () => {
    const result = getPostDetail('no-post', true);
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

describe('getPostMetadata', () => {
  it('returns metadata for a post', () => {
    const post = {
      slug: 'games-react',
      title: 'Games in React',
      image: 'games-react.jpg',
      datePublished: '2021-01-01',
      metaDescription: 'A list of games built with React',
      content: 'Games in React content',
    };
    const result = getPostMetadata(post);
    expect(result?.title || '').toBe(post.title);
    expect(result?.description || '').toBe(post.metaDescription);
    expect(result?.openGraph.images[0] || '').toBeTruthy();
  });

  it('returns metadata for empty post', () => {
    const post = {};
    // @ts-ignore
    const result = getPostMetadata(post);
    expect(result).toBe(null);
  });
});
