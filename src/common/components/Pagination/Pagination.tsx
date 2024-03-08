import React from 'react';
import Link from 'next/link';
import { getArrFromRange } from '@/common/lib/common-utils/common-utils';
import { CONTENT_ROUTES } from '@/common/lib/constants';
import IconTriangle from '../icons/IconTriangleRight';
import styles from './pagination.module.scss';

type Props = {
  pageNum: number;
  maxPages: number;
  contentType: string;
};

const Pagination: React.FC<Props> = ({ pageNum, maxPages, contentType }) => {
  const pagesBeforeAfter = 3;
  const { baseRoute, archiveRoute } = CONTENT_ROUTES[contentType];

  const getLinkRoute = (p: number) => (p === 0 ? baseRoute : `${archiveRoute}${p}`);

  // archive pages should NOT start with 1 they should start with 2?
  // before
  const firstVisiblePage = Math.max(pageNum - pagesBeforeAfter, 1);
  const lastVisiblePage = Math.min(pageNum + pagesBeforeAfter, maxPages);
  const showBeforeEllipses = firstVisiblePage > 1;
  const showAfterEllipses = lastVisiblePage < maxPages;
  const showPrevButton = pageNum > 0;
  const showNextButton = pageNum < maxPages;
  const pagesBefore = getArrFromRange(firstVisiblePage, pageNum - 1, 1);
  const pagesAfter = getArrFromRange(pageNum + 1, lastVisiblePage, 1);

  return (
    <div data-testid="pagination" className={styles.root}>
      <div className={styles.stage}>
        {showPrevButton ? (
          <Link href={getLinkRoute(pageNum - 1)} aria-label="Previous Page">
            <div data-testid="pagination-prev-link" className={styles.arrowButton}>
              <IconTriangle direction="left" />
            </div>
          </Link>
        ) : (
          <div className={styles.emptySpace} />
        )}
        {showBeforeEllipses && <span>...</span>}
        {pagesBefore.map((i) => (
          <Link href={getLinkRoute(i)} key={i} className={styles.link} aria-label={`Page ${i}`}>
            {i}
          </Link>
        ))}
        <div className={styles.currentPage}>{pageNum}</div>
        {pagesAfter.map((i) => (
          <Link href={getLinkRoute(i)} key={i} className={styles.link} aria-label={`Page ${i}`}>
            {i}
          </Link>
        ))}
        {showAfterEllipses && <span>...</span>}
        {showNextButton ? (
          <Link href={getLinkRoute(pageNum + 1)} aria-label="Next Page">
            <div data-testid="pagination-next-link" className={styles.arrowButton}>
              <IconTriangle direction="right" />
            </div>
          </Link>
        ) : (
          <div className={styles.emptySpace} />
        )}
      </div>
    </div>
  );
};
export default Pagination;
