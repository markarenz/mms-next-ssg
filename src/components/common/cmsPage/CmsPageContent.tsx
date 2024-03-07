import React from 'react';
import { CmsPage } from '@/interfaces/pages';
import CmsPageSection from './CmsPageSection';

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
      {page.cmsSectionFooter && <CmsPageSection section={page.cmsSectionFooter} />}
    </>
  );
};

export default CmsPageContent;
