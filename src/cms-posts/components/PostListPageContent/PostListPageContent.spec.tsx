import { render, screen } from '@testing-library/react';
import PostListPageContent from './PostListPageContent';
import { mockPost } from '@/cms-posts/lib/mocks/mockPost';

const mockBreadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Archive Page 1 of 3', path: '/projects/archive/1/' },
];

describe('PostListPageContent', () => {
  it('renders component', () => {
    render(
      <PostListPageContent
        posts={[mockPost]}
        pageNum={1}
        maxPages={3}
        breadcrumbItems={mockBreadcrumbs}
      />,
    );
    const element = screen.getByTestId('post-list-page-content');
    expect(element).toBeInTheDocument();
  });
  it('renders null when required fields are not present', () => {
    //@ts-ignore
    render(<PostListPageContent posts={[]} pageNum={1} breadcrumbItems={mockBreadcrumbs} />);
    const element = screen.queryByTestId('post-list-page-content');
    expect(element).not.toBeInTheDocument();
  });
});
