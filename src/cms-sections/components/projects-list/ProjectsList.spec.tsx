import { render, screen } from '@testing-library/react';
import ProjectsList from './ProjectsList';
import { mockProject } from '@/cms-projects/lib/mocks/mockProject';
import { CmsSection } from '@/cms-pages/interfaces/pages';

describe('ProjectsList', () => {
  it('renders component', () => {
    const mockSection: CmsSection = {
      type: 'projects',
      headline: 'Projects',
      slug: 'projects',
    };
    render(<ProjectsList section={mockSection} projects={[mockProject]} />);
    const element = screen.getByTestId('projects-list');
    expect(element).toBeInTheDocument();
  });
  it('returns null when required fields are not valid', () => {
    const mockSection: CmsSection = {
      type: 'projects',
      headline: 'Projects',
      slug: 'projects',
    };
    //@ts-ignore
    render(<ProjectsList section={mockSection} />);
    const element = screen.queryByTestId('projects-list');
    expect(element).not.toBeInTheDocument();
  });
});
