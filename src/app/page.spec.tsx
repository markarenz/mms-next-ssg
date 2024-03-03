import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home', () => {
  it('renders component', () => {
    render(<Home />);
    const page = screen.getByTestId('page-home');
    expect(page).toBeTruthy();
  });
});
