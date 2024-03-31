import { Metadata } from 'next';
import { CONTENT_TYPES } from '@/common/lib/constants';
import { getPostDetail, mapSummaryFromPost } from '@/cms-posts/lib/post-utils';
import { getContentIndex } from '@/common/lib/common-utils/common-utils';
import { DEFAULT_IMAGES } from '@/common/lib/constants';
import SearchPageContent from '@/common/components/SearchPageContent/SearchPageContent';
import { getGenericMetadata } from '@/cms-pages/lib/page-utils';
import { BreadCrumbItem } from '@/common/interfaces/app';

export async function generateMetadata(): Promise<Metadata> {
  return getGenericMetadata(
    `Mark Makes Stuff - Search Posts`,
    'Search Blog posts by Mark Makes Stuff.',
    DEFAULT_IMAGES.POSTS,
  );
}
export default function PostsSearchPage() {
  const contentIndex = getContentIndex(CONTENT_TYPES.POSTS, getPostDetail, mapSummaryFromPost);

  const breadcrumbItems: BreadCrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Posts', path: '/posts' },
    { name: 'Search', path: '/posts/search' },
  ];
  return (
    <SearchPageContent
      contentIndex={contentIndex}
      breadcrumbItems={breadcrumbItems}
      contentType="posts"
    />
  );
}
