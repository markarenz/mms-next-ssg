import { render, screen, act } from '@testing-library/react';
import PageHeaderOrange from './PageHeaderOrange';

describe('PageHeaderOrange', () => {
  it('renders the PageHeaderOrange component', () => {
    const mockSection = {
      slug: 'test-slug',
      type: 'page-header-orange',
      image1: 'test.jpg',
      headline: 'Test Headline',
      subhead: 'Test Subhead',
    };
    render(<PageHeaderOrange section={mockSection} />);
    const pageHeaderOrangeElement = screen.getByTestId('page-header-orange');
    expect(pageHeaderOrangeElement).toBeInTheDocument();
  });

  it('renders the PageHeaderOrange component', async () => {
    const mockSection = {
      slug: 'test-slug',
      type: 'page-header-orange',
      image1: 'test.jpg',
      headline: 'Test Headline',
      subhead: 'Test Subhead',
    };
    jest.useFakeTimers();
    render(<PageHeaderOrange section={mockSection} />);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    const element = screen.getByTestId('page-header-headline');
    expect(element.getAttribute('class')).toContain('anim-in');
  });

  it('returns null if no image is provided', async () => {
    const mockSection = {
      slug: 'test-slug',
      type: 'page-header-orange',
      headline: 'Test Headline',
      subhead: 'Test Subhead',
    };
    jest.useFakeTimers();
    render(<PageHeaderOrange section={mockSection} />);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    const element = screen.queryByTestId('page-header-headline');
    expect(element).toBeNull();
  });
});
