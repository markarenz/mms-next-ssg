import { render, screen } from '@testing-library/react';
import PostListPageContent from './PostListPageContent';
import { mockPost } from '@/cms-posts/lib/mocks/mockPost';

describe('PostListPageContent', () => {
  it('renders component', () => {
    render(<PostListPageContent posts={[mockPost]} pageNum={1} maxPages={3} />);
    const element = screen.getByTestId('post-list-page-content');
    expect(element).toBeInTheDocument();
  });
  it('renders null when required fields are not present', () => {
    //@ts-ignore
    render(<PostListPageContent posts={[]} pageNum={1} />);
    const element = screen.queryByTestId('post-list-page-content');
    expect(element).not.toBeInTheDocument();
  });
});
