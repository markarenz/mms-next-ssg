import { render, screen } from '@testing-library/react';
import ProjectDetailPage, { generateStaticParams } from './page';

describe('ProjectDetailPage', () => {
  it('renders component', () => {
    render(
      <ProjectDetailPage
        params={{
          slug: 'fff',
        }}
      />,
    );
    const page = screen.getByTestId('page-project-detail');
    expect(page).toBeInTheDocument();
  });
});

describe('generateStaticParams', () => {
  it('returns array of slugs', async () => {
    const result = await generateStaticParams();
    expect(result.length).toBeGreaterThan(0);
  });
});
