import { render, screen } from '@testing-library/react';
import PostsArchivePage, { generateStaticParams } from './page';

describe('PostsArchivePage', () => {
  it('renders component: first page', () => {
    render(
      <PostsArchivePage
        params={{
          pageNum: '1',
        }}
      />,
    );
    const page = screen.getByTestId('page-posts-archive');
    expect(page).toBeTruthy();
  });

  it('renders component: subsequent pages', () => {
    render(
      <PostsArchivePage
        params={{
          pageNum: '2',
        }}
      />,
    );
    const page = screen.getByTestId('page-posts-archive');
    expect(page).toBeTruthy();
  });
});

describe('generateStaticParams', () => {
  it('returns array of slugs', async () => {
    const result = await generateStaticParams();
    expect(result.length).toBeGreaterThan(0);
  });
});
