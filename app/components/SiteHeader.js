'use client';

import {useEffect, useId, useRef, useState} from 'react';
import {usePathname} from 'next/navigation';
import AuthNav from './AuthNav';
import {centers} from '../data/centers';
import {diagnosisLinks} from '../data/diagnosis';
import {insightLinks} from '../data/insights.mjs';
import {regenLinks} from '../data/regen';
import {aboutLinks} from '../data/about';
import {supportHome, supportLinks} from '../data/support';

export default function SiteHeader({home = false}) {
 const [open, setOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);
 const header = useRef(null);
 const trigger = useRef(null);
 const panelId = useId();
 const pathname = usePathname();
 const currentSection = pathname?.split('/')[1];
 const groups = [
  ['RESET REGEN', '/regen', regenLinks],
  ['치료 센터', '/centers/sports', centers.map(({name, slug}) => [name + ' 센터', '/centers/' + slug])],
  ['정밀 진단', '/diagnosis', diagnosisLinks],
  ['리셋 소개', '/about/doctor', aboutLinks],
  ['리셋 인사이트', '/insights/tv', insightLinks],
  ['공지·상담', supportHome, supportLinks],
 ];
 const activeGroup = groups.find(([, href]) => href === pathname) ??
  groups.find(([, , items]) => Boolean(currentSection) &&
   items.some(([, url]) => url.split('/')[1]?.split('#')[0] === currentSection));

 useEffect(() => {
  const update = () => setScrolled(window.scrollY > 16);
  update();
  window.addEventListener('scroll', update, {passive: true});
  return () => window.removeEventListener('scroll', update);
 }, []);

 useEffect(() => {
  if (!open) return;
  const closeOutside = event => {
   if (!header.current?.contains(event.target)) setOpen(false);
  };
  const closeOnEscape = event => {
   if (event.key !== 'Escape') return;
   if (document.getElementById(panelId)?.contains(document.activeElement)) trigger.current?.focus();
   setOpen(false);
  };
  document.addEventListener('pointerdown', closeOutside);
  document.addEventListener('keydown', closeOnEscape);
  return () => {
   document.removeEventListener('pointerdown', closeOutside);
   document.removeEventListener('keydown', closeOnEscape);
  };
 }, [open, panelId]);

 return <header ref={header} className={`site-header${home ? ' site-header-home' : ''}${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}
  onPointerLeave={event => {
   if (event.pointerType === 'mouse' && window.matchMedia('(min-width:1101px)').matches &&
       !header.current?.contains(document.activeElement)) setOpen(false);
  }}
  onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
  <div className="site-header-inner">
   <a href={home ? '#' : '/'} className="logo" aria-label="리셋재활의학과의원 홈" onClick={() => setOpen(false)}>
    <span className="clinic-logo" aria-hidden="true"/>
   </a>
   <nav className="site-header-primary" aria-label="주 메뉴"
    onPointerEnter={event => { if (event.pointerType === 'mouse') setOpen(true); }}>
    {groups.map(([label, href]) => {
     const current = href === pathname ? 'page' : activeGroup?.[1] === href ? 'location' : undefined;
     return <a key={label} href={href} aria-current={current} onClick={() => setOpen(false)}>{label}</a>;
    })}
   </nav>
   <div className="site-header-actions">
    <AuthNav/>
    <button type="button" className="site-header-toggle" ref={trigger}
     aria-label={open ? '전체 메뉴 닫기' : '전체 메뉴 열기'} aria-expanded={open} aria-controls={panelId}
     onClick={() => setOpen(value => !value)}>
     <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'}/>
     </svg>
    </button>
   </div>
  </div>
  <nav id={panelId} className="site-header-panel" aria-label="전체 메뉴" hidden={!open}>
   <div className="site-header-panel-inner">
    <div className="site-header-brand">
     <p className="site-header-brand-name" lang="en">RESET REGEN</p>
     <p className="site-header-brand-message">
      재생치료를 중심으로,<br/>
      <span>당신의 회복을 설계합니다.</span>
     </p>
    </div>
    <div className="site-header-groups">
     {groups.map(([label, href, items]) => <div className="site-header-group" key={label}>
      <a className="site-header-group-title" href={href}
       aria-current={href === pathname ? 'page' : activeGroup?.[1] === href ? 'location' : undefined}
       onClick={() => setOpen(false)}>{label}</a>
      {items.map(([name, url]) => (
       <a href={url} key={url} aria-current={url === pathname ? 'page' : undefined} onClick={() => setOpen(false)}>{name}</a>
      ))}
     </div>)}
    </div>
   </div>
  </nav>
 </header>;
}
