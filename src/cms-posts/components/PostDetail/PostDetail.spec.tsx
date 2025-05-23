import { render, screen } from '@testing-library/react';
import PostDetail from './PostDetail';
import { mockPost } from '@/cms-posts/lib/mocks/mockPost';

const mockBreadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Posts', path: '/posts' },
  { name: 'Post Title', path: '/posts/post-title' },
];

describe('PostDetail', () => {
  it('renders component', () => {
    render(<PostDetail post={mockPost} breadcrumbItems={mockBreadcrumbs} />);
    const element = screen.getByTestId('page-post-detail');
    expect(element).toBeInTheDocument();
  });
  it('returns null when required fields are not present', () => {
    //@ts-ignore
    render(<PostDetail post={{ ...mockPost, content: null }} breadcrumbItems={mockBreadcrumbs} />);
    const element = screen.queryByTestId('page-post-detail');
    expect(element).not.toBeInTheDocument();
  });
});
