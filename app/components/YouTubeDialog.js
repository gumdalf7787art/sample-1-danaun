'use client';

import {useEffect, useId, useRef} from 'react';

export default function YouTubeDialog({video, onClose, label = 'DOCTOR GOEUN TV'}) {
  const dialog = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (!video) return;
    const modal = dialog.current;
    const focus = document.activeElement;
    const overflow = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      modal.close();
      document.body.style.overflow = overflow;
      focus?.focus();
    };
  }, [video]);

  return <dialog className={'yt-modal' + (video?.short ? ' yt-modal-short' : '')}
    ref={dialog} aria-labelledby={titleId}
    onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => {
      if (event.target !== dialog.current) return;
      const bounds = dialog.current.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
    }}>
    <div className="yt-modal-header">
      <span>{label}</span><button type="button" onClick={onClose} aria-label="영상 닫기" autoFocus>닫기 ×</button>
    </div>
    {video && <>
      <div className="yt-player">
        <iframe src={'https://www.youtube-nocookie.com/embed/' + video.id + '?autoplay=1&playsinline=1&rel=0'}
          title={video.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>
      </div>
      <h2 id={titleId}>{video.title}</h2>
      <a className="yt-external" href={'https://www.youtube.com/watch?v=' + video.id}
        target="_blank" rel="noopener noreferrer">유튜브에서 보기 ↗</a>
    </>}
  </dialog>;
}
