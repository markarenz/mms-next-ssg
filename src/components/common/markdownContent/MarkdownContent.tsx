import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

interface Props {
  content: string;
}

const MarkdownContent: React.FC<Props> = ({ content }) => {
  const contentParsed = marked.parse(content);
  const contentSanitized = DOMPurify.sanitize(`${contentParsed}`);
  return (
    <div
      data-testid="markdown-content"
      className="markdown"
      dangerouslySetInnerHTML={{ __html: contentSanitized }}
    />
  );
};

export default MarkdownContent;
