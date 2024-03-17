import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

interface Props {
  content: string;
  inline?: boolean;
}

const MarkdownContent: React.FC<Props> = ({ content, inline }) => {
  const contentParsed = marked.parse(content);
  const contentSanitized = DOMPurify.sanitize(`${contentParsed}`);
  return (
    <div
      data-testid="markdown-content"
      className={`markdown ${inline ? 'inline' : ''}`}
      dangerouslySetInnerHTML={{ __html: contentSanitized }}
    />
  );
};

export default MarkdownContent;
