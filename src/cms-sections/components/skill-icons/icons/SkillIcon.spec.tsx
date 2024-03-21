import { render, screen } from '@testing-library/react';
import SkillIcon from './SkillIcon';

describe('SkillIcon', () => {
  it('renders SkillIcon', () => {
    render(<SkillIcon id="adobe" />);
    const element = screen.getByTestId('skill-icon');
    expect(element).toBeInTheDocument();
  });
  it('returns null when id is invalid', () => {
    render(<SkillIcon id="test" />);
    const element = screen.queryByTestId('skill-icon');
    expect(element).not.toBeInTheDocument();
  });
});
