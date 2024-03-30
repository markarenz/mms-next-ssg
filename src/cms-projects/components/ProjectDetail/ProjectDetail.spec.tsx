import { render, screen, fireEvent } from '@testing-library/react';
import ProjectDetail from './ProjectDetail';
import { mockProject } from '@/cms-projects/lib/mocks/mockProject';

describe('PostDetail', () => {
  it('renders component', () => {
    render(<ProjectDetail project={mockProject} />);
    const element = screen.getByTestId('page-project-detail');
    expect(element).toBeInTheDocument();
  });

  it('handles lightbox open, navigation and close', () => {
    render(<ProjectDetail project={mockProject} />);
    const image0 = screen.getByTestId('image-link-0');
    fireEvent.click(image0);
    // should open lightbox
    const lightbox = screen.getByTestId('lightbox');
    expect(lightbox.classList.contains('active')).toBe(true);

    const images = screen.queryAllByTestId('cms-image');
    const lighthouseImage = images[images.length - 1];
    expect(lighthouseImage.getAttribute('alt')).toEqual(`${mockProject.title} Image 1`);

    const btnNext = screen.getByTestId('lightbox-btn-next');
    fireEvent.click(btnNext);
    const lighthouseImage2 = images[images.length - 1];
    expect(lighthouseImage2.getAttribute('alt')).toEqual(`${mockProject.title} Image 2`);

    const btnPrev = screen.getByTestId('lightbox-btn-prev');
    fireEvent.click(btnPrev);
    const lighthouseImage3 = images[images.length - 1];
    expect(lighthouseImage3.getAttribute('alt')).toEqual(`${mockProject.title} Image 1`);

    fireEvent.click(btnPrev);
    fireEvent.click(btnPrev);
    fireEvent.click(btnNext);
    fireEvent.click(btnNext);

    const btnClose = screen.getByTestId('lightbox-btn-close');
    fireEvent.click(btnClose);
    const lightbox2 = screen.getByTestId('lightbox');
    expect(lightbox2.classList.contains('active')).toBe(false);
  });

  it('returns null when required fields are not present', () => {
    //@ts-ignore
    render(<ProjectDetail project={{ ...mockProject, content: null }} />);
    const element = screen.queryByTestId('page-project-detail');
    expect(element).not.toBeInTheDocument();
  });
});
