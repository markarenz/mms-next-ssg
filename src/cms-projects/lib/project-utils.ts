import { Metadata } from 'next';
import { CmsProject } from '@/cms-projects/interfaces/projects';
import { ContentSummary } from '@/common/interfaces/content';
import { getGenericMetadata } from '@/cms-pages/lib/page-utils';
import {
  getAllSlugsByType,
  getContentDetail,
  getMaxContentPagesByType,
} from '@/common/lib/common-utils/common-utils';
import { CONTENT_TYPES, itemsPerPage } from '@/common/lib/constants';

export const getProjectDetail = (slug: string, isDetail: boolean): CmsProject => {
  const contentDetail = getContentDetail(CONTENT_TYPES.PROJECTS, slug);
  const data = contentDetail?.data;
  const content = contentDetail?.content;
  return {
    slug,
    title: data?.title || '',
    image: data?.image || '',
    datePublished: data?.datePublished || '',
    metaDescription: data?.metaDescription || '',
    content: !isDetail ? '' : content || '',
    link: data?.link || null,
    images: data?.images || null,
  };
};

export const getProjects = (pageNum: number): CmsProject[] => {
  const slugs = getAllSlugsByType(CONTENT_TYPES.PROJECTS);
  const maxPages = getMaxContentPagesByType(CONTENT_TYPES.PROJECTS);
  if (pageNum < 0 || pageNum > maxPages) {
    return [];
  }
  const allPosts = slugs
    .map((slug) => getProjectDetail(slug, false))
    .filter((item) => !!item?.datePublished)
    .sort((a, b) => (a.datePublished > b.datePublished ? -1 : 1));
  const start = pageNum * itemsPerPage;
  return allPosts.slice(start, start + itemsPerPage);
};

export const getProjectMetadata = (project: CmsProject): Metadata => {
  const { title, metaDescription, image } = project;
  return getGenericMetadata(title, metaDescription, image);
};

export const mapSummaryFromProject = (project: CmsProject): ContentSummary => ({
  type: 'project',
  slug: project.slug,
  title: project.title,
  image: project.image,
  href: `/projects/${project.slug}`,
});
