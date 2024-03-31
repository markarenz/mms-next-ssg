import { render, screen } from '@testing-library/react';
import Custom404 from './not-found';

describe('Custom404', () => {
  it('renders Custom404', () => {
    render(<Custom404 />);
    const element = screen.getByTestId('not-found');
    expect(element).toBeInTheDocument();
  });
});
