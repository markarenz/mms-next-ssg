'use client';

import React, { useState, useEffect } from 'react';
import { CmsSection } from '@/cms-pages/interfaces/pages';
import { useInView } from 'react-intersection-observer';
import SkillIcon from './icons/SkillIcon';
import styles from './SkillIcons.module.scss';

type Props = {
  section: CmsSection;
};
// eslint-disable-next-line
const SkillIcons: React.FC<Props> = ({ section }) => {
  // const ref = useRef<HTMLElement>(null);
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true });
  const [yearsCount, setYearsCount] = useState(1);
  const skills = section.content?.split('\n').filter((skill) => skill !== '');
  const getSlugForSkill = (skill: string) => {
    return skill.toLowerCase().replace('js', '-js').replace(' ', '-');
  };

  useEffect(() => {
    let count = 1;
    const thisYear = new Date().getFullYear();
    const yearsExperience = thisYear - 1992;
    let timerHandle: ReturnType<typeof setTimeout>;
    const countUp = () => {
      if (count < yearsExperience) {
        count += 1;
        setYearsCount(count);
        timerHandle = setTimeout(() => {
          countUp();
        }, 200);
      }
    };
    countUp();
    return () => {
      timerHandle && clearTimeout(timerHandle);
    };
  }, []);

  const animClass = inView ? 'anim-in' : '';
  const headline = `${section.headline}`.replace('__YEARS__', `${new Date().getFullYear() - 1992}`);

  return (
    <section className={styles.root} data-testid="skill-icons">
      <div className="container">
        <div className={styles.experience}>
          <div className={styles.yearsCol}>
            <span data-testid="skills-years">{yearsCount}</span>
          </div>
          <div className={styles.textCol}>
            <div>
              <h2 className={`anim-me anim-from-left ${animClass}`}>{headline}</h2>
              <h3 className={`anim-me anim-from-left trans-delay-0-25 ${animClass}`}>
                {section.subhead}
              </h3>
            </div>
          </div>
        </div>

        <div className={styles.skillHeader}>
          <h2>
            <svg viewBox="0 0 30 30" preserveAspectRatio="none" width="30" height="30">
              <line x1="95%" y1="5%" x2="25%" y2="5%" stroke="white" strokeWidth="2" />
              <line x1="25%" y1="5%" x2="25%" y2="95%" stroke="white" strokeWidth="2" />
              <line x1="50%" y1="75%" x2="25%" y2="95%" stroke="white" strokeWidth="2" />
              <line x1="5%" y1="75%" x2="25%" y2="95%" stroke="white" strokeWidth="2" />
            </svg>
            <span>skills();</span>
            <svg viewBox="0 0 30 30" preserveAspectRatio="none" width="30" height="30">
              <line x1="5%" y1="5%" x2="75%" y2="5%" stroke="white" strokeWidth="2" />
              <line x1="75%" y1="5%" x2="75%" y2="95%" stroke="white" strokeWidth="2" />
              <line x1="50%" y1="75%" x2="75%" y2="95%" stroke="white" strokeWidth="2" />
              <line x1="100%" y1="75%" x2="75%" y2="95%" stroke="white" strokeWidth="2" />
            </svg>
          </h2>
        </div>

        <div className={styles.skillGrid} ref={ref}>
          {skills?.map((skill) => (
            <div className={styles.skillItem} key={skill}>
              <div>
                <div className={styles.skillIcon} key={skill}>
                  <SkillIcon id={getSlugForSkill(skill)} />
                </div>
                <div className={styles.label}>{skill}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottomDeco}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="60">
          <polygon fillOpacity="0.25" points="0,0 0,100 100,0" />
          <polygon fillOpacity="0.5" points="0,0 0,65 90,0" />
          <polygon points="0,0 0,30 70,0" />
        </svg>
      </div>
    </section>
  );
};

export default SkillIcons;
