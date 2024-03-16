import { render, screen, fireEvent } from '@testing-library/react';
import Nav from './Nav';

describe('Nav', () => {
  it('renders the Nav component', () => {
    render(<Nav />);
    const navElement = screen.getByTestId('header-nav');
    expect(navElement).toBeInTheDocument();
  });

  it('handles menu open and close button clicks', () => {
    render(<Nav />);
    const navElement1 = screen.getByTestId('nav-menu');
    expect(navElement1.getAttribute('class')?.includes('active')).toBe(false);
    const menuToggleBtn = screen.getByTestId('nav-menu-toggle-btn');
    fireEvent.click(menuToggleBtn);

    const navElement2 = screen.getByTestId('nav-menu');
    expect(navElement2.getAttribute('class')?.includes('active')).toBe(true);

    const modalBgBtn = screen.getByTestId('nav-bg-pseudo-button');
    fireEvent.click(modalBgBtn);
    const navElement3 = screen.getByTestId('nav-menu');
    expect(navElement3.getAttribute('class')?.includes('active')).toBe(false);
  });

  it('implements focus trap while modal is open', () => {
    render(<Nav />);
    const menuToggleBtn = screen.getByTestId('nav-menu-toggle-btn');
    // Open nav
    fireEvent.click(menuToggleBtn);

    const link = screen.getByTestId('nav-menu-extra-link-resume');
    link.focus();
    // Open blur off of last item in nav, which should focus us on the first item, the menu toggle
    fireEvent.blur(link);
    expect(menuToggleBtn).toHaveFocus();
  });

  it('implements focus trap while modal is open', () => {
    render(<Nav />);
    const menuToggleBtn = screen.getByTestId('nav-menu-toggle-btn');
    fireEvent.click(menuToggleBtn);
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    const navElement = screen.getByTestId('nav-menu');
    expect(navElement.getAttribute('class')?.includes('active')).toBe(false);
  });

  it('handles scrolling', () => {
    render(<Nav />);
    fireEvent.scroll(window, { target: { scrollY: 101 } });
    const navElement = screen.getByTestId('header-nav');
    expect(navElement.getAttribute('class')?.includes('isScrolling')).toBe(false);
  });

  // scroll
  // ESC key
});

// describe('Nav', () => {
//   it('renders the Nav component', () => {
//     render(<Nav />);
//     const navElement = screen.getByTestId('header-nav');
//     expect(navElement).toBeInTheDocument();
//   });

//   it('toggles the menu when the menu button is clicked', () => {
//     render(<Nav />);
//     const menuButton = screen.getByTestId('nav-menu-toggle-btn');
//     fireEvent.click(menuButton);
//     const navMenu = screen.getByTestId('nav-menu');
//     expect(navMenu).toBeInTheDocument();
//     fireEvent.click(menuButton);
//     expect(navMenu).not.toBeInTheDocument();
//   });

//   it('closes the menu when the background pseudo button is clicked', () => {
//     render(<Nav />);
//     const menuButton = screen.getByTestId('nav-menu-toggle-btn');
//     fireEvent.click(menuButton);
//     const backgroundPseudoButton = screen.getByTestId('nav-bg-pseudo-button');
//     fireEvent.click(backgroundPseudoButton);
//     const navMenu = screen.getByTestId('nav-menu');
//     expect(navMenu).not.toBeInTheDocument();
//   });

//   it('closes the menu when the ESC key is pressed', () => {
//     render(<Nav />);
//     const menuButton = screen.getByTestId('nav-menu-toggle-btn');
//     fireEvent.click(menuButton);
//     fireEvent.keyDown(window, { key: 'Escape' });
//     const navMenu = screen.getByTestId('nav-menu');
//     expect(navMenu).not.toBeInTheDocument();
//   });

//   it('closes the menu when a menu item is clicked', () => {
//     render(<Nav />);
//     const menuButton = screen.getByTestId('nav-menu-toggle-btn');
//     fireEvent.click(menuButton);
//     const menuItem = screen.getByText('Menu Item');
//     fireEvent.click(menuItem);
//     const navMenu = screen.getByTestId('nav-menu');
//     expect(navMenu).not.toBeInTheDocument();
//   });

//   it('focuses on the menu button when the last external link loses focus', () => {
//     render(<Nav />);
//     const menuButton = screen.getByTestId('nav-menu-toggle-btn');
//     fireEvent.click(menuButton);
//     const lastExternalLink = screen.getByLabelText('External Link: Last Link');
//     fireEvent.blur(lastExternalLink);
//     expect(menuButton).toHaveFocus();
//   });
// });
