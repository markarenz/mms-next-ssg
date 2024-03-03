import Link from 'next/link';
import { getContentItemsByType, getMaxContentPagesByType } from '@/lib/common-utils';
import PostListItem from '@/components/posts/PostListItem';
import { CONTENT_TYPES } from '@/lib/constants';

export default function PostsArchivePage({ params }: { params: { pageNum: string } }) {
  const pageNum = parseFloat(`${params?.pageNum}`);
  const posts = getContentItemsByType(CONTENT_TYPES.POSTS, pageNum);
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
        <Link href={pageNum === 1 ? '/posts' : `/posts/archive/${pageNum - 1}`}>PREV</Link>{' '}
        {pageNum < maxPages && <Link href={`/posts/archive/${pageNum + 1}`}>Next</Link>}
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const maxPages = getMaxContentPagesByType(CONTENT_TYPES.POSTS);

  return Array(...Array(maxPages + 1)).map((_, i) => ({ pageNum: `${i}` }));
}
