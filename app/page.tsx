import { Metadata } from 'next';
import { getPageDetail } from '@/cms-pages/lib/page-utils';
import CmsPageContent from '@/cms-pages/components/CmsPageContent/CmsPageContent';
import { getPageMetadata } from '@/cms-pages/lib/page-utils';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(getPageDetail('home'));
}

export default function Home() {
  const page = getPageDetail('home');
  return <CmsPageContent page={page} />;
}
