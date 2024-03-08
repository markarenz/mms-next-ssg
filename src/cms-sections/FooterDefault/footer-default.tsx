import React from 'react';
import { CmsSection } from '@/cms-pages/interfaces/pages';
import CmsImage from '@/common/components/CmsImage/CmsImage';

type Props = {
  section: CmsSection;
};
const FooterDefault: React.FC<Props> = () => {
  // section
  return (
    <footer>
      Yes this is a footer.
      <CmsImage
        src="default-image.jpg"
        alt="This is an image"
        width={200}
        style={{ border: '3px dashed red' }}
      />
    </footer>
  );
};
export default FooterDefault;
