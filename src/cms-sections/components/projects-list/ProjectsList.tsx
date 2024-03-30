import React from 'react';
import { CmsSection } from '@/cms-pages/interfaces/pages';
import { CmsProject } from '@/cms-projects/interfaces/projects';
import ContentListItem from '@/common/components/ContentListItem/ContentListItem';
import { mapSummaryFromProject } from '@/cms-projects/lib/project-utils';
import ButtonLink from '@/common/components/ButtonLink/ButtonLink';
import styles from './ProjectsList.module.scss';

type Props = {
  section: CmsSection;
  projects: CmsProject[];
};

const ProjectsList: React.FC<Props> = ({ section, projects }) => {
  if (!section || !projects) {
    return null;
  }
  const { numItems, headline, buttonLabel, buttonLink } = section;

  return (
    <section className={styles.root} data-testid="projects-list">
      <div className="container">
        <h2>{headline}</h2>
        <div className={`itemsWrap ${styles.projectsWrap}`}>
          {projects.slice(0, numItems).map((project: CmsProject) => (
            <ContentListItem
              key={project.slug}
              variant="dark"
              summary={mapSummaryFromProject(project)}
            />
          ))}
        </div>

        <div className={styles.actionRow}>
          <ButtonLink variant="dark" href={`${buttonLink}`} label={`${buttonLabel}`} />
        </div>
      </div>
    </section>
  );
};

export default ProjectsList;
