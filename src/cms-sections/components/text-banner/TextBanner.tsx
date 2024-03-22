import React from 'react';
import { CmsSection } from '@/cms-pages/interfaces/pages';
import { getValidValueOrDefault } from '@/cms-sections/lib/utils';
import MarkdownContent from '@/common/components/MarkdownContent/MarkdownContent';
import styles from './TextBanner.module.scss';

type Props = {
  section: CmsSection;
};
const TextBanner: React.FC<Props> = ({ section }) => {
  if (!section || !section.headline || !section.subhead) return null;

  const variantClass = `variant-${getValidValueOrDefault(
    section.variant,
    ['tech', 'default'],
    'tech',
  )}`;
  const classes = `${styles.root} ${styles[variantClass]}`;

  return (
    <section className={classes} data-testid="cms-text-banner">
      <div className={styles.bg} />
      <div className={styles.inner}>
        <div className="container">
          <h2>
            <MarkdownContent inline content={section.headline} />
          </h2>
          <h3>
            <MarkdownContent inline content={section.subhead} />
          </h3>
        </div>
      </div>
    </section>
  );
};

export default TextBanner;
