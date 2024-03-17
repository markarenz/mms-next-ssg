import { render, screen } from '@testing-library/react';
import CtaOne from './CtaOne';

const mockSection = {
  slug: 'test-cta',
  type: 'cta-1',
  image1: 'test-image.jpg',
  headline: 'Test Headline',
  subhead: 'Test Subhead',
  buttonLabel: 'Test Button',
  buttonLink: '/test',
};

describe('CtaOne', () => {
  it('renders a CTA with a button', () => {
    render(<CtaOne section={mockSection} />);
    const element = screen.getByTestId('cta-one');
    expect(element).toBeInTheDocument();
  });

  it('returns null when data is missing', () => {
    render(<CtaOne section={{ ...mockSection, image1: '' }} />);
    const element = screen.queryByTestId('cta-one');
    expect(element).not.toBeInTheDocument();
  });
});
