import { CmsPage } from '@/cms-pages/interfaces/pages';
import { getPageDetail, getPageMetadata } from './page-utils';

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
    footer: 'footer-default',
    sections: ['test'],
  };
  it('returns metas for page object', () => {
    const result = getPageMetadata(mockPage);
    expect(result.description).toEqual(mockPage.metaDescription);
    expect(result.openGraph.title).toEqual(mockPage.title);
    expect(result.openGraph.images.length).toBeGreaterThan(0);
  });
});
