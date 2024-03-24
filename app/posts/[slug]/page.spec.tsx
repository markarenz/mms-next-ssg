import { render, screen } from '@testing-library/react';
import PostDetailPage, { generateStaticParams } from './page';

describe('PostDetailPage', () => {
  it('renders component', () => {
    render(
      <PostDetailPage
        params={{
          slug: 'games-react',
        }}
      />,
    );
    const page = screen.getByTestId('page-post-detail');
    expect(page).toBeInTheDocument();
  });
});

describe('generateStaticParams', () => {
  it('returns array of slugs', async () => {
    const result = await generateStaticParams();
    expect(result.length).toBeGreaterThan(0);
  });
});
