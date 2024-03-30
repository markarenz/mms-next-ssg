import React from 'react';
import Link from 'next/link';
import styles from '../Button/Button.module.scss';

type Props = {
  label: string;
  href: string;
  testId?: string;
  variant?: string;
};
const variants = ['default', 'dark'];

const ButtonLink: React.FC<Props> = ({ label, href, testId, variant }) => {
  const variantClass = variant && variants.includes(variant) ? styles[variant] : styles.default;
  const isInternal = `${href}`[0] === '/';
  return isInternal ? (
    <Link href={href} className={`${styles.root} ${variantClass}`} data-testid={testId}>
      <span>{label}</span>
    </Link>
  ) : (
    <a
      href={href}
      className={`${styles.root} ${variantClass}`}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
    >
      <span>{label}</span>
    </a>
  );
};

export default ButtonLink;
