import { render, screen } from '@testing-library/react';
import CmsPageSection from './CmsPageSection';

describe('CmsPageSection', () => {
  it('renders CmsPageSection for posts list with no data', () => {
    const mockSection = {
      slug: 'test',
      type: 'posts-list',
      headline: 'Test TItle',
      numItems: 6,
      buttonLabel: 'See More Posts',
      buttonLink: '/posts',
    };
    render(<CmsPageSection section={mockSection} />);
    const element = screen.getByTestId('posts-list');
    expect(element).toBeInTheDocument();
  });

  it('renders CmsPageSection for projects list with no data', () => {
    const mockSection = {
      slug: 'test',
      type: 'projects-list',
      headline: 'Test TItle',
      numItems: 6,
      buttonLabel: 'See More Posts',
      buttonLink: '/projects',
    };
    render(<CmsPageSection section={mockSection} />);
    const element = screen.getByTestId('projects-list');
    expect(element).toBeInTheDocument();
  });
});
