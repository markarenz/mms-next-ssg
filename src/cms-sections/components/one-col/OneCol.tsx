/**
 * Renders a one-column section with Markdown content.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {CmsSection} props.section - The CMS section data.
 * @returns {JSX.Element} The rendered component.
 *
 * align: left, right, center
 * variants: default, dark, orange
 */

import React from 'react';
import { CmsSection } from '@/cms-pages/interfaces/pages';
import MarkdownContent from '@/common/components/MarkdownContent/MarkdownContent';
import { getValidValueOrDefault } from '@/cms-sections/lib/utils';
import styles from './OneCol.module.scss';

type Props = {
  section: CmsSection;
};

const OneCol: React.FC<Props> = ({ section }) => {
  if (!section.content) {
    return null;
  }

  const alignClass = `align-${getValidValueOrDefault(
    section.align,
    ['left', 'right', 'center'],
    'left',
  )}`;
  const variantClass = `variant-${getValidValueOrDefault(
    section.variant,
    ['default', 'dark', 'primary'],
    'default',
  )}`;

  const classes = `${styles.root} ${styles[variantClass]} ${styles[alignClass]}`;

  return (
    <section className={classes} data-testid="cms-one-col">
      <div className="container">
        <MarkdownContent content={section.content} />
      </div>
    </section>
  );
};
export default OneCol;
