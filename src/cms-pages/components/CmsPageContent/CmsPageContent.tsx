import React from 'react';
import { CmsPage } from '@/cms-pages/interfaces/pages';
import CmsPageSection from './CmsPageSection';
import Footer from '@/common/components/Footer/Footer';

type Props = {
  page: CmsPage;
};

const CmsPageContent: React.FC<Props> = ({ page }) => {
  return (
    <>
      {page.cmsSectionHeader && <CmsPageSection section={page.cmsSectionHeader} />}
      <main data-testid={`page-${page.slug}`}>
        {page.cmsSectionContent?.map((section) => (
          <CmsPageSection section={section} key={section.slug} />
        ))}
      </main>
      <Footer />
    </>
  );
};

export default CmsPageContent;
