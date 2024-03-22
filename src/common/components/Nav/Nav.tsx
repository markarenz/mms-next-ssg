'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import MMSLogo from '@/common/components/MMSLogo/MMSLogo';
import { navMenuItems, navMenuExtras } from '@/common/menus/lib/menuData';
import { delayClasses } from '@/common/lib/constants';
import IconGitHub from '@/common/components/Icons/IconGitHub';
import IconLinkedIn from '@/common/components/Icons/IconLinkedIn';
import IconPdf from '@/common/components/Icons/IconPdf';
import styles from './Nav.module.scss';

const Nav = () => {
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    let lastIsScrolling = false;
    const handleScroll = () => {
      const newIsScrolling = window.scrollY > 100;
      if (newIsScrolling !== lastIsScrolling) {
        setIsScrolling(newIsScrolling);
      }
      lastIsScrolling = newIsScrolling;
    };

    const handleEscListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleEscListener);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleEscListener);
    };
  }, []);

  const extLinkIcons: { [key: string]: React.JSX.Element } = {
    linkedin: <IconLinkedIn />,
    github: <IconGitHub />,
    resume: <IconPdf />,
  };

  return (
    <header
      data-testid="header-nav"
      className={`${styles.header} ${isScrolling ? styles.scrolling : ''}`}
    >
      <Link href="/" aria-label="MMS Home" className={styles.logo}>
        <MMSLogo />
      </Link>
      <button
        type="button"
        data-testid="nav-menu-toggle-btn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`${styles.menuBtn} ${isMenuOpen ? styles.active : ''}`}
        aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
        ref={menuBtnRef}
      >
        <span className={styles.bar1}></span>
        <span className={styles.bar2}></span>
        <span className={styles.bar3}></span>
        <span className={styles.bar4}></span>
        <span className={styles.bar5}></span>
        <span className={styles.bar6}></span>
      </button>
      <nav data-testid="nav-menu" className={`${styles.nav} ${isMenuOpen ? styles.active : ''}`}>
        <div
          id="nav-bg-pseudo-button"
          data-testid="nav-bg-pseudo-button"
          className={styles.navBg}
          tab-index="-1"
          aria-hidden="true"
          onClick={() => closeMenu()}
        />
        <ul>
          {navMenuItems.map((item, idx) => (
            <li key={item.label}>
              <div
                className={`anim-me anim-from-${
                  idx % 2 === 0 ? 'left' : 'right'
                } trans-delay-0-10 ${isMenuOpen ? 'anim-in' : ''}`}
              >
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={styles.link}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <div className="hover-zoom">{item.label}</div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.navMenuExtrasWrap}>
          {navMenuExtras.map((link, idx) => (
            <div
              key={link.label}
              className={`${styles.extraIconLink} anim-me anim-from-below ${
                isMenuOpen ? 'anim-in' : ''
              } ${delayClasses[idx + 1]}`}
            >
              <a
                href={link.href}
                data-testid={`nav-menu-extra-link-${link.label}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`External Link: ${link.label}`}
                className="hover-zoom focus-round"
                tabIndex={isMenuOpen ? 0 : -1}
                onBlur={() => {
                  if (idx === navMenuExtras.length - 1) {
                    if (menuBtnRef?.current) {
                      menuBtnRef?.current.focus();
                    }
                  }
                }}
              >
                {extLinkIcons[link.label]}
              </a>
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
