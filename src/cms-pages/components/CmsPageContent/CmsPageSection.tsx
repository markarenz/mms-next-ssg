import React from 'react';
import PageHeader from '@/cms-sections/components/page-header/PageHeader';
import SkillIcons from '@/cms-sections/components/skill-icons/SkillIcons';
import OneCol from '@/cms-sections/components/one-col/OneCol';
import TwoCol from '@/cms-sections/components/two-col/TwoCol';
import CtaOne from '@/cms-sections/components/cta-1/CtaOne';
import TextBanner from '@/cms-sections/components/text-banner/TextBanner';
import PostsList from '@/cms-sections/components/posts-list/PostsList';
import ProjectsList from '@/cms-sections/components/projects-list/ProjectsList';
import SeparatorSpikes from '@/cms-sections/components/separator-spikes/SeparatorSpikes';
import BreadcrumbSection from '@/cms-sections/components/breadcrumb-section/BreadcrumbSection';
import { CmsSection } from '@/cms-pages/interfaces/pages';
import { CmsPost } from '@/cms-posts/interfaces/posts';
import { CmsProject } from '@/cms-projects/interfaces/projects';

type Props = {
  section: CmsSection;
  data?: {
    posts?: CmsPost[];
    projects: CmsProject[];
  };
};
const CmsPageSection: React.FC<Props> = ({ section, data }) => {
  switch (section.type) {
    case 'page-header':
      return <PageHeader section={section} />;
    case 'one-col':
      return <OneCol section={section} />;
    case 'two-col':
      return <TwoCol section={section} />;
    case 'separator-spikes':
      return <SeparatorSpikes section={section} />;
    case 'cta-1':
      return <CtaOne section={section} />;
    case 'text-banner':
      return <TextBanner section={section} />;
    case 'skill-icons':
      return <SkillIcons section={section} />;
    case 'breadcrumb-section':
      return <BreadcrumbSection section={section} />;
    case 'posts-list':
      return <PostsList section={section} posts={data?.posts || []} />;
    case 'projects-list':
      return <ProjectsList section={section} projects={data?.projects || []} />;
    default:
      return (
        <div style={{ position: 'relative', padding: '2rem', backgroundColor: '#ddd' }}>
          Section Not Found: {section.slug} {section.type}
        </div>
      );
  }
};

export default CmsPageSection;
