import { render, screen } from '@testing-library/react';
import SkillIcons from './SkillIcons';

describe('SkillIcons', () => {
  const mockSection = {
    slug: 'test',
    type: 'skill-icons',
    headline: '__YEARS__ years in the agency world, delivering projects and working with clients.',
    subhead: 'This is not my first rodeo.',
    content:
      'ReactJS\nNextJS\nTypescript\nRedux\nSCSS/SASS\nNodeJS\nmySQL\nPostGres\nMongoDB\nGraphQL\nPHP\nLaravel\niOS\nJest\nGitLab\nAWS\nAgile\nAdobe',
  };
  it('renders SkillIcons', () => {
    render(<SkillIcons section={mockSection} />);
    jest.useFakeTimers();
    jest.runAllTimers();
    const element = screen.getByTestId('skill-icons');
    expect(element).toBeInTheDocument();
  });
  it('renders SkillIcons with content', async () => {
    render(<SkillIcons section={mockSection} />);
    jest.useFakeTimers();
    jest.runAllTimers();
    const element = screen.getByTestId('skill-icons');
    expect(element).toBeInTheDocument();
    const skills = mockSection.content?.split('\n').filter((skill) => skill !== '');
    skills?.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });

    expect(await screen.findByTestId('skills-years', {}, { timeout: 500 })).toHaveTextContent('2');
  });
});
