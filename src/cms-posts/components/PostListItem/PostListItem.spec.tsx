import { render, screen } from '@testing-library/react';
import PostListItem from './PostListItem';
import { CmsPost } from '@/cms-posts/interfaces/posts';

const mockPost: CmsPost = {
  title: 'This is a title',
  metaDescription: 'This is a meta description.',
  image: 'test.jpg',
  slug: 'mock',
  datePublished: '2024-03-03',
  content: 'This is some content.',
  excerpt: 'This is an excerpt.',
};
describe('MarkdownContent', () => {
  it('renders component', () => {
    render(<PostListItem post={mockPost} />);
    const element = screen.getByTestId('post-list-item');
    expect(element).toBeInTheDocument();
  });
});
