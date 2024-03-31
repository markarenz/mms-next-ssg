import React from 'react';
import { CmsSection } from '@/cms-pages/interfaces/pages';
import BreadCrumbs from '@/common/components/Breadcrumbs/Breadcrumbs';
import styles from './BreadcrumbSection.module.scss';

type Props = {
  section: CmsSection;
};

const BreadcrumbSection: React.FC<Props> = ({ section }) => {
  if (!section || !section.variant || !section.breadcrumbs) {
    return null;
  }
  const { variant, breadcrumbs } = section;

  const variantClasses: any = {
    primary: styles.primary,
    default: styles.default,
    dark: styles.dark,
  };
  const textVariants: any = {
    primary: 'light',
    default: 'dark',
    dark: 'light',
  };

  const variantClass = variantClasses[variant] || variantClasses.default;
  const textVariant = textVariants[variant] || textVariants.default;

  return (
    <div data-testid="breadcrumb-section" className={`${styles.root} ${variantClass}`}>
      <div className="container">
        <BreadCrumbs breadcrumbItems={breadcrumbs} variant={textVariant} />
      </div>
    </div>
  );
};

export default BreadcrumbSection;
