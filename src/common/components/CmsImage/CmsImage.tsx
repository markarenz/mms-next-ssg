import React from 'react';
import { getImageCdnUrl } from '@/common/lib/image-utils/image-utils';
import styles from './CmsImage.module.scss';

type Props = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  style?: any;
  isLazyLoading?: boolean;
  isBgImage?: boolean;
  isShaded?: boolean;
  focalPoint?: string;
  className?: string;
};

const CmsImage: React.FC<Props> = ({
  src,
  alt = 'Image',
  width,
  height,
  style,
  className,
  isLazyLoading = true,
  focalPoint = 'center center',
  isBgImage = false,
  isShaded = false,
}) => {
  const imageCdnUrl = getImageCdnUrl(src, width, height);
  // TODO: Disallow ImageKit 3rd party cookies

  return isBgImage ? (
    <div
      data-testid="cms-bg-image"
      className={`${styles.root} ${className ? className : ''} ${isShaded ? styles.shaded : ''}`}
      style={{
        backgroundImage: `url(${imageCdnUrl})`,
        backgroundPosition: focalPoint,
        ...(style ? style : {}),
      }}
    />
  ) : (
    <img
      data-testid="cms-image"
      src={imageCdnUrl}
      className={`responsive ${className ? className : ''}`}
      alt={alt}
      loading={isLazyLoading ? 'lazy' : 'eager'}
      {...(style ? { style } : {})}
    />
  );
};
export default CmsImage;
