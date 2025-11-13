import React from 'react';
import OriginalIdealImage from '@theme-original/IdealImage';
import type {ComponentProps} from 'react';

type OriginalProps = ComponentProps<typeof OriginalIdealImage>;

type Priority = 'hero' | 'high';

type IdealImageProps = OriginalProps & {
  priority?: Priority;
  webpSrc?: string;
};

type ProcessedImage = {
  src?: {
    src?: string;
    srcSet?: string;
    width?: number;
    height?: number;
  };
  preSrc?: string;
};

function isProcessedImage(value: unknown): value is ProcessedImage {
  return (
    typeof value === 'object' &&
    value !== null &&
    'src' in value &&
    typeof (value as ProcessedImage).src === 'object'
  );
}

export default function IdealImage(props: IdealImageProps): React.ReactElement {
  const {priority, webpSrc, img, className, style, sizes, alt, ...rest} = props;
  const isHero = priority === 'hero';

  if (!isHero || !isProcessedImage(img)) {
    return (
      <OriginalIdealImage
        img={img as OriginalProps['img']}
        className={className}
        style={style}
        sizes={sizes}
        alt={alt}
        {...rest}
      />
    );
  }

  const processed = img.src;
  if (!processed) {
    return (
      <OriginalIdealImage
        img={img as OriginalProps['img']}
        className={className}
        style={style}
        sizes={sizes}
        alt={alt}
        {...rest}
      />
    );
  }
  const fallbackSrc =
    processed.src ?? (typeof img === 'string' ? img : undefined);
  if (!fallbackSrc) {
    return (
      <OriginalIdealImage
        img={img as OriginalProps['img']}
        className={className}
        style={style}
        sizes={sizes}
        alt={alt}
        {...rest}
      />
    );
  }

  const resolvedSizes = sizes ?? '(max-width: 768px) 100vw, 720px';
  const width = processed.width;
  const height = processed.height;

  return (
    <picture className={className} style={style}>
      {webpSrc ? <source srcSet={webpSrc} type="image/webp" /> : null}
      {processed.srcSet ? <source srcSet={processed.srcSet} /> : null}
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        sizes={resolvedSizes}
        {...rest}
      />
    </picture>
  );
}
