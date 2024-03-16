import { render, screen } from '@testing-library/react';
import CmsPage, { generateMetadata, generateStaticParams } from './page';

describe('CmsPage', () => {
  it('renders mock CMS page', () => {
    render(<CmsPage params={{ slug: 'home' }} />);
    const element = screen.getByTestId('page-home');
    expect(element).toBeInTheDocument();
  });
});

describe('generateMetadata', () => {
  it('returns metadata for page by slug', async () => {
    const result = await generateMetadata({ params: { slug: 'home' } });
    expect(result.title).toBeTruthy();
  });
});

describe('generateStaticParams', () => {
  it('returns an object of slugs', async () => {
    const result = await generateStaticParams();
    expect(result.length).toBeGreaterThan(0);
  });
});
