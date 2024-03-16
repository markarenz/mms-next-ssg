import { render, screen } from '@testing-library/react';
import CmsImage from './CmsImage';

describe('CmsImage', () => {
  it('renders a standard image with CDN URL', () => {
    render(
      <CmsImage src="default-image.jpg" alt="Image Alt" width={300} style={{ paddingTop: 10 }} />,
    );
    const element = screen.getByTestId('cms-image');
    expect(element).toBeInTheDocument();
  });

  it('renders a standard image with CDN URL with no lazy loading', () => {
    render(<CmsImage src="default-image.jpg" alt="Image Alt" width={300} isLazyLoading={false} />);
    const element = screen.getByTestId('cms-image');
    expect(element.getAttribute('loading')).toEqual('eager');
  });
});
