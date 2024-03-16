import React from 'react';

type Props = {
  direction: string;
};

const IconTriangle: React.FC<Props> = ({ direction }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
      {direction === 'right' ? (
        <path d="M10 2v96l80-48z"></path>
      ) : (
        <path d="M90 2v96L10 50z"></path>
      )}
    </svg>
  );
};

export default IconTriangle;
