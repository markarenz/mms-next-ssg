'use client';

import { useEffect, useState, useMemo, RefObject } from 'react';

const useOnScreen = (ref: RefObject<Element>, isOneWay: boolean) => {
  const [isVisible, setIsVisible] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        const newValue = entry.isIntersecting;
        if (!isOneWay || (isOneWay && newValue)) {
          setIsVisible(newValue);
        }
      }),
    [isOneWay],
  );

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [observer, ref]);

  return isVisible;
};

export default useOnScreen;
