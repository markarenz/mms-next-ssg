import { getAllSlugsByType } from '@/common/lib/common-utils/common-utils';
import { getPageDetail } from '@/cms-pages/lib/page-utils';
import { CONTENT_TYPES } from '@/common/lib/constants';
import CmsPageContent from '@/cms-pages/components/CmsPageContent/CmsPageContent';
import { getPageMetadata } from '@/cms-pages/lib/page-utils';
import { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return getPageMetadata(getPageDetail(params.slug));
}

export default function CmsPage({ params }: Props) {
  const page = getPageDetail(params?.slug);
  return <CmsPageContent page={page} />;
}

export async function generateStaticParams() {
  return getAllSlugsByType(CONTENT_TYPES.PAGES).map((slug) => ({
    slug,
  }));
}
