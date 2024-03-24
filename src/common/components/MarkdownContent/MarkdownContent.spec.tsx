import { render, screen } from '@testing-library/react';
import MarkdownContent from './MarkdownContent';

describe('MarkdownContent', () => {
  it('renders component', () => {
    render(<MarkdownContent content="Test Content *Italic* and **Bold**." />);
    const element = screen.getByTestId('markdown-content');
    expect(element).toBeInTheDocument();
  });

  it('renders link: internal', () => {
    render(<MarkdownContent content="Test [Link](/posts)" />);
    const element = screen.getByText('Link');
    expect(element.getAttribute('target')).toBe(null);
  });

  it('renders link: external', () => {
    render(<MarkdownContent content="Test [Link](https://www.google.com)" />);
    const element = screen.getByText('Link');
    expect(element.getAttribute('target')).toEqual('_blank');
  });
});
