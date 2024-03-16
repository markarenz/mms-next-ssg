'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Button from '@/common/components/Button/Button';
import IconWhiteLinkedIn from '@/common/components/Icons/IconWhiteLinkedIn';
import IconWhiteYouTube from '@/common/components/Icons/IconWhiteYouTube';
import MMSLogoText from '@/common/components/MMSLogoText/MMSLogoText';
import { footerData } from './footerData';
import styles from './Footer.module.scss';

const Footer = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    setIsFormSubmitted(true);
    formRef.current?.submit();
  };

  return (
    <footer className={styles.footer} data-testid="footer-default">
      <div className={styles.topSpikes}></div>
      <div className="container">
        <div className={styles.footerContentWrap}>
          <div className={styles.gridWrap}>
            <div>
              <Link href="/">
                <div className={styles.footerLogo}>
                  <MMSLogoText />
                </div>
              </Link>
            </div>
            <div>
              <h2 className={styles.title}>Mark Arenz</h2>
              <div>
                <a className={styles.contactLink} href="tel:+13174420631">
                  {footerData.phone}
                </a>
              </div>
              <div>
                <a className={styles.contactLink} href="mailto:arenz.mark@gmail.com">
                  {footerData.email}
                </a>
              </div>
              <div className={styles.socialLinks}>
                <div className="hover-zoom">
                  <a
                    href={footerData.linkLinkedIn}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.footerSocialLink}
                  >
                    <IconWhiteLinkedIn />
                  </a>
                </div>
                <div className="hover-zoom">
                  <a
                    href={footerData.linkYouTube}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.footerSocialLink}
                  >
                    <IconWhiteYouTube />
                  </a>
                </div>
              </div>
            </div>
            <div>
              <form
                action="https://formspree.io/f/mpzkbrvv"
                method="POST"
                ref={formRef}
                data-form=""
                id="footer-contact"
                data-testid="footer-contact"
                className={`${styles.footerContactForm} ${isFormSubmitted ? styles.submitted : ''}`}
              >
                <input type="hidden" name="_next" value="/contact-thank-you" />
                <div>
                  <input
                    type="text"
                    name="name"
                    data-validate-name=""
                    className="form-control my-1"
                    placeholder="Name"
                    aria-label="Name"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    data-validate-email=""
                    placeholder="Email"
                    aria-label="Email"
                    required
                  />
                </div>
                <div className={styles.submitWrap}>
                  <Button testId="footer-contact-submit" onClick={handleSubmit} label="Send" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyrightRow}>
        <div className="container">
          <small>
            &copy;{new Date().getFullYear()} {footerData.copyright}
          </small>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
