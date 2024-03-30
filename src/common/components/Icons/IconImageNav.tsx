import React from 'react';

type Props = {
  direction: number; // + = right, - = left
};

const IconImageNav: React.FC<Props> = ({ direction }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
      <g fill="#fff">
        <path d="M50 1A49 49 0 001 50a49 49 0 0049 49 49 49 0 0049-49A49 49 0 0050 1zm0 7a42 42 0 0142 42 42 42 0 01-42 42A42 42 0 018 50 42 42 0 0150 8z"></path>
        {direction < 0 ? (
          <path d="M59.88 15.057l5.657 5.657L36.251 50l29.286 29.286-5.656 5.657-29.286-29.286L24.938 50l5.657-5.657z"></path>
        ) : (
          <path d="M39.59 15.057l-5.656 5.657L63.219 50 33.934 79.286l5.656 5.657 29.286-29.286L74.533 50l-5.657-5.657z"></path>
        )}
      </g>
    </svg>
  );
};

export default IconImageNav;
