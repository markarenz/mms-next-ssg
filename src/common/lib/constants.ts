import { ContentRoute } from '@/common/interfaces/app';

export const postsPerPage = 8;

export const CONTENT_TYPES = {
  POSTS: 'posts',
  PAGES: 'pages',
};

export const CONTENT_DEFAULTS = {
  TITLE: 'Mark Arenz - Mark Makes Stuff',
  IMAGE: '/mms-default.jpg',
  DATE_PUBLISHED: '2024-01-01',
  DESCRIPTION:
    'Mark Arenz, an experienced software engineer crafting digital experiences for users in a variety of industries.',
};

export const CONTENT_ROUTES: { [key: string]: ContentRoute } = {
  posts: {
    baseRoute: '/posts/',
    archiveRoute: '/posts/archive/',
  },
};

export const imageCdnBaseUrl = 'https://ik.imagekit.io/cfoxkhvjb/';

export const delayClasses = [
  'trans-delay-0',
  'trans-delay-0-25',
  'trans-delay-0-5',
  'trans-delay-0-75',
  'trans-delay-1',
  'trans-delay-1-25',
];

export const DEFAULT_IMAGES = {
  MAIN: '/mms-default.jpg',
  POSTS: '/pages/mms-page-headers-02.jpg',
};
