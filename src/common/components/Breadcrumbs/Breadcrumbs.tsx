import React from 'react';
import Link from 'next/link';
import { BreadCrumbItem } from '@/common/interfaces/app';
import styles from './Breadcrumbs.module.scss';

type Props = {
  breadcrumbItems: BreadCrumbItem[];
  variant: string;
};

const BreadCrumbs: React.FC<Props> = ({ breadcrumbItems, variant }) => {
  const variantClass = variant === 'light' ? styles.light : styles.dark;
  return (
    <div className={`${styles.root} ${variantClass}`}>
      {breadcrumbItems.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className={styles.separator}> / </span>}

          {index === breadcrumbItems.length - 1 ? (
            <span className={styles.current}>{breadcrumb.name}</span>
          ) : (
            <Link href={breadcrumb.path}>{breadcrumb.name}</Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
export default BreadCrumbs;
