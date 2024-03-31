import { render, screen, act } from '@testing-library/react';
import PageHeader from './PageHeader';

describe('PageHeader', () => {
  it('renders the PageHeader component', () => {
    const mockSection = {
      slug: 'header-home',
      type: 'page-header',
      image1: 'test.jpg',
      headline: 'Test Headline',
      subhead: 'Test Subhead',
    };
    render(<PageHeader section={mockSection} />);
    const pageHeaderOrangeElement = screen.getByTestId('page-header');
    expect(pageHeaderOrangeElement).toBeInTheDocument();
  });

  it('renders the PageHeader component', async () => {
    const mockSection = {
      slug: 'header-home',
      type: 'page-header',
      image1: 'test.jpg',
      headline: 'Test Headline',
      subhead: 'Test Subhead',
    };
    jest.useFakeTimers();
    render(<PageHeader section={mockSection} />);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    const element = screen.getByTestId('page-header-headline');
    expect(element.getAttribute('class')).toContain('anim-in');
  });

  it('returns null if no image is provided', async () => {
    const mockSection = {
      slug: 'test-slug',
      type: 'page-header',
      headline: 'Test Headline',
      subhead: 'Test Subhead',
    };
    jest.useFakeTimers();
    render(<PageHeader section={mockSection} />);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    const element = screen.queryByTestId('page-header-headline');
    expect(element).toBeNull();
  });
});
