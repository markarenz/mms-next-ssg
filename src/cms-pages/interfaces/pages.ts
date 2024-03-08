export interface CmsSection {
  slug: string;
  type: string;
  headline?: string;
  subhead?: string;
  image1?: string;
  image2?: string;
  content?: string;
  buttonLabel?: string;
  buttonLink?: string;
  numItems?: number;
  align?: string;
}

export interface CmsPage {
  slug: string;
  title: string;
  image: string;
  datePublished: string;
  metaDescription: string;
  header: string;
  footer: string;
  sections: string[];
  cmsSectionHeader?: CmsSection;
  cmsSectionFooter?: CmsSection;
  cmsSectionContent?: CmsSection[];
}
