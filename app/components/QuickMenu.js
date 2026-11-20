'use client';

import {useEffect, useRef, useState} from 'react';

function Icon({type}) {
  const paths = {
    phone: <path d="m7 3 3 5-2 2c1.4 3 3 4.6 6 6l2-2 5 3-1 4C11 22 2 13 3 4Z"/>,
    chat: <path d="M21 11c0 4.4-4 8-9 8l-5 3v-4c-2.4-1.4-4-4-4-7 0-4.4 4-8 9-8s9 3.6 9 8ZM8 11h.01M12 11h.01M16 11h.01"/>,
    naver: <g stroke="none"><rect width="24" height="24" rx="6" fill="#03C75A"/><path d="M6 5h4l4 7V5h4v14h-4l-4-7v7H6Z" fill="#fff"/></g>,
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    up: <path d="m6 13 6-6 6 6M12 7v14"/>,
    close: <path d="m6 6 12 12M6 18 18 6"/>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}

export default function QuickMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const toggle = useRef(null);
  useEffect(() => {
    if (!open) return;
    const outside = event => {if (!root.current?.contains(event.target)) setOpen(false);};
    const escape = event => {if (event.key === 'Escape') {setOpen(false); toggle.current?.focus();}};
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape);};
  }, [open]);
  return <aside ref={root} className={`reset-quick${open ? ' is-open' : ''}`} aria-label="진료 바로가기">
    <nav id="reset-quick-links" className="reset-quick-panel" aria-label="퀵 메뉴">
      <a className="reset-quick-phone" href="tel:0312632520" onClick={() => setOpen(false)}><Icon type="phone"/><span>전화 상담</span><small>031.263.2520</small></a>
      <a className="reset-quick-kakao" href="https://pf.kakao.com/_IxlqSj" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} aria-label="카카오 상담 (새 탭)"><Icon type="chat"/><span>카카오 상담</span></a>
      <a href="https://booking.naver.com/booking/13/bizes/271483?area=plt" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} aria-label="네이버 예약 (새 탭)"><Icon type="naver"/><span>네이버 예약</span></a>
      <a href="/visit#location" onClick={() => setOpen(false)}><Icon type="pin"/><span>오시는 길</span></a>
      <button className="reset-quick-top" type="button" onClick={() => {window.scrollTo({top:0, behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'}); setOpen(false);}} aria-label="페이지 맨 위로"><Icon type="up"/><span>TOP</span></button>
    </nav>
    <button ref={toggle} type="button" className="reset-quick-toggle" aria-controls="reset-quick-links" aria-expanded={open} aria-label={open ? '퀵 메뉴 닫기' : '퀵 메뉴 열기'} onClick={() => setOpen(!open)}><Icon type={open ? 'close' : 'menu'}/><span>{open ? '닫기' : '바로가기'}</span></button>
  </aside>;
}
