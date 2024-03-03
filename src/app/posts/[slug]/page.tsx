import Link from 'next/link';
import { getAllSlugsByType, getContentItemDetailByType } from '@/lib/common-utils';
import { CONTENT_TYPES } from '@/lib/constants';
import MarkdownContent from '@/components/common/MarkdownContent';
import styles from '@/styles/modules/home.module.scss';

export default function PostDetailPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const post = getContentItemDetailByType(CONTENT_TYPES.POSTS, slug);
  return (
    <main className={styles.root} data-testid="page-post-detail">
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
