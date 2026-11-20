'use client';

import {useEffect, useRef, useState} from 'react';
import './tour-gallery.css';

export default function TourGallery({photos}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnails = useRef(null);
  const [file, name, description] = photos[activeIndex];

  useEffect(() => {
    const strip = thumbnails.current;
    if (strip.scrollWidth <= strip.clientWidth) return;

    const active = strip.querySelector('[aria-current="true"]');
    const stripBounds = strip.getBoundingClientRect();
    const activeBounds = active.getBoundingClientRect();

    strip.scrollTo({
      left: strip.scrollLeft + activeBounds.left - stripBounds.left - (stripBounds.width - activeBounds.width) / 2,
    });
  }, [activeIndex]);

  const move = (direction) => {
    setActiveIndex(index => (index + direction + photos.length) % photos.length);
  };

  return (
    <div className="tour-gallery" role="group" aria-label="병원 공간 사진 갤러리">
      <div className="tour-gallery-stage">
        <div className="tour-gallery-photo">
          <img key={file} src={'/images/clinic-tour-' + file + '.webp'} alt={description}
            width="910" height="530" loading="lazy" decoding="async"/>
        </div>
        <button type="button" className="tour-gallery-arrow tour-gallery-prev" aria-label="이전 사진" onClick={() => move(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="m14 6-6 6 6 6"/>
          </svg>
        </button>
        <div className="tour-gallery-caption" aria-live="polite" aria-atomic="true">
          <div key={file}>
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
          <span className="tour-gallery-counter">{activeIndex + 1} / {photos.length}</span>
        </div>
        <button type="button" className="tour-gallery-arrow tour-gallery-next" aria-label="다음 사진" onClick={() => move(1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="m10 6 6 6-6 6"/>
          </svg>
        </button>
      </div>
      <ul className="tour-gallery-thumbnails" role="list" aria-label="공간별 사진" ref={thumbnails}>
        {photos.map(([id, label], index) => (
          <li key={id}>
            <button type="button" aria-current={activeIndex === index ? 'true' : undefined} onClick={() => setActiveIndex(index)}>
              <img src={'/images/clinic-tour-' + id + '.webp'} alt="" width="910" height="530" loading="lazy" decoding="async"/>
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
