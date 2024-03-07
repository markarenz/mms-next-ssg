import { Metadata } from 'next';
import Link from 'next/link';
import { getPageDetail } from '@/lib/page-utils';
import CmsPageContent from '@/components/common/cmsPage/CmsPageContent';
import { getPageMetadata } from '@/lib/page-utils';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(getPageDetail('home'));
}

export default function Home() {
  const page = getPageDetail('home');
  return <CmsPageContent page={page} />;
}
