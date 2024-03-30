export interface CmsProject {
  slug: string;
  title: string;
  image: string;
  datePublished: string;
  metaDescription: string;
  link?: string;
  images?: string[];
  content: string;
}
