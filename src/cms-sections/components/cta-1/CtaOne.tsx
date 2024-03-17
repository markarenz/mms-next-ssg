import React from 'react';
import { CmsSection } from '@/cms-pages/interfaces/pages';
import { getValidValueOrDefault } from '@/cms-sections/lib/utils';
import MarkdownContent from '@/common/components/MarkdownContent/MarkdownContent';
import CmsImage from '@/common/components/CmsImage/CmsImage';
import ButtonLink from '@/common/components/ButtonLink/ButtonLink';
import styles from './CtaOne.module.scss';

type Props = {
  section: CmsSection;
};

const CtaOne: React.FC<Props> = ({ section }) => {
  if (
    !section.image1 ||
    !section.headline ||
    !section.subhead ||
    !section.buttonLabel ||
    !section.buttonLink
  ) {
    return null;
  }
  // TODO: Support CTA Variants
  const variant = `variant-${getValidValueOrDefault(
    section.variant,
    ['default', 'dark', 'primary'],
    'default',
  )}`;

  const classes = `${styles.root} ${styles[variant]}`;

  return (
    <section className={classes} data-testid="cta-one">
      <CmsImage isBgImage src={section.image1} isShaded />
      <div className={styles.lowerGradient} />
      <div className={styles.inner}>
        <div className="container">
          <div className="col-md-12 text-center">
            <h2 className="anim-me2 anim-from-left" id="cta-1-h2">
              <MarkdownContent content={`${section.headline}`} inline />
            </h2>
            <h3 className="anim-me2 anim-from-right trans-delay-0-25" id="cta-1-h3">
              <MarkdownContent content={`${section.subhead}`} inline />
            </h3>
            <div className="centered-row">
              <ButtonLink label={section.buttonLabel} href={section.buttonLink} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaOne;
