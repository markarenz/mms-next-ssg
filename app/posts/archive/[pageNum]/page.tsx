import Link from 'next/link';
import { getMaxContentPagesByType } from '@/common/lib/common-utils/common-utils';
import { getPosts } from '@/cms-posts/lib/post-utils';
import PostListItem from '@/cms-posts/components/PostListItem/PostListItem';
import Pagination from '@/common/components/Pagination/Pagination';
import { CONTENT_TYPES } from '@/common/lib/constants';

export default function PostsArchivePage({ params }: { params: { pageNum: string } }) {
  const pageNum = parseFloat(`${params?.pageNum}`);
  const posts = getPosts(pageNum);
  const maxPages = getMaxContentPagesByType(CONTENT_TYPES.POSTS);

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
