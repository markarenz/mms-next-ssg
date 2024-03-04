import Link from 'next/link';
import { getContentItemsByType } from '@/lib/common-utils';
import PostListItem from '@/components/posts/PostListItem';
import { CONTENT_TYPES } from '@/lib/constants';

export default function PostsPage() {
  const posts = getContentItemsByType(CONTENT_TYPES.POSTS, 0);

  return (
    <main data-testid="page-posts">
      Posts Page
      <Link href="/test">Home</Link>
      <div>
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>
      <div>
        <Link href="/posts/archive/1">See More</Link>
      </div>
    </main>
  );
}
