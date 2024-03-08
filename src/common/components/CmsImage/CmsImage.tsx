import React from 'react';
import { getImageCdnUrl } from '@/common/lib/image-utils/image-utils';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  style?: any;
  isLazyLoading?: boolean;
};

const CmsImage: React.FC<Props> = ({ src, alt, width, height, style, isLazyLoading = true }) => {
  const imageCdnUrl = getImageCdnUrl(src, width, height);

  return (
    <img
      data-testid="cms-image"
      src={imageCdnUrl}
      alt={alt}
      loading={isLazyLoading ? 'lazy' : 'eager'}
      {...(style ? { style } : {})}
    />
  );
};
export default CmsImage;
