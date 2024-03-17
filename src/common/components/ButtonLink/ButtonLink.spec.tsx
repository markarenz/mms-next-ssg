import { render, screen } from '@testing-library/react';
import ButtonLink from './ButtonLink';

describe('ButtonLink', () => {
  it('renders an internal link', () => {
    render(<ButtonLink label="Test" href="/test" testId="test-link" />);
    const element = screen.getByTestId('test-link');
    expect(element).toBeInTheDocument();
  });

  it('renders an external link', () => {
    render(<ButtonLink label="Test" href="https://www.test.com" testId="test-link" />);
    const element = screen.getByTestId('test-link');
    expect(element).toBeInTheDocument();
  });
});
