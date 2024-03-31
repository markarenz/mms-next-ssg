import { Metadata } from 'next';
import { getAllSlugsByType } from '@/common/lib/common-utils/common-utils';
import { getProjectDetail } from '@/cms-projects/lib/project-utils';
import { CONTENT_TYPES } from '@/common/lib/constants';
import { getProjectMetadata } from '@/cms-projects/lib/project-utils';
import { BreadCrumbItem } from '@/common/interfaces/app';
import ProjectDetail from '@/cms-projects/components/ProjectDetail/ProjectDetail';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params?.slug;
  return getProjectMetadata(getProjectDetail(slug, true));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug;
  const project = getProjectDetail(slug, true);
  const breadcrumbItems: BreadCrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: project.title, path: `/projects/${slug}/` },
  ];
  return <ProjectDetail project={project} breadcrumbItems={breadcrumbItems} />;
}

export async function generateStaticParams() {
  return getAllSlugsByType(CONTENT_TYPES.PROJECTS).map((slug) => ({
    slug,
  }));
}
