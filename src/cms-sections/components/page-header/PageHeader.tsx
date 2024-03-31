'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CmsSection } from '@/cms-pages/interfaces/pages';
import { navMenuItems } from '@/common/menus/lib/menuData';
import CmsImage from '@/common/components/CmsImage/CmsImage';
import { delayClasses } from '@/common/lib/constants';
import styles from './PageHeader.module.scss';

type Props = {
  section: CmsSection;
};
const PageHeader: React.FC<Props> = ({ section }) => {
  const { headline, subhead, image1, slug } = section;
  const variant = section.variant || 'primary';
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsInitialized(true);
    }, 100);
  }, []);

  if (!image1) {
    return null;
  }

  const variantClass =
    variant === 'light'
      ? styles.variantLight
      : variant === 'dark'
      ? styles.variantDark
      : styles.variantPrimary;

  return (
    <section data-testid="page-header" className={`${styles.root} ${variantClass}`}>
      <CmsImage
        alt={`background for ${headline}`}
        isBgImage
        src={image1}
        className={styles.imgBg}
      />
      {variant === 'primary' && <div className={`${styles.bgWrapper} ${styles.texture}`} />}
      {variant === 'primary' && <div className={styles.bgGradient} />}
      <div className={styles.inner}>
        <div className="row container anim-first-screen">
          <div>
            <h1
              data-testid="page-header-headline"
              className={`anim-me anim-from-left ${isInitialized ? 'anim-in' : ''}`}
            >
              {headline}
            </h1>
            <h2 className={`anim-me anim-from-right ${isInitialized ? 'anim-in' : ''}`}>
              {subhead}
            </h2>
            {slug === 'header-home' && (
              <div className={styles.subNav}>
                {navMenuItems
                  .filter((item) => item.href !== '/')
                  .map((item, idx) => (
                    <div
                      key={item.label}
                      className={`${styles.subNavLinks} anim-me anim-from-below ${
                        delayClasses[idx + 1]
                      } ${isInitialized ? 'anim-in' : ''}`}
                    >
                      <div className="hover-zoom">
                        <Link href={item.href}>{item.label}</Link>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles['svg-box-top']}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="60">
            <polygon fillOpacity="0.25" points="0,0 0,100 100,0" />
            <polygon fillOpacity="0.5" points="0,0 0,65 90,0" />
            <polygon points="0,0 0,30 70,0" />
          </svg>
        </div>
        <div className={styles['svg-box-bottom']}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="60">
            <polygon fillOpacity="0.25" points="0,90 0,100 100,100 100,0" />
            <polygon fillOpacity="0.5" points="0,95 0,100 100,100 100,35" />
            <polygon points="0,100 100,100 100,70" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
