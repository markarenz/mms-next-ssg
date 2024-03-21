import React from 'react';
import { skillIconsSvgContent } from './skillIconsSvgContent';
type Props = {
  id: string;
};
const SkillIcon: React.FC<Props> = ({ id }) => {
  if (!id || !skillIconsSvgContent[id]) {
    return null;
  }

  return (
    <svg
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="skill-icon"
    >
      <path
        data-name="badge-ring"
        fill="#fff"
        d="M 50.000049,0.99993896 A 49,49 0 0 0 0.99993896,50.000049 49,49 0 0 0 50.000049,99.000159 49,49 0 0 0 99.000159,50.000049 49,49 0 0 0 50.000049,0.99993896 Z m 0,5.00021164 A 44,44 0 0 1 93.999947,50.000049 44,44 0 0 1 50.000049,93.999947 44,44 0 0 1 6.0001506,50.000049 44,44 0 0 1 50.000049,6.0001506 Z"
      />
      {skillIconsSvgContent[id]}
    </svg>
  );
};

export default SkillIcon;
