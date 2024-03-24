import { Metadata } from 'next';
import { getPageDetail } from '@/cms-pages/lib/page-utils';
import CmsPageContent from '@/cms-pages/components/CmsPageContent/CmsPageContent';
import { getPosts } from '@/cms-posts/lib/post-utils';
import { getPageMetadata } from '@/cms-pages/lib/page-utils';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(getPageDetail('home'));
}

export default function Home() {
  const page = getPageDetail('home');
  const posts = getPosts(0);
  // TODO: const projects = getProjects(0)

  return <CmsPageContent page={page} data={{ posts }} />;
}
