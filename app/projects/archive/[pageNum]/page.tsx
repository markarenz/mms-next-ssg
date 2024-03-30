import { Metadata } from 'next';
import { getMaxContentPagesByType } from '@/common/lib/common-utils/common-utils';
import { getProjects } from '@/cms-projects/lib/project-utils';
import ProjectListPageContent from '@/cms-projects/components/ProjectListPageContent/ProjectListPageContent';
import { CONTENT_TYPES, DEFAULT_IMAGES } from '@/common/lib/constants';
import { getGenericMetadata } from '@/cms-pages/lib/page-utils';

export async function generateMetadata({
  params,
}: {
  params: { pageNum: string };
}): Promise<Metadata> {
  const pageNum = params?.pageNum;
  return getGenericMetadata(
    `Projects Page ${pageNum}`,
    'Projects by Mark Makes Stuff, page Page ${pageNum}.',
    DEFAULT_IMAGES.PROJECTS,
  );
}

export default function ProjectsArchivePage({ params }: { params: { pageNum: string } }) {
  const pageNum = parseFloat(`${params?.pageNum}`);
  const projects = getProjects(pageNum);
  const maxPages = getMaxContentPagesByType(CONTENT_TYPES.PROJECTS);

  return <ProjectListPageContent projects={projects} pageNum={pageNum} maxPages={maxPages} />;
}

export async function generateStaticParams() {
  const maxPages = getMaxContentPagesByType(CONTENT_TYPES.PROJECTS);
  return Array(...Array(maxPages + 1)).map((_, i) => ({ pageNum: `${i}` }));
}
