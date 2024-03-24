import { render, screen } from '@testing-library/react';
import PostsArchivePage, { generateStaticParams } from './page';

describe('PostsArchivePage', () => {
  it('renders component: first page', () => {
    render(
      <PostsArchivePage
        params={{
          pageNum: '2',
        }}
      />,
    );
    const page = screen.getByTestId('post-list-page-content');
    expect(page).toBeInTheDocument();
  });

  it('renders component: subsequent pages', () => {
    render(
      <PostsArchivePage
        params={{
          pageNum: '2',
        }}
      />,
    );
    const page = screen.getByTestId('post-list-page-content');
    expect(page).toBeInTheDocument();
  });
});

describe('generateStaticParams', () => {
  it('returns array of slugs', async () => {
    const result = await generateStaticParams();
    expect(result.length).toBeGreaterThan(0);
  });
});
