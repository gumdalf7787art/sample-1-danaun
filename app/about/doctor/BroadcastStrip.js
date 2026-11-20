'use client';

import {useRef, useState} from 'react';
import {broadcasts} from './broadcasts';
import {broadcastDetails} from './broadcast-details';

const archiveUrl = 'https://www.resetclinic.co.kr/myboard/myboard3';

function cover({id}) {
  return broadcastDetails[id]?.frames[0] ?? `/images/doctor-broadcast/${id}.webp`;
}

export default function BroadcastStrip({archive = false} = {}) {
  const dialog = useRef(null);
  const opener = useRef(null);
  const [episode, setEpisode] = useState(0);
  const [frame, setFrame] = useState(0);
  const current = broadcasts[episode];
  const detail = broadcastDetails[current.id];
  const frames = detail?.frames.length ? detail.frames : [cover(current)];

  function selectEpisode(index) {
    setEpisode((index + broadcasts.length) % broadcasts.length);
    setFrame(0);
  }

  function move(direction) {
    const next = frame + direction;
    if (next >= 0 && next < frames.length) {
      setFrame(next);
      return;
    }
    const index = (episode + direction + broadcasts.length) % broadcasts.length;
    const count = broadcastDetails[broadcasts[index].id]?.frames.length || 1;
    setEpisode(index);
    setFrame(direction < 0 ? count - 1 : 0);
  }

  return (
    <div className={archive ? "dp-broadcast ins-broadcast-archive" : "dp-broadcast"}>
      <h3 id="dp-broadcast-heading">방송 출연 화면</h3>
      <div className="dp-broadcast-window" aria-labelledby="dp-broadcast-heading" role="region">
        <div className="dp-broadcast-track" style={{animationDuration: `${broadcasts.length * 6}s`}}>
          {(archive ? [false] : [false, true]).map(copy => (
            <ul key={String(copy)} aria-hidden={copy || undefined} className={copy ? 'dp-broadcast-copy' : undefined}>
              {broadcasts.map((item, index) => (
                <li key={item.id}>
                  <button type="button" tabIndex={copy ? -1 : undefined} aria-haspopup="dialog"
                    onClick={event => {
                      opener.current = event.currentTarget;
                      selectEpisode(index);
                      dialog.current.showModal();
                    }}>
                    <img src={cover(item)} width="480" height="300" alt="" loading="lazy" decoding="async"/>
                    <span>{item.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <a className="ro-link" href={archive ? archiveUrl : "/insights/media"}>{archive ? "기존 방송 자료 보기" : "방송 - 언론 전체 보기"}<span aria-hidden="true">↗</span></a>

      <dialog ref={dialog} className="dp-broadcast-dialog" aria-labelledby="dp-broadcast-title"
        onClose={() => opener.current?.focus({preventScroll:true})}
        onClick={event => {if (event.target === event.currentTarget) dialog.current.close();}}
        onKeyDown={event => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.preventDefault();
          move(event.key === 'ArrowLeft' ? -1 : 1);
        }}>
        <div className="dp-dialog-content">
          <button type="button" className="dp-dialog-close" aria-label="닫기" autoFocus onClick={() => dialog.current.close()}>×</button>
          <h3 id="dp-broadcast-title">{current.title}</h3>
          <div className="dp-dialog-view">
            <button type="button" aria-label="이전 화면" onClick={() => move(-1)}>‹</button>
            <img src={frames[frame]} alt={`${current.title} 방송 화면 ${frame + 1}`} loading="lazy" decoding="async"/>
            <button type="button" aria-label="다음 화면" onClick={() => move(1)}>›</button>
          </div>
          <p className="dp-dialog-summary" aria-live="polite">{detail?.summary || current.title}</p>
          {frames.length > 1 && <div className="dp-dialog-thumbs" role="group" aria-label="이 방송의 다른 화면">
            {frames.map((image, index) => <button type="button" key={image} aria-label={`방송 화면 ${index + 1}`}
              aria-current={index === frame} onClick={() => setFrame(index)}><img src={image} alt="" loading="lazy"/></button>)}
          </div>}
          <div className="dp-dialog-thumbs" role="group" aria-label="다른 방송">
            {[-2, -1, 0, 1, 2].map(offset => {
              const index = (episode + offset + broadcasts.length) % broadcasts.length;
              const item = broadcasts[index];
              return <button key={item.id} type="button" aria-label={item.title} aria-current={index === episode}
                onClick={() => selectEpisode(index)}><img src={cover(item)} alt="" loading="lazy"/></button>;
            })}
          </div>
          <a className="ro-link" href={`${archiveUrl}/${current.id}`}>방송 게시글 보기<span aria-hidden="true">↗</span></a>
        </div>
      </dialog>
    </div>
  );
}
