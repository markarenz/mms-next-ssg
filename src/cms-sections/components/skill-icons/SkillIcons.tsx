import React from 'react';
import styles from './SkillIcons.module.scss';
import { CmsSection } from '@/cms-pages/interfaces/pages';

type Props = {
  section: CmsSection;
};
// eslint-disable-next-line
const SkillIcons: React.FC<Props> = ({ section }) => {
  return (
    <div className={styles.root}>
      <div className="container">
        <h2>This is my section</h2>
      </div>
    </div>
  );
};

export default SkillIcons;
