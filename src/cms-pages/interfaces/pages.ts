import { BreadCrumbItem } from '@/common/interfaces/app';

export interface CmsSection {
  slug: string;
  type: string;
  variant?: string;
  headline?: string;
  subhead?: string;
  image1?: string;
  image2?: string;
  content?: string;
  buttonLabel?: string;
  buttonLink?: string;
  numItems?: number;
  align?: string;
  text1?: string;
  text2?: string;
  breadcrumbs?: BreadCrumbItem[];
}

export interface CmsPage {
  slug: string;
  title: string;
  image: string;
  datePublished: string;
  metaDescription: string;
  header: string;
  sections: string[];
  cmsSectionHeader?: CmsSection;
  cmsSectionFooter?: CmsSection;
  cmsSectionContent?: CmsSection[];
}
