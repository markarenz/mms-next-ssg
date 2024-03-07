import Link from 'next/link';
import { getPosts } from '@/lib/post-utils';
import PostListItem from '@/components/posts/PostListItem';

export default function PostsPage() {
  const posts = getPosts(0);

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
