import { render, screen } from '@testing-library/react';
import ContentListItem from './ContentListItem';

describe('ContentListItem', () => {
  it('renders component', () => {
    render(
      <ContentListItem
        summary={{
          type: 'post',
          slug: 'test-slug',
          title: 'Title',
          image: '/posts/2.jpeg',
          href: '/test',
        }}
      />,
    );
    const element = screen.getByTestId('content-list-item');
    expect(element).toBeInTheDocument();
  });
});
