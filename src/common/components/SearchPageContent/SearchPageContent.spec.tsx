import { render, screen, fireEvent } from '@testing-library/react';
import SearchPageContent from './SearchPageContent';

describe('SearchPageContent', () => {
  const mockContentIndex = {
    test: [
      {
        title: 'Test Title',
        description: 'Test Description',
        path: '/test',
        slug: 'test',
      },
    ],
  };
  const mockBreadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Posts', path: '/posts' },
    { name: 'Search Posts', path: '/posts/search/' },
  ];

  it('renders SearchPageContent: Posts', () => {
    render(
      <SearchPageContent
        contentIndex={mockContentIndex}
        breadcrumbItems={mockBreadcrumbItems}
        contentType="posts"
      />,
    );
    const element = screen.getByTestId('search-list-page-content');
    expect(element).toBeInTheDocument();
  });

  it('renders SearchPageContent: Projects', () => {
    render(
      <SearchPageContent
        contentIndex={mockContentIndex}
        breadcrumbItems={mockBreadcrumbItems}
        contentType="projects"
      />,
    );
    const element = screen.getByTestId('search-list-page-content');
    expect(element).toBeInTheDocument();
  });

  it('renders SearchPageContent: Invalid Type', () => {
    render(
      //@ts-ignore
      <SearchPageContent contentIndex={mockContentIndex} breadcrumbItems={mockBreadcrumbItems} />,
    );
    const element = screen.getByTestId('search-list-page-content');
    expect(element).toBeInTheDocument();
  });

  it('returns null when no contentIndex is present', () => {
    render(
      <SearchPageContent
        //@ts-ignore
        contentIndex={null}
        breadcrumbItems={mockBreadcrumbItems}
        contentType="posts"
      />,
    );
    const element = screen.queryByTestId('search-list-page-content');
    expect(element).not.toBeInTheDocument();
  });

  it('handles search input changes', () => {
    render(
      <SearchPageContent
        contentIndex={mockContentIndex}
        breadcrumbItems={mockBreadcrumbItems}
        contentType="posts"
      />,
    );
    const input = screen.getByTestId('search-input');
    const element1 = screen.queryByTestId('search-items');
    expect(element1).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'test' } });
    const element2 = screen.getByTestId('search-items');
    expect(element2).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'nothing' } });
    const element3 = screen.queryByTestId('search-items');
    expect(element3).not.toBeInTheDocument();
  });
});
