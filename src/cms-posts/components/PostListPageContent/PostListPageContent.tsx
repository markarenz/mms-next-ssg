import React from 'react';
import { CmsPost } from '@/cms-posts/interfaces/posts';
import PageHeader from '@/cms-sections/components/page-header/PageHeader';
import ButtonLink from '@/common/components/ButtonLink/ButtonLink';
import ContentListItem from '@/common/components/ContentListItem/ContentListItem';
import { mapSummaryFromPost } from '@/cms-posts/lib/utils';
import Footer from '@/common/components/Footer/Footer';
import styles from './PostListPageContent.module.scss';
import { CONTENT_TYPES, DEFAULT_IMAGES } from '@/common/lib/constants';
import Pagination from '@/common/components/Pagination/Pagination';

type Props = {
  posts: CmsPost[];
  pageNum: number;
  maxPages: number;
};

const PostListPageContent: React.FC<Props> = ({ posts, pageNum, maxPages }) => {
  if (!posts || posts.length === 0 || !maxPages) {
    return null;
  }

  return (
    <div data-testid="post-list-page-content">
      <PageHeader
        section={{
          slug: '',
          type: 'page-header',
          image1: DEFAULT_IMAGES.POSTS,
          headline: 'Posts',
          variant: 'dark',
        }}
      />

      <main data-testid="page-posts" className={styles.root}>
        <div className="container">
          <div className="itemsWrap">
            {posts.map((post) => (
              <ContentListItem key={post.slug} summary={mapSummaryFromPost(post)} />
            ))}
          </div>
        </div>
        <div className={styles.actionRow}>
          {pageNum > 0 ? (
            <Pagination pageNum={pageNum} maxPages={maxPages} contentType={CONTENT_TYPES.POSTS} />
          ) : (
            <ButtonLink href="/posts/archive/1" label="See More Posts" />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostListPageContent;
