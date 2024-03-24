import { Metadata } from 'next';
import { getAllSlugsByType } from '@/common/lib/common-utils/common-utils';
import { getPostDetail } from '@/cms-posts/lib/post-utils';
import { CONTENT_TYPES } from '@/common/lib/constants';
import { getPostMetadata } from '@/cms-posts/lib/post-utils';
import PostDetail from '@/cms-posts/components/PostDetail/PostDetail';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params?.slug;
  return getPostMetadata(getPostDetail(slug, true));
}

export default function PostDetailPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const post = getPostDetail(slug, true);
  return <PostDetail post={post} />;
}

export async function generateStaticParams() {
  return getAllSlugsByType(CONTENT_TYPES.POSTS).map((slug) => ({
    slug,
  }));
}
