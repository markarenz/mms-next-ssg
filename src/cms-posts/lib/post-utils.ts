import { CmsPost } from '@/cms-posts/interfaces/posts';
import {
  getAllSlugsByType,
  getContentDetail,
  getMaxContentPagesByType,
} from '../../common/lib/common-utils/common-utils';
import { getImageCdnUrl } from '@/common/lib/image-utils/image-utils';
import { CONTENT_TYPES, postsPerPage } from '../../common/lib/constants';

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
  const start = pageNum * postsPerPage;
  return allPosts.slice(start, start + postsPerPage);
};

export const getPostMetadata = (post: CmsPost) => {
  if (!post || !post.title || !post.metaDescription || !post.image) {
    return null;
  }

  const { title, metaDescription, image } = post;

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
