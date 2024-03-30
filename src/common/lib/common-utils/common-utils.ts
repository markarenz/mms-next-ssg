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
