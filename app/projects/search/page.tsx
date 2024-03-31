import { Metadata } from 'next';
import { CONTENT_TYPES } from '@/common/lib/constants';
import { getProjectDetail, mapSummaryFromProject } from '@/cms-projects/lib/project-utils';
import { getContentIndex } from '@/common/lib/common-utils/common-utils';
import { DEFAULT_IMAGES } from '@/common/lib/constants';
import SearchPageContent from '@/common/components/SearchPageContent/SearchPageContent';
import { getGenericMetadata } from '@/cms-pages/lib/page-utils';
import { BreadCrumbItem } from '@/common/interfaces/app';

export async function generateMetadata(): Promise<Metadata> {
  return getGenericMetadata(
    `Mark Makes Stuff - Search Projects`,
    'Search Projects by Mark Makes Stuff.',
    DEFAULT_IMAGES.PROJECTS,
  );
}
export default function ProjectsSearchPage() {
  const contentIndex = getContentIndex(
    CONTENT_TYPES.PROJECTS,
    getProjectDetail,
    mapSummaryFromProject,
  );
  const breadcrumbItems: BreadCrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Search', path: '/projects/search' },
  ];
  return (
    <SearchPageContent
      contentIndex={contentIndex}
      breadcrumbItems={breadcrumbItems}
      contentType="projects"
    />
  );
}
