import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders component', () => {
    render(<Button label="Test" onClick={() => {}} />);
    const buttonElement = screen.getByText('Test');
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders variant', () => {
    render(<Button label="Test" variant="dark" onClick={() => {}} />);
    const buttonElement = screen.getByTestId('button');
    expect(buttonElement.classList).toContain('dark');
  });

  it('handles click', () => {
    const onClick = jest.fn();
    render(<Button label="Test" onClick={onClick} />);
    const buttonElement = screen.getByText('Test');
    buttonElement.click();
    expect(onClick).toHaveBeenCalled();
  });
});
