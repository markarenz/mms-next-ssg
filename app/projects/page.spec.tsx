import { render, screen } from '@testing-library/react';
import ProjectsPage from './page';

describe('PostsPage', () => {
  it('renders component', () => {
    render(<ProjectsPage />);
    const page = screen.getByTestId('page-projects');
    expect(page).toBeInTheDocument();
  });
});
