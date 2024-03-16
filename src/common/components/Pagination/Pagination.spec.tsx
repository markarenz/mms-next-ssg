import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';
import { CONTENT_TYPES } from '@/common/lib/constants';

describe('Pagination', () => {
  it('renders component', () => {
    render(<Pagination pageNum={2} maxPages={20} contentType={CONTENT_TYPES.POSTS} />);
    const element = screen.getByTestId('pagination');
    expect(element).toBeInTheDocument();
  });

  it('renders component with previous button', () => {
    render(<Pagination pageNum={1} maxPages={5} contentType={CONTENT_TYPES.POSTS} />);
    const element = screen.getByTestId('pagination');
    expect(element).toBeInTheDocument();
    const prev = screen.queryByTestId('pagination-prev-link');
    expect(prev).toBeInTheDocument();
    const next = screen.queryByTestId('pagination-next-link');
    expect(next).toBeInTheDocument();
  });

  it('renders component with no previous button', () => {
    render(<Pagination pageNum={0} maxPages={5} contentType={CONTENT_TYPES.POSTS} />);
    const element = screen.getByTestId('pagination');
    expect(element).toBeInTheDocument();
    const prev = screen.queryByTestId('pagination-prev-link');
    expect(prev).not.toBeInTheDocument();
    const next = screen.queryByTestId('pagination-next-link');
    expect(next).toBeInTheDocument();
  });

  it('renders component with no next button', () => {
    render(<Pagination pageNum={5} maxPages={5} contentType={CONTENT_TYPES.POSTS} />);
    const element = screen.getByTestId('pagination');
    expect(element).toBeInTheDocument();
    const prev = screen.queryByTestId('pagination-prev-link');
    expect(prev).toBeInTheDocument();
    const next = screen.queryByTestId('pagination-next-link');
    expect(next).not.toBeInTheDocument();
  });
});
