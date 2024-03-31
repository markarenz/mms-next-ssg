import { join } from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { itemsPerPage } from '../constants';

export const getContentDirectoryByType = (type: string, subPath?: string) =>
  join(process.cwd(), `_content/${type}${subPath ? `/${subPath}` : ''}`);

export const getAllSlugsByType = (type: string): string[] => {
  const directory = getContentDirectoryByType(type);
  if (fs.existsSync(directory)) {
    return fs.readdirSync(directory).map((slug) => slug.replace('.md', ''));
  }
  return [];
};

export const getContentDetail = (type: string, slug: string, subPath?: string): any => {
  const directory = getContentDirectoryByType(type, subPath);
  if (fs.existsSync(directory)) {
    const fullPath = join(directory, `${slug}.md`);
    if (fs.existsSync(fullPath)) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return matter(fileContents);
    }
  }
  return null;
};

export const getMaxContentPagesByType = (type: string): number => {
  return Math.ceil(getAllSlugsByType(type).length / itemsPerPage);
};

export const getArrFromRange = (start: number, stop: number, step: number): number[] =>
  Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

export const cleanIndexText = (text: string): string => {
  return text
    .replace(/[.,/#!$%^&*;:?{}=\-_`~()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
};

export const getContentIndex = (contentType: string, getDetail: Function, mapSummary: Function) => {
  const slugs = getAllSlugsByType(contentType);
  const allContentDetail: any = {};
  const contentIndexRaw: { [key: string]: number } = {};
  slugs.forEach((slug) => {
    const item = getDetail(slug, true);
    allContentDetail[`${slug}`] = item;
    const words = cleanIndexText(`${item.title} - ${item.content}`)
      .split(' ')
      .filter((word) => word.length > 3);
    words.forEach((word) => {
      const key = `${word}__${slug}`;
      if (!contentIndexRaw[key]) {
        contentIndexRaw[key] = 1;
      } else {
        contentIndexRaw[key] += 1;
      }
    });
  });
  const contentIndex: { [key: string]: { slug: string; count: number }[] } = {};
  Object.keys(contentIndexRaw).forEach((key) => {
    const [word, slug] = key.split('__');
    const count = contentIndexRaw[key];
    if (!contentIndex[word]) {
      contentIndex[word] = [];
    }
    const summary = mapSummary(allContentDetail[slug]);
    contentIndex[word].push({ slug, count, ...summary });
  });
  const sortedContentIndex: any = {};
  Object.keys(contentIndex).forEach((key) => {
    sortedContentIndex[key] = contentIndex[key].sort((a, b) => {
      return b.count - a.count;
    });
  });

  // allContentDetail // mapSummary

  return sortedContentIndex;
};
