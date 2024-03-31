import { render, screen } from '@testing-library/react';
import BreadcrumbSection from './BreadcrumbSection';

describe('BreadcrumbSection', () => {
  const mockSection = {
    slug: 'test',
    type: 'breadcrumb-section',
    variant: 'default',
    breadcrumbs: [
      {
        name: 'Home',
        path: '/',
      },
      {
        name: 'About',
        path: '/about',
      },
      {
        name: 'Contact',
        path: '/contact',
      },
    ],
  };
  it('renders BreadcrumbSection', () => {
    render(<BreadcrumbSection section={mockSection} />);
    jest.useFakeTimers();
    jest.runAllTimers();
    const element = screen.getByTestId('breadcrumb-section');
    expect(element).toBeInTheDocument();
  });
  it('renders BreadcrumbSection with content', async () => {
    render(<BreadcrumbSection section={mockSection} />);
    jest.useFakeTimers();
    jest.runAllTimers();
    const element = screen.getByTestId('breadcrumb-section');
    expect(element).toBeInTheDocument();
    mockSection.breadcrumbs?.forEach((breadcrumb) => {
      expect(screen.getByText(breadcrumb.name)).toBeInTheDocument();
    });
  });

  it('returns null when section values are missing', () => {
    render(
      <BreadcrumbSection
        section={{
          ...mockSection,
          //@ts-ignore
          breadcrumbs: null,
        }}
      />,
    );
    jest.useFakeTimers();
    jest.runAllTimers();
    const element = screen.queryByTestId('breadcrumb-section');
    expect(element).not.toBeInTheDocument();
  });

  it('uses defaults when values are invalid', () => {
    render(
      <BreadcrumbSection
        section={{
          ...mockSection,
          //@ts-ignore
          variant: 'test',
        }}
      />,
    );
    jest.useFakeTimers();
    jest.runAllTimers();
    const element = screen.queryByTestId('breadcrumb-section');
    expect(element).toBeInTheDocument();
    expect(element?.classList).toContain('default');
  });
});
