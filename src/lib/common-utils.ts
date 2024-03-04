import { join } from 'path';
import { Post } from '@/interfaces/posts';
import fs from 'fs';
import matter from 'gray-matter';
import { postsPerPage, dummyPost } from './constants';

const getContentDirectoryByType = (type: string) => join(process.cwd(), `_content/${type}`);

export const getAllSlugsByType = (type: string): string[] => {
  const directory = getContentDirectoryByType(type);
  if (fs.existsSync(directory)) {
    return fs.readdirSync(directory).map((slug) => slug.replace('.md', ''));
  }
  return [];
};

// NOTE: Add content types to the output type as the app grows
export const getContentItemDetailByType = (type: string, slug: string): Post => {
  const directory = getContentDirectoryByType(type);
  if (fs.existsSync(directory)) {
    const fullPath = join(directory, `${slug}.md`);
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      // NOTE: this ONLY works for Posts
      // We can run if type === 'post' return...
      return {
        slug,
        title: data.title,
        datePublished: data.datePublished,
        metaDescription: data.metaDescription,
        excerpt: data.excerpt,
        content,
      };
    }
  }
  // NOTE: add more dummies as we proceed
  return dummyPost;
};

// NOTE: Add content types to the output type as the app grows
export const getContentItemsByType = (type: string, page: number): Post[] => {
  const slugs = getAllSlugsByType(type);
  const allPosts = slugs
    .map((slug) => getContentItemDetailByType(type, slug))
    .filter((item) => !!item?.datePublished)
    .sort((a, b) => (a.datePublished > b.datePublished ? -1 : 1));
  const start = page * postsPerPage;
  return allPosts.slice(start, start + postsPerPage);
};

export const getMaxContentPagesByType = (type: string): number => {
  return Math.ceil(getAllSlugsByType(type).length / postsPerPage) - 1;
};

export const getArrFromRange = (start: number, stop: number, step: number): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);
