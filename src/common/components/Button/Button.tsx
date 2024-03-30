import React from 'react';
import styles from './Button.module.scss';

type Props = {
  label: string;
  onClick: Function;
  testId?: string;
  variant?: string;
};
const variants = ['default', 'dark'];

const Button: React.FC<Props> = ({ label, onClick, testId, variant }) => {
  const variantClass = variant && variants.includes(variant) ? styles[variant] : styles.default;
  console.log('variantClass', variantClass);
  return (
    <button
      data-testid={testId || 'button'}
      type="button"
      className={`${styles.root} ${variantClass}`}
      onClick={() => onClick()}
    >
      <span>{label}</span>
    </button>
  );
};

export default Button;
