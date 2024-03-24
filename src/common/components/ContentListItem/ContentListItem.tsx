import React from 'react';
import Link from 'next/link';
import { ContentSummary } from '@/common/interfaces/content';
import CmsImage from '../CmsImage/CmsImage';
import styles from './ContentListItem.module.scss';

type Props = {
  summary: ContentSummary;
};

const ContentListItem: React.FC<Props> = ({ summary }) => {
  const { title, image, href } = summary;

  return (
    <Link href={href} className={styles.root} data-testid="content-list-item">
      <CmsImage
        alt={`Background for posts`}
        isBgImage
        src={image}
        height={300}
        className={styles.bgImg}
      />
      <div className={`${styles.overlay} ${styles.overlayLight}`} />
      <div className={styles.overlayShadow} />
      <div className={styles.inner}>
        <h3>{title}</h3>
      </div>
    </Link>
  );
};

export default ContentListItem;
