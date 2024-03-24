import { CmsPost } from '../interfaces/posts';
import { ContentSummary } from '@/common/interfaces/content';

export const mapSummaryFromPost = (post: CmsPost): ContentSummary => ({
  type: 'post',
  slug: post.slug,
  title: post.title,
  image: post.image,
  href: `/posts/${post.slug}`,
});
