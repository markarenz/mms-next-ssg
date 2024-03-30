import { render, screen } from '@testing-library/react';
import ProjectsArchivePage, { generateStaticParams } from './page';

describe('ProjectsArchivePage', () => {
  it('renders component: first page', () => {
    render(
      <ProjectsArchivePage
        params={{
          pageNum: '2',
        }}
      />,
    );
    const page = screen.getByTestId('projects-list-page-content');
    expect(page).toBeInTheDocument();
  });

  it('renders component: subsequent pages', () => {
    render(
      <ProjectsArchivePage
        params={{
          pageNum: '2',
        }}
      />,
    );
    const page = screen.getByTestId('projects-list-page-content');
    expect(page).toBeInTheDocument();
  });
});

describe('generateStaticParams', () => {
  it('returns array of slugs', async () => {
    const result = await generateStaticParams();
    expect(result.length).toBeGreaterThan(0);
  });
});
