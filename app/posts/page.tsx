import { Metadata } from 'next';
import { getPosts } from '@/cms-posts/lib/post-utils';
import { getMaxContentPagesByType } from '@/common/lib/common-utils/common-utils';
import { CONTENT_TYPES, DEFAULT_IMAGES } from '@/common/lib/constants';
import PostListPageContent from '@/cms-posts/components/PostListPageContent/PostListPageContent';
import { getGenericMetadata } from '@/cms-pages/lib/page-utils';
import { BreadCrumbItem } from '@/common/interfaces/app';

export async function generateMetadata(): Promise<Metadata> {
  return getGenericMetadata(
    `Mark Makes Stuff - Posts`,
    'Blog posts by Mark Makes Stuff.',
    DEFAULT_IMAGES.POSTS,
  );
}
export default function PostsPage() {
  const posts = getPosts(0);
  const maxPages = getMaxContentPagesByType(CONTENT_TYPES.POSTS);
  const breadcrumbItems: BreadCrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Posts', path: '/posts' },
  ];
  return (
    <PostListPageContent
      posts={posts}
      pageNum={0}
      maxPages={maxPages}
      breadcrumbItems={breadcrumbItems}
    />
  );
}
