import React from 'react';
import PageHeaderOrange from '@/cms-sections/components/page-header-orange/PageHeaderOrange';
import SkillIcons from '@/cms-sections/components/skill-icons/SkillIcons';
import OneCol from '@/cms-sections/components/one-col/OneCol';
import CtaOne from '@/cms-sections/components/cta-1/CtaOne';
import TextBanner from '@/cms-sections/components/text-banner/TextBanner';
import { CmsSection } from '@/cms-pages/interfaces/pages';

type Props = {
  section: CmsSection;
};
const CmsPageSection: React.FC<Props> = ({ section }) => {
  switch (section.type) {
    case 'page-header-orange':
      return <PageHeaderOrange section={section} />;
    case 'one-col':
      return <OneCol section={section} />;
    case 'cta-1':
      return <CtaOne section={section} />;
    case 'text-banner':
      return <TextBanner section={section} />;
    case 'skill-icons':
      return <SkillIcons section={section} />;
    default:
      return (
        <div style={{ position: 'relative', padding: '2rem', backgroundColor: '#ddd' }}>
          Section Not Found: {section.slug} {section.type}
        </div>
      );
  }
};

export default CmsPageSection;
