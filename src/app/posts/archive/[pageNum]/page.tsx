import Link from 'next/link';
import { getContentItemsByType, getMaxContentPagesByType } from '@/lib/common-utils';
import PostListItem from '@/components/posts/PostListItem';
import Pagination from '@/components/common/pagination/Pagination';
import { CONTENT_TYPES } from '@/lib/constants';

export default function PostsArchivePage({ params }: { params: { pageNum: string } }) {
  const pageNum = parseFloat(`${params?.pageNum}`);
  const posts = getContentItemsByType(CONTENT_TYPES.POSTS, pageNum);
  const maxPages = getMaxContentPagesByType(CONTENT_TYPES.POSTS);
  // TODO: redirect to base posts URL if pageNum = 1
  return (
    <main data-testid="page-posts-archive">
      Posts Page
      <Link href="/posts">Posts Archive</Link>
      <div>
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>
      <div>
        <Pagination pageNum={pageNum} maxPages={maxPages} contentType={CONTENT_TYPES.POSTS} />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const maxPages = getMaxContentPagesByType(CONTENT_TYPES.POSTS);

  return Array(...Array(maxPages + 1)).map((_, i) => ({ pageNum: `${i}` }));
}
