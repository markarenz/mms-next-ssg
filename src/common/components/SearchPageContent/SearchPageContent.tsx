'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/cms-sections/components/page-header/PageHeader';
import ButtonLink from '@/common/components/ButtonLink/ButtonLink';
import Footer from '@/common/components/Footer/Footer';
import { DEFAULT_IMAGES } from '@/common/lib/constants';
import { BreadCrumbItem } from '@/common/interfaces/app';
import BreadCrumbs from '@/common/components/Breadcrumbs/Breadcrumbs';
import styles from './SearchPageContent.module.scss';

type Props = {
  contentIndex: any;
  breadcrumbItems: BreadCrumbItem[];
  contentType: string;
};

const SearchPageContent: React.FC<Props> = ({
  contentIndex,
  breadcrumbItems,
  contentType = 'posts',
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [searchString, setSearchString] = useState<string>('');

  if (!contentIndex) {
    return null;
  }
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchString = e.target.value;
    setSearchString(newSearchString);
    if (e.target.value) {
      const searchResults = contentIndex[newSearchString.toLowerCase()] || [];
      setItems(searchResults);
    }
  };

  const baseLink = `/${contentType}`;

  return (
    <div data-testid="search-list-page-content">
      <PageHeader
        section={{
          slug: '',
          type: 'page-header',
          image1: DEFAULT_IMAGES.POSTS,
          headline: `Search ${contentType === 'posts' ? 'Posts' : 'Projects'}`,
          variant: 'dark',
        }}
      />

      <main data-testid="search-page-results" className={styles.root}>
        <div className="container">
          <div className={styles.breadcrumbWrap}>
            <BreadCrumbs breadcrumbItems={breadcrumbItems} variant="light" />
          </div>
          <div className={styles.searchInput}>
            <input
              data-testid="search-input"
              type="text"
              onChange={(e) => handleSearchChange(e)}
              value={searchString}
              placeholder="Search..."
            />
          </div>
          {items.length ? (
            <div data-testid="search-items" className={styles.itemsWrap}>
              {items.map((item) => (
                <div key={item.slug} className={styles.item}>
                  <Link href={`${baseLink}/${item.slug}`}>{item.title}</Link>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>No results found.</div>
          )}
        </div>
        <div className={styles.actionRow}>
          <ButtonLink href={baseLink} label={`Return to ${contentType}`} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPageContent;
