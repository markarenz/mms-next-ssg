import { render, screen } from '@testing-library/react';
import BioPage, { generateMetadata } from './page';

describe('BioPage', () => {
  it('renders component', () => {
    render(<BioPage />);
    const page = screen.getByTestId('page-bio');
    expect(page).toBeInTheDocument();
  });
});

describe('generateMetadata', () => {
  it('returns metadata for page by slug', async () => {
    const result = await generateMetadata();
    expect(result.title).toBeTruthy();
  });
});
