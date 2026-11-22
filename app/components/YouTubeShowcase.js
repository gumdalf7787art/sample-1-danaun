'use client';
import {useState} from 'react';
import dynamic from 'next/dynamic';
const YouTubeDialog = dynamic(() => import('./YouTubeDialog'), {ssr:false});
import YouTubeThumbnail from './YouTubeThumbnail';
import {CHANNEL_URL, DOCTOR_TV_ARCHIVE_SIZE} from '../../lib/youtube-feed.mjs';

export default function YouTubeShowcase({feed = {videos: []}, archive = false, expanded = false, showArchiveLink = true}) {
  const [selected, setSelected] = useState(null);
  const [latest, ...recent] = (feed.videos || []).filter(video => !video.short).slice(0, expanded ? DOCTOR_TV_ARCHIVE_SIZE : 5);

  function card(video, featured = false) {
    return (
      <button className={'yt-card ' + (featured ? 'yt-feature' : 'yt-small')} key={video.id}
        onClick={() => setSelected(video)} aria-label={video.title + ' 영상 재생'}>
        <span className="yt-thumb">
          <YouTubeThumbnail id={video.id} large={featured}/>
          <span className="yt-play" aria-hidden="true">▷</span>
        </span>
        {archive && <span className="ins-tv-card-title">{video.title} <small>{video.duration}</small></span>}
      </button>
    );
  }

  return (
    <section className={'home-tv youtube-showcase' + (expanded ? ' yt-expanded' : '')} id="doctor-tv"
      data-feed-checked-at={feed.checkedAt}
      aria-labelledby={archive ? undefined : 'home-tv-title'} aria-label={archive ? '외부 건강 영상 영상' : undefined}>
      <div className="section">
        {!archive && <div className="section-top home-media-heading">
          <div><p className="eyebrow">WATCH & UNDERSTAND</p><h2 id="home-tv-title">외부 건강 영상</h2></div>
          <p className="section-intro">외부 채널 닥터고은 TV에서 공개한 건강 영상입니다.</p>
        </div>}
        {latest ? <div className="yt-gallery">
          {expanded ? <div className="yt-featured-video">
            <h2>최신 영상</h2>
            {card(latest, true)}
          </div> : card(latest, true)}
          {recent.length > 0 && <div className="yt-recent">{recent.map(video => card(video))}</div>}
        </div> : <p className="yt-status">영상을 불러오지 못했습니다. 유튜브 채널에서 확인해 주세요.</p>}
        <div className="yt-footer">
          {!archive && showArchiveLink && <a href="/insights/tv" className="underline-link">외부 건강 영상 모아보기 <span aria-hidden="true">↗</span></a>}
          <a href={CHANNEL_URL + '/videos'} target="_blank" rel="noopener noreferrer" className="underline-link yt-channel-link">
            더 많은 영상 보기 <span aria-hidden="true">↗</span>
          </a>
          <p>영상은 일반적인 건강 정보이며 개인의 진단과 치료를 대신하지 않습니다.</p>
        </div>
      </div>
      {selected && <YouTubeDialog video={selected} onClose={() => setSelected(null)}/>}
    </section>
  );
}
