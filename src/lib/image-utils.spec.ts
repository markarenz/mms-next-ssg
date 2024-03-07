import { getImageCdnUrl } from './image-utils';

describe('getImageCdnUrl', () => {
  it('returns URL for CDN image', () => {
    const result = getImageCdnUrl('test.jpg', 400, 200);
    expect(result.includes('w-')).toBe(true);
    expect(result.includes('h-')).toBe(true);
    expect(result.includes('webp')).toBe(true);
  });
});
