import { CmsPost } from '@/interfaces/posts';
import { getAllSlugsByType, getContentDetail, getMaxContentPagesByType } from './common-utils';
import { CONTENT_TYPES, postsPerPage } from './constants';

export const getPostDetail = (slug: string): CmsPost => {
  const contentDetail = getContentDetail(CONTENT_TYPES.POSTS, slug);
  const data = contentDetail?.data;
  const content = contentDetail?.content;
  return {
    slug,
    title: data?.title || '',
    image: data?.image || '',
    datePublished: data?.datePublished || '',
    metaDescription: data?.metaDescription || '',
    excerpt: data?.excerpt || '',
    content: content || '',
  };
};

export const getPosts = (pageNum: number): CmsPost[] => {
  const slugs = getAllSlugsByType(CONTENT_TYPES.POSTS);
  const maxPages = getMaxContentPagesByType(CONTENT_TYPES.POSTS);
  if (pageNum < 0 || pageNum > maxPages) {
    return [];
  }
  const allPosts = slugs
    .map((slug) => getPostDetail(slug))
    .filter((item) => !!item?.datePublished)
    .sort((a, b) => (a.datePublished > b.datePublished ? -1 : 1));
  const start = pageNum * postsPerPage;
  return allPosts.slice(start, start + postsPerPage);
};
