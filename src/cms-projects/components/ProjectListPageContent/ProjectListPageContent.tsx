import React from 'react';
import { CmsProject } from '@/cms-projects/interfaces/projects';
import { BreadCrumbItem } from '@/common/interfaces/app';
import PageHeader from '@/cms-sections/components/page-header/PageHeader';
import ButtonLink from '@/common/components/ButtonLink/ButtonLink';
import ContentListItem from '@/common/components/ContentListItem/ContentListItem';
import { mapSummaryFromProject } from '@/cms-projects/lib/project-utils';
import Footer from '@/common/components/Footer/Footer';
import { CONTENT_TYPES, DEFAULT_IMAGES } from '@/common/lib/constants';
import Pagination from '@/common/components/Pagination/Pagination';
import styles from './ProjectListPageContent.module.scss';
import BreadCrumbs from '@/common/components/Breadcrumbs/Breadcrumbs';

type Props = {
  projects: CmsProject[];
  pageNum: number;
  maxPages: number;
  breadcrumbItems: BreadCrumbItem[];
};

const ProjectListPageContent: React.FC<Props> = ({
  projects,
  pageNum,
  maxPages,
  breadcrumbItems,
}) => {
  if (!projects || projects.length === 0 || !maxPages) {
    return null;
  }

  return (
    <div data-testid="projects-list-page-content">
      <PageHeader
        section={{
          slug: '',
          type: 'page-header',
          image1: DEFAULT_IMAGES.PROJECTS,
          headline: 'Projects',
          variant: 'dark',
          searchType: 'projects',
        }}
      />
      <main data-testid="page-projects" className={styles.root}>
        <div className="container">
          <div className={styles.breadcrumbWrap}>
            <BreadCrumbs breadcrumbItems={breadcrumbItems} variant="light" />
          </div>
          <div className="itemsWrap">
            {projects.map((project) => (
              <ContentListItem key={project.slug} summary={mapSummaryFromProject(project)} />
            ))}
          </div>
        </div>
        <div className={styles.actionRow}>
          {pageNum > 0 ? (
            <Pagination
              pageNum={pageNum}
              maxPages={maxPages}
              contentType={CONTENT_TYPES.PROJECTS}
            />
          ) : (
            <ButtonLink href="/projects/archive/1" label="See More Projects" />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectListPageContent;
