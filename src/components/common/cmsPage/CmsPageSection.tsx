import React from 'react';
import FooterDefault from '@/components/common/cmsPage/sections/FooterDefault/FooterDefault';
import { CmsSection } from '@/interfaces/pages';

type Props = {
  section: CmsSection;
};
const CmsPageSection: React.FC<Props> = ({ section }) => {
  switch (section.type) {
    case 'footer-default':
      return <FooterDefault section={section} />;
    case '':
    default:
      return (
        <div>
          Section Not Found: {section.slug} {section.type}
        </div>
      );
  }
  // return <div>{JSON.stringify(section)}</div>;
};

export default CmsPageSection;
