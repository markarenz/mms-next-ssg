import { Metadata } from 'next';
import { ContentRoute } from '@/common/interfaces/app';

export const itemsPerPage = 12;

export const CONTENT_TYPES = Object.freeze({
  POSTS: 'posts',
  PAGES: 'pages',
  PROJECTS: 'projects',
});

export const CONTENT_DEFAULTS = Object.freeze({
  TITLE: 'Mark Arenz - Mark Makes Stuff',
  IMAGE: '/mms-default.jpg',
  DATE_PUBLISHED: '2024-01-01',
  DESCRIPTION:
    'Mark Arenz, an experienced software engineer crafting digital experiences for users in a variety of industries.',
});

export const CONTENT_ROUTES: { [key: string]: ContentRoute } = {
  posts: {
    baseRoute: '/posts/',
    archiveRoute: '/posts/archive/',
  },
  projects: {
    baseRoute: '/projects/',
    archiveRoute: '/projects/archive/',
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

export const DEFAULT_IMAGES = Object.freeze({
  MAIN: '/mms-default.jpg',
  POSTS: '/pages/mms-page-headers-02.jpg',
  PROJECTS: '/pages/mms-page-headers-02.jpg',
});

const defaultImg = `${imageCdnBaseUrl}tr:f-webp,q-75/pages/mms-logo-512.png`;

export const DEFAULT_METADATA: Metadata = Object.freeze({
  title: 'Mark Arenz - Mark Makes Stuff',
  description:
    'Mark Arenz, an experienced software engineer crafting digital experiences for users in a variety of industries.',
  openGraph: {
    locale: 'en_US',
    type: 'website',
    title: 'Mark Arenz - Mark Makes Stuff',
    siteName: 'Mark Makes Stuff',
    description:
      'Mark Arenz, an experienced software engineer crafting digital experiences for users in a variety of industries.',
    image: '/mms-default.jpg',
    images: [
      {
        url: defaultImg,
        width: 800,
        height: 600,
        alt: 'Mark Makes Stuff',
      },
    ],
  },
});
