import { CmsPage, CmsSection } from '@/cms-pages/interfaces/pages';
import { CONTENT_TYPES, CONTENT_DEFAULTS, DEFAULT_METADATA } from '@/common/lib/constants';
import { getContentDetail } from '../../common/lib/common-utils/common-utils';
import { getImageCdnUrl } from '../../common/lib/image-utils/image-utils';

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
    datePublished: data?.datePublished || CONTENT_DEFAULTS.DATE_PUBLISHED,
    metaDescription: data?.metaDescription || CONTENT_DEFAULTS.DESCRIPTION,
    sections: data?.sections || [],
    cmsSectionHeader,
    cmsSectionFooter,
    cmsSectionContent,
  };
};

export const getGenericMetadata = (title?: string, description?: string, image?: string) => {
  const customMetadata: any = {};

  if (title) {
    customMetadata.title = title;
  }
  if (description) {
    customMetadata.description = description;
  }

  customMetadata.twitter = {
    title,
    description,
    image: image ? getImageCdnUrl(image, 1024) : null,
  };

  return {
    ...DEFAULT_METADATA,
    ...customMetadata,
    openGraph: {
      ...DEFAULT_METADATA.openGraph,
      images: image ? [getImageCdnUrl(image, 1024)] : DEFAULT_METADATA.openGraph?.images,
    },
  };
};

export const getPageMetadata = (page: CmsPage) => {
  const { title, metaDescription, image } = page;
  return getGenericMetadata(title, metaDescription, image);
};
