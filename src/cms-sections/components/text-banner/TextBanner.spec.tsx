import { render, screen } from '@testing-library/react';
import TextBanner from './TextBanner';

describe('TextBanner', () => {
  it('renders a headline and subhead', () => {
    const section = {
      slug: 'test-text-banner',
      type: 'text-banner',
      variant: 'tech',
      headline: 'Hello, world!',
      subhead: 'This is a test.',
    };
    render(<TextBanner section={section} />);
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    expect(screen.getByText('This is a test.')).toBeInTheDocument();
  });

  it('returns null when section data invalid', () => {
    const section = {
      slug: 'test-text-banner',
      type: 'text-banner',
      variant: 'tech',
      subhead: 'This is a test.',
    };
    render(<TextBanner section={section} />);
    expect(screen.queryByTestId('cms-text-banner')).not.toBeInTheDocument();
  });
});
