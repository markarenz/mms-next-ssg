import { render, screen } from '@testing-library/react';
import { CmsSection } from '@/cms-pages/interfaces/pages';
import OneCol from './OneCol';

describe('OneCol', () => {
  it('renders one column section', () => {
    // Arrange
    const section: CmsSection = {
      slug: 'test',
      type: 'one-col',
      content: 'This is the section content',
      align: 'left',
      variant: 'default',
    };
    render(<OneCol section={section} />);
    const element = screen.getByTestId('cms-one-col');
    expect(element).toBeInTheDocument();
  });

  it('renders defaults when no variant or align is provided', () => {
    // Arrange
    const section: CmsSection = {
      slug: 'test',
      type: 'one-col',
      content: 'This is the section content',
    };
    render(<OneCol section={section} />);
    const element = screen.queryByTestId('cms-one-col');
    expect(element?.getAttribute('class')).toContain('align-left');
    expect(element?.getAttribute('class')).toContain('variant-default');
  });
  it('renders null when no content prop is provided', () => {
    // Arrange
    const section: CmsSection = {
      slug: 'test',
      type: 'one-col',
      align: 'left',
      variant: 'default',
    };
    render(<OneCol section={section} />);
    const element = screen.queryByTestId('cms-one-col');
    expect(element).not.toBeInTheDocument();
  });
});
