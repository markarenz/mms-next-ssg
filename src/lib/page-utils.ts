import { CmsPage, CmsSection } from '@/interfaces/pages';
import { CONTENT_TYPES, CONTENT_DEFAULTS } from './constants';
import { getContentDetail } from './common-utils';
import { getImageCdnUrl } from './image-utils';

const getPageSectionDetail = (slug: string): CmsSection => {
  const contentDetail = getContentDetail(CONTENT_TYPES.PAGES, slug, 'sections');
  const data = contentDetail?.data;
  const content = contentDetail?.content;

  return {
    slug,
    ...data,
    content,
  };
};

export const getPageDetail = (slug: string): CmsPage => {
  const contentDetail = getContentDetail(CONTENT_TYPES.PAGES, slug);
  const data = contentDetail?.data;
  const cmsSectionContent: CmsSection[] = [];
  const cmsSectionHeader: CmsSection = getPageSectionDetail(data?.header || '');
  const cmsSectionFooter: CmsSection = getPageSectionDetail(data?.footer || '');
  data?.sections.forEach((sectionSlug: string) => {
    cmsSectionContent.push(getPageSectionDetail(sectionSlug));
  });

  return {
    slug,
    title: data?.title || CONTENT_DEFAULTS.TITLE,
    image: data?.image || CONTENT_DEFAULTS.IMAGE,
    header: data?.header,
    footer: data?.footer,
    datePublished: data?.datePublished || CONTENT_DEFAULTS.DATE_PUBLISHED,
    metaDescription: data?.metaDescription || CONTENT_DEFAULTS.DESCRIPTION,
    sections: data?.sections || [],
    cmsSectionHeader,
    cmsSectionFooter,
    cmsSectionContent,
  };
};

export const getPageMetadata = (page: CmsPage) => {
  const { title, metaDescription, image } = page;

  return {
    title,
    description: metaDescription,
    openGraph: {
      locale: 'en_US',
      type: 'website',
      title,
      site_name: 'Mark Makes Stuff',
      description: metaDescription,
      images: [getImageCdnUrl(image, 800)],
    },
  };
};
