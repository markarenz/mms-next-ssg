import { render, screen } from '@testing-library/react';
import { CmsSection } from '@/cms-pages/interfaces/pages';
import TwoCol from './TwoCol';

describe('TwoCol', () => {
  it('renders one column section', () => {
    const section: CmsSection = {
      slug: 'test',
      type: 'two-col',
      image1: 'pages/bio/nashb-256.jpg',
      content: 'This is the section content',
      align: 'left',
      variant: 'primary',
    };

    render(<TwoCol section={section} />);
    const element = screen.getByTestId('cms-two-col');
    expect(element).toBeInTheDocument();
  });

  it('returns null with invalid section data', () => {
    const section: CmsSection = {
      slug: 'test',
      type: 'two-col',
      content: 'This is the section content',
      align: 'left',
      variant: 'primary',
    };

    render(<TwoCol section={section} />);
    const element = screen.queryByTestId('cms-two-col');
    expect(element).not.toBeInTheDocument();
  });
});
