import { imageCdnBaseUrl } from '@/lib/constants';

export const getImageCdnUrl = (src: string, width?: number, height?: number): string => {
  const transform = ['f-webp'];
  if (!!width) {
    transform.push(`w-${width}`);
  }
  if (!!height) {
    transform.push(`h-${height}`);
  }
  return `${imageCdnBaseUrl}tr:${transform.join(',')}/${src}`;
};
