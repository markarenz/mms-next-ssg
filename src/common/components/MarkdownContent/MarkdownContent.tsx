import React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

interface Props {
  content: string;
  inline?: boolean;
}

const MarkdownContent: React.FC<Props> = ({ content, inline }) => {
  const renderer = new marked.Renderer();
  const linkRenderer = renderer.link;
  renderer.image = (href, title, text) => {
    return `<div class="imgWrap"><img src="${href}" alt="${text}" title="${title}" /></div>`;
  };
  renderer.link = (href, title, text) => {
    const isExternalLink = href.startsWith('http');
    const html = linkRenderer.call(renderer, href, title, text);
    return isExternalLink
      ? html.replace(/^<a /, `<a target="_blank" rel="noreferrer noopener nofollow" `)
      : html;
  };
  const contentParsed = inline
    ? marked.parseInline(content, { renderer })
    : marked.parse(content, { renderer });

  const contentSanitized = DOMPurify.sanitize(`${contentParsed}`, { ADD_ATTR: ['target'] });

  return (
    <div
      data-testid="markdown-content"
      className="markdown"
      dangerouslySetInnerHTML={{ __html: contentSanitized }}
    />
  );
};

export default MarkdownContent;
