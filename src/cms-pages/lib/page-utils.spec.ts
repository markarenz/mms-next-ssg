import { CmsPage } from '@/cms-pages/interfaces/pages';
import { getPageDetail, getPageMetadata, getGenericMetadata } from './page-utils';

describe('getPageDetail', () => {
  it('returns page detail and CMS section blocks', () => {
    const result = getPageDetail('test');
    expect(result.cmsSectionContent?.length).toBeGreaterThan(0);
  });

  it('returns dummy content if no page exists by that slug', () => {
    const result = getPageDetail('not-a-page');
    expect(result.cmsSectionContent?.length).toBe(0);
  });
});

describe('getPageMetadata', () => {
  const mockPage: CmsPage = {
    slug: 'test',
    title: 'Test Title',
    metaDescription: 'This is my meta',
    image: 'image.jpg',
    datePublished: '2024-01-01',
    header: 'header-default',
    sections: ['test'],
  };
  it('returns metas for page object', () => {
    const result = getPageMetadata(mockPage);
    expect(result.description).toEqual(mockPage.metaDescription);
    expect(result.openGraph.title).toEqual(mockPage.title);
    expect(result.openGraph.images.length).toBeGreaterThan(0);
  });
});

describe('getGenericMetadata', () => {
  it('returns metas for generic page', () => {
    const result = getGenericMetadata('Test Title', 'This is my meta');
    expect(result.title).toEqual('Test Title');
    expect(result.description).toEqual('This is my meta');
    expect(result.openGraph.images).toBeTruthy();
  });
  it('returns metas for generic page with image', () => {
    const result = getGenericMetadata('Test Title', 'This is my meta', '/posts/2.jpeg');
    expect(result.openGraph.images[0].includes('2.jpeg')).toBe(true);
  });
});
