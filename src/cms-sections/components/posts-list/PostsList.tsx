import { CmsSection } from '@/cms-pages/interfaces/pages';
import { CmsPost } from '@/cms-posts/interfaces/posts';
import React from 'react';
import ContentListItem from '@/common/components/ContentListItem/ContentListItem';
import { mapSummaryFromPost } from '@/cms-posts/lib/post-utils';
import styles from './PostsList.module.scss';
import ButtonLink from '@/common/components/ButtonLink/ButtonLink';

type Props = {
  section: CmsSection;
  posts: CmsPost[];
};

const PostsList: React.FC<Props> = ({ section, posts }) => {
  if (!section || !posts) {
    return null;
  }
  const { numItems, headline, buttonLabel, buttonLink } = section;

  return (
    <section className={styles.root} data-testid="posts-list">
      <div className="container">
        <h2>{headline}</h2>
        <div className={`itemsWrap ${styles.postsWrap}`}>
          {posts.slice(0, numItems).map((post: CmsPost) => (
            <ContentListItem key={post.slug} summary={mapSummaryFromPost(post)} />
          ))}
        </div>

        <div className={styles.actionRow}>
          <ButtonLink href={`${buttonLink}`} label={`${buttonLabel}`} />
        </div>
      </div>
    </section>
  );
};

export default PostsList;
