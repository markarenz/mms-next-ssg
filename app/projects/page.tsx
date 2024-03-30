import { Metadata } from 'next';
import { getProjects } from '@/cms-projects/lib/project-utils';
import { getMaxContentPagesByType } from '@/common/lib/common-utils/common-utils';
import { CONTENT_TYPES, DEFAULT_IMAGES } from '@/common/lib/constants';
import ProjectListPageContent from '@/cms-projects/components/ProjectListPageContent/ProjectListPageContent';
import { getGenericMetadata } from '@/cms-pages/lib/page-utils';

export async function generateMetadata(): Promise<Metadata> {
  return getGenericMetadata(
    `Mark Makes Stuff - Projects`,
    'Projects by Mark Makes Stuff.',
    DEFAULT_IMAGES.POSTS,
  );
}
export default function ProjectsPage() {
  const projects = getProjects(0);
  const maxPages = getMaxContentPagesByType(CONTENT_TYPES.PROJECTS);
  return <ProjectListPageContent projects={projects} pageNum={0} maxPages={maxPages} />;
}
