import React from 'react';
import { CmsPage } from '@/cms-pages/interfaces/pages';
import { CmsPost } from '@/cms-posts/interfaces/posts';
import CmsPageSection from './CmsPageSection';
import Footer from '@/common/components/Footer/Footer';

type Props = {
  page: CmsPage;
  data?: {
    posts?: CmsPost[];
  };
};

const CmsPageContent: React.FC<Props> = ({ page, data }) => {
  return (
    <>
      {page.cmsSectionHeader && <CmsPageSection section={page.cmsSectionHeader} />}
      <main data-testid={`page-${page.slug}`}>
        {page.cmsSectionContent?.map((section) => (
          <CmsPageSection section={section} key={section.slug} data={data} />
        ))}
      </main>
      <Footer />
    </>
  );
};

export default CmsPageContent;
