import { render, screen } from '@testing-library/react';
import PostsList from './PostsList';
import { mockPost } from '@/cms-posts/lib/mocks/mockPost';
import { CmsSection } from '@/cms-pages/interfaces/pages';

describe('PostsList', () => {
  it('renders component', () => {
    const mockSection: CmsSection = {
      type: 'posts',
      headline: 'Posts',
      slug: 'posts',
    };
    render(<PostsList section={mockSection} posts={[mockPost]} />);
    const element = screen.getByTestId('posts-list');
    expect(element).toBeInTheDocument();
  });
  it('returns null when required fields are not valid', () => {
    const mockSection: CmsSection = {
      type: 'posts',
      headline: 'Posts',
      slug: 'posts',
    };
    //@ts-ignore
    render(<PostsList section={mockSection} />);
    const element = screen.queryByTestId('posts-list');
    expect(element).not.toBeInTheDocument();
  });
});
