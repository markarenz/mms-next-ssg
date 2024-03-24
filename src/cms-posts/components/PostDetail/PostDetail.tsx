import React from 'react';
import { CmsPost } from '@/cms-posts/interfaces/posts';
import MarkdownContent from '@/common/components/MarkdownContent/MarkdownContent';
import ButtonLink from '@/common/components/ButtonLink/ButtonLink';
import Footer from '@/common/components/Footer/Footer';
import styles from './PostDetail.module.scss';
import PageHeader from '@/cms-sections/components/page-header/PageHeader';

type Props = {
  post: CmsPost;
};
const PostDetail: React.FC<Props> = ({ post }) => {
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
