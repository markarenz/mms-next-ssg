import Link from 'next/link';
import { getAllSlugsByType } from '@/common/lib/common-utils/common-utils';
import { getPostDetail } from '@/cms-posts/lib/post-utils';
import { CONTENT_TYPES } from '@/common/lib/constants';
import MarkdownContent from '@/common/components/MarkdownContent/MarkdownContent';
// import styles from '@/styles/modules/home.module.scss';

export default function PostDetailPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const post = getPostDetail(slug);
  return (
    <main data-testid="page-post-detail">
      Posts Detail
      <Link href="/posts">Posts Archive</Link>
      <h1>{post.title}</h1>
      <MarkdownContent content={post.content} />
    </main>
  );
}

export async function generateStaticParams() {
  return getAllSlugsByType(CONTENT_TYPES.POSTS).map((slug) => ({
    slug,
  }));
}
