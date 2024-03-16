import { screen, render, fireEvent } from '@testing-library/react';
import Footer from './Footer';

describe('FooterDefault', () => {
  it('renders the FooterDefault component', () => {
    render(<Footer />);
    const footerDefaultElement = screen.getByTestId('footer-default');
    expect(footerDefaultElement).toBeInTheDocument();
  });

  it('handles form submission', () => {
    render(<Footer />);
    const button = screen.getByTestId('footer-contact-submit');
    fireEvent.click(button);
    const form = screen.getByTestId('footer-contact');
    expect(form.getAttribute('class')?.includes('submitted')).toBe(true);
  });
});
