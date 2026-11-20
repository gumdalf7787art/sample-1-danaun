'use client';

import {useState} from 'react';
import YouTubeThumbnail from '../../components/YouTubeThumbnail';

export default function ColumnVideo({id, title}) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="column-player">
      {playing ? (
        <iframe src={'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1'}
          title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
      ) : (
        <button type="button" className="column-video-play" onClick={() => setPlaying(true)}
          aria-label={title + ' 재생'}>
          <YouTubeThumbnail id={id} large/>
          <span aria-hidden="true">▶</span>
        </button>
      )}
    </div>
  );
}
