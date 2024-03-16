import React from 'react';
import styles from './Button.module.scss';

type Props = {
  label: string;
  onClick: Function;
  testId?: string;
};
const Button: React.FC<Props> = ({ label, onClick, testId }) => {
  return (
    <button
      data-testid={testId || 'button'}
      type="button"
      className={styles.root}
      onClick={() => onClick()}
    >
      <span>{label}</span>
    </button>
  );
};

export default Button;
