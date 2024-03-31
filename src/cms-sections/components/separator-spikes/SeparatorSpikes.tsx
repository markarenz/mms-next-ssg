import React from 'react';
import { CmsSection } from '@/cms-pages/interfaces/pages';
import styles from './SeparatorSpikes.module.scss';

type Props = {
  section: CmsSection;
};

const SeparatorSpikes: React.FC<Props> = ({ section }) => {
  if (!section.variant || section?.variant.split('-').length < 3) {
    return null;
  }
  const variantBits = section?.variant.split('-');
  const [spikesColor, bgColor, direction] = variantBits;
  const spikesColorClasses: any = {
    primary: styles.spikesPrimary,
    default: styles.spikesDefault,
    dark: styles.spikesDark,
  };
  const bgColorClasses: any = {
    primary: styles.bgPrimary,
    default: styles.bgDefault,
    dark: styles.bgDark,
  };

  const spikesColorClass = spikesColorClasses[spikesColor] || styles.spikesDefault;
  const bgColorClass = bgColorClasses[bgColor] || styles.bgDefault;
  const directionClass = ['up', 'down'].includes(`${direction}`)
    ? direction === 'up'
      ? styles.directionUp
      : styles.directionDown
    : styles.directionUp;

  return (
    <div
      data-testid="cms-separator-spikes"
      className={`${styles.root} ${spikesColorClass} ${bgColorClass} ${directionClass}`}
    >
      <div className={styles.spikes} />
    </div>
  );
};

export default SeparatorSpikes;
