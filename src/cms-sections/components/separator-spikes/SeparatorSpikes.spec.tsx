import { render, screen } from '@testing-library/react';
import SeparatorSpikes from './SeparatorSpikes';

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const mockSection = {
  slug: 'test',
  type: 'separator-spikes',
};
const variantOptionsColors1 = ['primary', 'default', 'dark'];
const variantOptionsColors2 = [...variantOptionsColors1];
const variantOptionsDirections = ['up', 'down'];
const variants: string[] = [];

variantOptionsColors1.forEach((color1) => {
  variantOptionsColors2.forEach((color2) => {
    variantOptionsDirections.forEach((direction) => {
      variants.push(`${color1}-${color2}-${direction}`);
    });
  });
});

describe('SeparatorSpikes', () => {
  // Test all variant types
  variants.forEach((variant) => {
    it('renders with default-primary-down variant', () => {
      render(
        <SeparatorSpikes
          section={{
            ...mockSection,
            variant: variant,
          }}
        />,
      );
      const element = screen.getByTestId('cms-separator-spikes');
      const [expectedSpikesColor, expectedBgColor, expectedDirection] = variant.split('-');
      expect(element.className).toContain(`spikes${capitalizeFirstLetter(expectedSpikesColor)}`);
      expect(element.className).toContain(`bg${capitalizeFirstLetter(expectedBgColor)}`);
      expect(element.className).toContain(`direction${capitalizeFirstLetter(expectedDirection)}`);
    });
  });

  it('returns null when variant is not provided', () => {
    render(
      <SeparatorSpikes
        section={{
          ...mockSection,
        }}
      />,
    );
    const element = screen.queryByTestId('cms-separator-spikes');
    expect(element).not.toBeInTheDocument();
  });

  it('returns null when variant is not provided', () => {
    render(
      <SeparatorSpikes
        section={{
          ...mockSection,
        }}
      />,
    );
    const element = screen.queryByTestId('cms-separator-spikes');
    expect(element).not.toBeInTheDocument();
  });

  it('returns null when variant is not valid', () => {
    render(
      <SeparatorSpikes
        section={{
          ...mockSection,
          variant: 'test',
        }}
      />,
    );
    const element = screen.queryByTestId('cms-separator-spikes');
    expect(element).not.toBeInTheDocument();
  });

  it('uses defaults when variants are non-standard', () => {
    render(
      <SeparatorSpikes
        section={{
          ...mockSection,
          variant: 'test-test-test',
        }}
      />,
    );
    const element = screen.queryByTestId('cms-separator-spikes');
    expect(element?.className).toContain('spikesDefault');
  });
});
