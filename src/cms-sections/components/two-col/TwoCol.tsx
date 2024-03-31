import React from 'react';
import { CmsSection } from '@/cms-pages/interfaces/pages';
import MarkdownContent from '@/common/components/MarkdownContent/MarkdownContent';
import { getValidValueOrDefault } from '@/cms-sections/lib/utils';
import styles from './TwoCol.module.scss';
import CmsImage from '@/common/components/CmsImage/CmsImage';

type Props = {
  section: CmsSection;
};

const TwoCol: React.FC<Props> = ({ section }) => {
  if (!section.content || !section.image1 || !section.content) {
    return null;
  }
  // Align left = text in left, image in right
  // Align right = text in right, image in left
  const alignClass = `align-${getValidValueOrDefault(section.align, ['left', 'right'], 'left')}`;
  const variantClass = `variant-${getValidValueOrDefault(
    section.variant,
    ['default', 'dark', 'primary'],
    'default',
  )}`;

  const classes = `${styles.root} ${styles[variantClass]} ${styles[alignClass]}`;

  return (
    <section className={classes} data-testid="cms-two-col">
      <div className="container">
        <div className={styles.columnWrap}>
          <div className={styles.columnText}>
            <MarkdownContent content={section.content} />
          </div>
          <div className={styles.columnImage}>
            <CmsImage src={section.image1} alt={section.headline} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default TwoCol;
