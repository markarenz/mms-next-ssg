import { render, screen } from '@testing-library/react';
import MMSLogo from './MMSLogo';

describe('MMSLogo', () => {
  it('renders component', () => {
    render(<MMSLogo />);
    const element = screen.getByTestId('mms-logo');
    expect(element).toBeInTheDocument();
  });
});
