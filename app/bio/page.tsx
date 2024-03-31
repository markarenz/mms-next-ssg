import { getPageDetail } from '@/cms-pages/lib/page-utils';
import CmsPageContent from '@/cms-pages/components/CmsPageContent/CmsPageContent';
import { getPageMetadata } from '@/cms-pages/lib/page-utils';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(getPageDetail('bio'));
}

export default function BioPage() {
  const page = getPageDetail('bio');
  return <CmsPageContent page={page} />;
}
