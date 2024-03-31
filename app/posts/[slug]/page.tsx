import { Metadata } from 'next';
import { getAllSlugsByType } from '@/common/lib/common-utils/common-utils';
import { getPostDetail } from '@/cms-posts/lib/post-utils';
import { CONTENT_TYPES } from '@/common/lib/constants';
import { getPostMetadata } from '@/cms-posts/lib/post-utils';
import PostDetail from '@/cms-posts/components/PostDetail/PostDetail';
import { BreadCrumbItem } from '@/common/interfaces/app';

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
  const breadcrumbItems: BreadCrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Posts', path: '/posts' },
    { name: post.title, path: `/posts/${slug}/` },
  ];

  return <PostDetail post={post} breadcrumbItems={breadcrumbItems} />;
}

export async function generateStaticParams() {
  return getAllSlugsByType(CONTENT_TYPES.POSTS).map((slug) => ({
    slug,
  }));
}
