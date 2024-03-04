import { Post } from '@/interfaces/posts';
import { ContentRoute } from '@/interfaces/app';

export const postsPerPage = 3;

export const dummyPost: Post = {
  title: '',
  slug: '',
  metaDescription: '',
  datePublished: '',
  content: '',
  excerpt: '',
};

export const CONTENT_TYPES = {
  POSTS: 'posts',
};

export const CONTENT_ROUTES: { [key: string]: ContentRoute } = {
  posts: {
    baseRoute: '/posts/',
    archiveRoute: '/posts/archive/',
  },
};
