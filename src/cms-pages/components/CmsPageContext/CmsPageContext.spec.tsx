import { render, screen } from '@testing-library/react';
import { CmsPageContextProvider, useCmsPageContext } from './CmsPageContext';
import { CmsPost } from '@/cms-posts/interfaces/posts';
import { mockPost } from '@/cms-posts/lib/mocks/mockPost';

describe('CmsPageContextProvider', () => {
  const TestComponent = () => {
    const { posts } = useCmsPageContext();
    return <div data-testid="result">{posts?.length}</div>;
  };
  it('should render', () => {
    const mockPosts: CmsPost[] = [mockPost];
    render(
      <CmsPageContextProvider loadedPosts={mockPosts}>
        <TestComponent />
      </CmsPageContextProvider>,
    );
    const element = screen.getByTestId('result');
    expect(element.textContent).toEqual(`${mockPosts.length}`);
  });

  it('should render handles no loadedPosts', () => {
    render(
      <CmsPageContextProvider>
        <TestComponent />
      </CmsPageContextProvider>,
    );
    const element = screen.getByTestId('result');
    expect(element.textContent).toEqual('0');
  });
});
