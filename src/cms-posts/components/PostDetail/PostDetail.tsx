import React from 'react';
import { CmsPost } from '@/cms-posts/interfaces/posts';
import MarkdownContent from '@/common/components/MarkdownContent/MarkdownContent';
import ButtonLink from '@/common/components/ButtonLink/ButtonLink';
import Footer from '@/common/components/Footer/Footer';
import styles from './PostDetail.module.scss';
import PageHeader from '@/cms-sections/components/page-header/PageHeader';
import { BreadCrumbItem } from '@/common/interfaces/app';
import BreadCrumbs from '@/common/components/Breadcrumbs/Breadcrumbs';

type Props = {
  post: CmsPost;
  breadcrumbItems: BreadCrumbItem[];
};

const PostDetail: React.FC<Props> = ({ post, breadcrumbItems }) => {
  if (!post || !post.slug || !post.content) {
    return null;
  }

  return (
    <>
      <PageHeader
        section={{
          slug: '',
          type: 'page-header',
          image1: post.image,
          headline: post.title,
          variant: 'light',
        }}
      />
      <main data-testid="page-post-detail" className={styles.root}>
        <div className="container">
          <div className={styles.breadcrumbWrap}>
            <BreadCrumbs breadcrumbItems={breadcrumbItems} variant="dark" />
          </div>
          <div className={styles.mainContent}>
            <MarkdownContent content={post.content} />
          </div>
          <div className={styles.actionRow}>
            <ButtonLink href="/posts" label="Back to Posts" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default PostDetail;
