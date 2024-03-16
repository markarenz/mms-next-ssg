import { render, screen } from '@testing-library/react';
import MarkdownContent from './MarkdownContent';

describe('MarkdownContent', () => {
  it('renders component', () => {
    render(<MarkdownContent content="Test Content *Italic* and **Bold**." />);
    const element = screen.getByTestId('markdown-content');
    expect(element).toBeInTheDocument();
  });
});
