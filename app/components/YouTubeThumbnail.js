'use client';

import {youtubeThumbnailUrl} from '../../lib/youtube-feed.mjs';

export default function YouTubeThumbnail({id, large = false}) {
  const src = youtubeThumbnailUrl(id, large);
  if (!src) return null;

  return <img src={src} alt="" width="1280" height="720" loading="lazy" decoding="async"
    onError={large ? event => {
      const image = event.currentTarget;
      const fallback = youtubeThumbnailUrl(id);
      if (image.src !== fallback) image.src = fallback;
    } : undefined}/>;
}
