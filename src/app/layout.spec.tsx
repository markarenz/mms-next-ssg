import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from './layout';

// Suppress console output related to nested elements for Layout test
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};

describe('RootLayout', () => {
  it('renders the layout', () => {
    render(
      <RootLayout>
        <div data-testid="child">Child content</div>
      </RootLayout>,
    );

    const layout = screen.getByTestId('child');
    expect(layout).toBeTruthy();
  });
});
describe('metadata', () => {
  it('loads properly', () => {
    expect(metadata.title).not.toBe(null);
  });
});
