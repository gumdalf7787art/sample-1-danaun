'use client';

import {useMemo, useState} from 'react';
import YouTubeDialog from '../components/YouTubeDialog';
import {insightPostPath} from '../data/insight-post-path.mjs';

export default function ExerciseVideos({posts, initialSlug}) {
  const [active, setActive] = useState(initialSlug || null);
  const post = useMemo(() => {
    const selected = posts.find(item => item.slug === active);
    return selected && {id: selected.youtubeId, title: selected.title};
  }, [posts, active]);

  return <>
    <ul className="ins-card-grid" role="list">
      {posts.map(item => <li key={item.slug} className="ins-exercise-entry">
        <button className="ins-post-card ins-exercise-card" type="button"
          onClick={() => setActive(item.slug)} aria-haspopup="dialog" aria-label={item.title + ' 재생'}>
          <span className="yt-thumb">
            {item.cover?.src && <img src={item.cover.src} alt="" width="480" height="270" loading="lazy"/>}
            <span className="yt-play" aria-hidden="true">▷</span>
          </span>
          <span className="ins-exercise-copy">
            <strong>{item.title}</strong>
            <span>{item.summary}</span>
          </span>
        </button>
        <a className="ro-link ins-exercise-guide" href={insightPostPath(item)} aria-label={item.title + ' 운동 안내 읽기'}>
          운동 안내 읽기 <span aria-hidden="true">↗</span>
        </a>
      </li>)}
    </ul>
    <YouTubeDialog video={post} onClose={() => setActive(null)} label="홈운동 라이브러리"/>
  </>;
}
