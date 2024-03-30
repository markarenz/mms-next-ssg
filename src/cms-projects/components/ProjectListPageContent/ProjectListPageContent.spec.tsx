import { render, screen } from '@testing-library/react';
import ProjectListPageContent from './ProjectListPageContent';
import { mockProject } from '@/cms-projects/lib/mocks/mockProject';

describe('ProjectListPageContent', () => {
  it('renders component', () => {
    render(<ProjectListPageContent projects={[mockProject]} pageNum={1} maxPages={3} />);
    const element = screen.getByTestId('projects-list-page-content');
    expect(element).toBeInTheDocument();
  });
  it('renders null when required fields are not present', () => {
    //@ts-ignore
    render(<ProjectListPageContent projects={[]} pageNum={1} />);
    const element = screen.queryByTestId('projects-list-page-content');
    expect(element).not.toBeInTheDocument();
  });
});
