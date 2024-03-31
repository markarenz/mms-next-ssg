'use client';
import React, { useState } from 'react';
import { CmsProject } from '@/cms-projects/interfaces/projects';
import MarkdownContent from '@/common/components/MarkdownContent/MarkdownContent';
import ButtonLink from '@/common/components/ButtonLink/ButtonLink';
import Footer from '@/common/components/Footer/Footer';
import styles from './ProjectDetail.module.scss';
import PageHeader from '@/cms-sections/components/page-header/PageHeader';
import IconClose from '@/common/components/Icons/IconClose';
import CmsImage from '@/common/components/CmsImage/CmsImage';
import IconImageNav from '@/common/components/Icons/IconImageNav';
import { BreadCrumbItem } from '@/common/interfaces/app';
import BreadCrumbs from '@/common/components/Breadcrumbs/Breadcrumbs';

type Props = {
  project: CmsProject;
  breadcrumbItems: BreadCrumbItem[];
};
const ProjectDetail: React.FC<Props> = ({ project, breadcrumbItems }) => {
  const [selectedImage, setSelectedImage] = useState(-1);
  if (!project || !project.slug || !project.content) {
    return null;
  }

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleImageNavClick = (direction: number) => () => {
    if (project.images) {
      let newIndex = selectedImage + direction;
      if (newIndex < 0) {
        newIndex = project.images.length - 1;
      } else if (newIndex >= project.images.length) {
        newIndex = 0;
      }
      setSelectedImage(newIndex);
    }
  };

  return (
    <>
      <PageHeader
        section={{
          slug: '',
          type: 'page-header',
          image1: project.image,
          headline: project.title,
          variant: 'light',
        }}
      />
      <main data-testid="page-project-detail" className={styles.root}>
        <div className="container">
          <div className={styles.breadcrumbWrap}>
            <BreadCrumbs breadcrumbItems={breadcrumbItems} variant="dark" />
          </div>
          <div className={styles.gridContainer}>
            <div className={styles.mainContent}>
              <div className={styles.contentWrap}>
                <MarkdownContent content={project.content} />
              </div>
              <div className={styles.actionRow}>
                {project.link && <ButtonLink href={project.link} label="Project Link" />}
                <ButtonLink href="/projects" label="Back to Projects" />
              </div>
            </div>
            <div className={styles.imagesList}>
              {project.images?.map((image, index) => (
                <button
                  key={image}
                  data-testid={`image-link-${index}`}
                  type="button"
                  aria-label="open-image"
                  className={styles.imageLink}
                  onClick={() => handleImageClick(index)}
                >
                  <div className={styles.imageLinkImgWrap}>
                    <CmsImage key={index} src={image} alt={`Preview image ${index}`} width={600} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {project?.images && (
        <div
          data-testid="lightbox"
          className={`${styles.lightbox} ${selectedImage >= 0 ? styles.active : ''}`}
        >
          <button
            data-testid="lightbox-btn-close"
            aria-label="close"
            onClick={() => setSelectedImage(-1)}
            className={`${styles.bouncyButton} ${styles.btnClose}`}
            tabIndex={selectedImage >= 0 ? 0 : -1}
          >
            <IconClose />
          </button>

          <button
            data-testid="lightbox-btn-prev"
            aria-label="Load Previous Image"
            onClick={handleImageNavClick(-1)}
            className={`${styles.bouncyButton} ${styles.btnNavPrev}`}
            tabIndex={selectedImage >= 0 ? 0 : -1}
          >
            <IconImageNav direction={-1} />
          </button>

          <button
            data-testid="lightbox-btn-next"
            aria-label="Load Next Image"
            onClick={handleImageNavClick(1)}
            className={`${styles.bouncyButton} ${styles.btnNavNext}`}
            tabIndex={selectedImage >= 0 ? 0 : -1}
          >
            <IconImageNav direction={1} />
          </button>
          <CmsImage
            src={project?.images[selectedImage] || ''}
            alt={`${project.title} Image ${selectedImage + 1}`}
            className={styles.lightboxImage}
          />
        </div>
      )}
      <Footer />
    </>
  );
};
export default ProjectDetail;
