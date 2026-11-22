'use client';

import {useEffect, useRef, useState} from 'react';
import ClinicMedia from './ClinicMedia';

export default function HomeMedia({initialMedia}) {
  const [media, setMedia] = useState(initialMedia);
  const anchor = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    let requested = false;
    let observer;
    const refresh = async () => {
      if (requested) return;
      requested = true;
      observer?.disconnect();
      try {
        const response = await fetch('/api/home-media', {signal:controller.signal});
        if (response.ok) setMedia(await response.json());
      } catch {
        // Keep the rendered video and column links if the refresh is unavailable.
      }
    };
    if ('IntersectionObserver' in window && anchor.current) {
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) refresh();
      }, {rootMargin:'400px 0px'});
      observer.observe(anchor.current);
    }
    if (document.readyState === 'complete') refresh();
    else window.addEventListener('load', refresh, {once:true});
    return () => {
      controller.abort();
      observer?.disconnect();
      window.removeEventListener('load', refresh);
    };
  }, []);

  return <>
    <span ref={anchor} aria-hidden="true" style={{display:'block'}}/>
    <ClinicMedia {...media} showArchiveLink={false}/>
  </>;
}
