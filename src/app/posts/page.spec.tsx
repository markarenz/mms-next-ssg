import { render, screen } from '@testing-library/react';
import PostsPage from './page';

describe('PostsPage', () => {
  it('renders component', () => {
    render(<PostsPage />);
    const page = screen.getByTestId('page-posts');
    expect(page).toBeTruthy();
  });
});
