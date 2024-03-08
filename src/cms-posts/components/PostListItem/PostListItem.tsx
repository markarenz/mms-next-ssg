import React from 'react';
import Link from 'next/link';
import { CmsPost } from '@/cms-posts/interfaces/posts';

type Props = {
  post: CmsPost;
};
const PostListItem: React.FC<Props> = ({ post }) => {
  return (
    <div key={post.slug} data-testid="post-list-item">
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <Link href={`/posts/${post.slug}`}>Read More</Link>
    </div>
  );
};

export default PostListItem;
