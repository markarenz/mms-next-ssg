'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CmsSection } from '@/cms-pages/interfaces/pages';
import { navMenuItems } from '@/common/menus/lib/menuData';
import CmsImage from '@/common/components/CmsImage/CmsImage';
import { delayClasses } from '@/common/lib/constants';
import styles from './PageHeaderOrange.module.scss';

type Props = {
  section: CmsSection;
};
const PageHeaderOrange: React.FC<Props> = ({ section }) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsInitialized(true);
    }, 100);
  }, []);

  if (!section.image1) {
    return null;
  }

  return (
    <div data-testid="page-header-orange" className={styles.root}>
      <div className={styles.bgWrapper}>
        <CmsImage alt="" src={section.image1} />
      </div>
      <div className={`${styles.bgWrapper} ${styles.texture}`} />
      <div className={styles.bgGradient} />
      <div className={styles.inner}>
        <div className="row container anim-first-screen">
          <div>
            <h1
              data-testid="page-header-headline"
              className={`anim-me anim-from-left ${isInitialized ? 'anim-in' : ''}`}
            >
              {section.headline}
            </h1>
            <h2 className={`anim-me anim-from-right ${isInitialized ? 'anim-in' : ''}`}>
              {section.subhead}
            </h2>
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
    </div>
  );
};

export default PageHeaderOrange;
