import React, { useRef, RefObject } from 'react';
import { render, screen } from '@testing-library/react';
import useOnScreen from './onScreen';

describe('useOnScreen', () => {
  it('renders the hook', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLElement>(null);
      const isOnScreen = useOnScreen(ref, true);
      return (
        <div data-testid="test" ref={ref as RefObject<HTMLDivElement>}>
          <div>{isOnScreen ? 'Yes' : 'No'}</div>
        </div>
      );
    };

    render(<TestComponent />);
    const element = screen.getByTestId('test');
    expect(element).toBeInTheDocument();
  });

  it('renders the hook', () => {
    const TestComponent = () => {
      const ref = useRef<HTMLElement>(null);
      const isOnScreen = useOnScreen(ref, false);
      return (
        <div data-testid="test" ref={ref as RefObject<HTMLDivElement>}>
          <div>{isOnScreen ? 'Yes' : 'No'}</div>
        </div>
      );
    };

    render(<TestComponent />);
    const element = screen.getByTestId('test');
    expect(element).toBeInTheDocument();
  });
});
