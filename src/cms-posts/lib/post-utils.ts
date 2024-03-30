import { Metadata } from 'next';
import { CmsPost } from '@/cms-posts/interfaces/posts';
import { ContentSummary } from '@/common/interfaces/content';
import { getGenericMetadata } from '@/cms-pages/lib/page-utils';
import {
  getAllSlugsByType,
  getContentDetail,
  getMaxContentPagesByType,
} from '@/common/lib/common-utils/common-utils';
import { CONTENT_TYPES, itemsPerPage } from '@/common/lib/constants';

export const getPostDetail = (slug: string, isDetail: boolean): CmsPost => {
  const contentDetail = getContentDetail(CONTENT_TYPES.POSTS, slug);
  const data = contentDetail?.data;
  const content = contentDetail?.content;
  return {
    slug,
    title: data?.title || '',
    image: data?.image || '',
    datePublished: data?.datePublished || '',
    metaDescription: data?.metaDescription || '',
    content: !isDetail ? '' : content || '',
  };
};

export const getPosts = (pageNum: number): CmsPost[] => {
  const slugs = getAllSlugsByType(CONTENT_TYPES.POSTS);
  const maxPages = getMaxContentPagesByType(CONTENT_TYPES.POSTS);
  if (pageNum < 0 || pageNum > maxPages) {
    return [];
  }
  const allPosts = slugs
    .map((slug) => getPostDetail(slug, false))
    .filter((item) => !!item?.datePublished)
    .sort((a, b) => (a.datePublished > b.datePublished ? -1 : 1));
  const start = pageNum * itemsPerPage;
  return allPosts.slice(start, start + itemsPerPage);
};

export const getPostMetadata = (post: CmsPost): Metadata => {
  const { title, metaDescription, image } = post;
  return getGenericMetadata(title, metaDescription, image);
};

export const mapSummaryFromPost = (post: CmsPost): ContentSummary => ({
  type: 'post',
  slug: post.slug,
  title: post.title,
  image: post.image,
  href: `/posts/${post.slug}`,
});
