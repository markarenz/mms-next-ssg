import { render, screen } from '@testing-library/react';
import BreadCrumbs from './Breadcrumbs';

describe('BreadCrumbs', () => {
  it('should render', () => {
    render(
      <BreadCrumbs
        breadcrumbItems={[
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: 'Project Title', path: '/projects/project-title' },
        ]}
        variant="light"
      />,
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Project Title')).toBeInTheDocument();
  });
});
