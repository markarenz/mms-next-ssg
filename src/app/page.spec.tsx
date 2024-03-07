import { render, screen } from '@testing-library/react';
import Home, { generateMetadata } from './page';

describe('Home', () => {
  it('renders component', () => {
    render(<Home />);
    const page = screen.getByTestId('page-home');
    expect(page).toBeTruthy();
  });
});

describe('generateMetadata', () => {
  it('returns metadata for page by slug', async () => {
    const result = await generateMetadata();
    expect(result.title).toBeTruthy();
  });
});
