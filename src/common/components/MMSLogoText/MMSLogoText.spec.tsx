import { render, screen } from '@testing-library/react';
import MMSLogoText from './MMSLogoText';

describe('MMSLogoText', () => {
  it('renders component', () => {
    render(<MMSLogoText />);
    const element = screen.getByTestId('mms-logo-text');
    expect(element).toBeInTheDocument();
  });
});
