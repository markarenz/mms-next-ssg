import React from 'react';
import Link from 'next/link';
import styles from '../Button/Button.module.scss';

type Props = {
  label: string;
  href: string;
  testId?: string;
};
const ButtonLink: React.FC<Props> = ({ label, href, testId }) => {
  const isInternal = `${href}`[0] === '/';
  return isInternal ? (
    <Link href={href} className={styles.root} data-testid={testId}>
      <span>{label}</span>
    </Link>
  ) : (
    <a
      href={href}
      className={styles.root}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={testId}
    >
      <span>{label}</span>
    </a>
  );
};

export default ButtonLink;
