import { Metadata } from 'next';
import { getMaxContentPagesByType } from '@/common/lib/common-utils/common-utils';
import { getPosts } from '@/cms-posts/lib/post-utils';
import PostListPageContent from '@/cms-posts/components/PostListPageContent/PostListPageContent';
import { CONTENT_TYPES, DEFAULT_IMAGES } from '@/common/lib/constants';
import { getGenericMetadata } from '@/cms-pages/lib/page-utils';

export async function generateMetadata({
  params,
}: {
  params: { pageNum: string };
}): Promise<Metadata> {
  const pageNum = params?.pageNum;
  return getGenericMetadata(
    `Posts Page ${pageNum}`,
    'Blog posts by Mark Makes Stuff, page Page ${pageNum}.',
    DEFAULT_IMAGES.POSTS,
  );
}

export default function PostsArchivePage({ params }: { params: { pageNum: string } }) {
  const pageNum = parseFloat(`${params?.pageNum}`);
  const posts = getPosts(pageNum);
  const maxPages = getMaxContentPagesByType(CONTENT_TYPES.POSTS);

  return <PostListPageContent posts={posts} pageNum={pageNum} maxPages={maxPages} />;
}

export async function generateStaticParams() {
  const maxPages = getMaxContentPagesByType(CONTENT_TYPES.POSTS);
  return Array(...Array(maxPages + 1)).map((_, i) => ({ pageNum: `${i}` }));
}
