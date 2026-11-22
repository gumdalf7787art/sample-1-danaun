'use client';
import {useEffect,useLayoutEffect} from 'react';

function observeScrollMotion(rootSelector){
  const root=typeof rootSelector==='string'?document.querySelector(rootSelector):rootSelector;
  if(!root||!('IntersectionObserver' in window)||!Element.prototype.animate)return;
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  const candidates=[...root.querySelectorAll('.section-top:not(.regen-editorial .section-top):not(.centers-editorial .section-top),.centers-editorial .eyebrow,.centers-editorial .section-intro,.center-title-line,.regen-editorial .eyebrow,.regen-title-line,.regen-editorial .section-intro,.therapy,.promise-inner>div,.consultation-copy,.consultation-details>article,.diagnosis-options>div>a,.doctor>.portrait,.doctor-copy>.eyebrow,.doctor-title-line,.doctor-message,.doctor-name,.credentials,.doctor-copy>.underline-link,.four-principles>div,.principles-heading,.principles-closing,.center,.regen-principles-intro,.regen-principle-visual,.regen-principle-copy,.regen-principles-research,.recovery-flow,.room-photo,.tv-channel-art,.tv-copy,.yt-card,.home-posts>a,.insights-inner>div,.home-questions>div,.visit>div')];
  const targets=candidates.filter(target=>!candidates.some(parent=>parent!==target&&parent.contains(target)));
  const states=new Map();
  const prepare=target=>{
   if(preference.matches||target.matches('.recovery-flow'))return;
   const old=states.get(target);
   if(old?.status==='pending'||old?.status==='running')return;
   const siblings=[...target.parentElement.children];
   const delay=target.matches('.therapy,.center')?(siblings.indexOf(target)%4)*60:0;
   const animation=target.animate(
    [{opacity:0,transform:'translate3d(0,20px,0)'},{opacity:1,transform:'translate3d(0,0,0)'}],
    {duration:950,delay,easing:'cubic-bezier(.22,.61,.36,1)',fill:'both'}
   );
   animation.pause();
   animation.currentTime=0;
   const state={animation,status:'pending'};
   states.set(target,state);
   animation.onfinish=()=>{state.status='done';animation.cancel();};
  };
  // A wide exit boundary prevents animation movement from re-arming itself.
  const exitObserver=new IntersectionObserver(entries=>{
   entries.forEach(({target,isIntersecting})=>{
    if(!isIntersecting)prepare(target);
   });
  },{rootMargin:'220px 0px',threshold:0});
  const enterObserver=new IntersectionObserver(entries=>{
   entries.forEach(({target,isIntersecting})=>{
    if(target.matches('.recovery-flow')){
     if(isIntersecting)target.classList.add('recovery-flow-started');
     target.classList.toggle('recovery-flow-visible',isIntersecting);
     return;
    }
    if(!isIntersecting)return;
    const state=states.get(target);
    if(state?.status==='pending'){state.status='running';state.animation.play();}
   });
  },{rootMargin:'80px 0px',threshold:0});
  // Read geometry before writing animation styles to avoid repeated layout.
  const bounds=targets.map(target=>target.getBoundingClientRect());
  targets.forEach((target,index)=>{
   const rect=bounds[index];
   if(rect.top>=window.innerHeight||rect.bottom<=0)prepare(target);
   else states.set(target,{status:'done'});
   exitObserver.observe(target);
   enterObserver.observe(target);
  });
  const revealAll=()=>{
   if(!preference.matches)return;
   states.forEach(state=>{state.animation?.cancel();state.status='done';});
  };
  const revealFocused=event=>{
   states.forEach((state,target)=>{
    if(target.contains(event.target)){state.animation?.cancel();state.status='done';}
   });
  };
  preference.addEventListener('change',revealAll);
  root.addEventListener('focusin',revealFocused);
  return()=>{
   enterObserver.disconnect();exitObserver.disconnect();
   states.forEach(state=>state.animation?.cancel());
   preference.removeEventListener('change',revealAll);
   root.removeEventListener('focusin',revealFocused);
  };
}

// Prepare animations only for elements outside the viewport.
export default function HomeScrollMotion({rootSelector = '.home-premium', resetScrollOnVisit = false} = {}){
 useEffect(()=>{
  if(!resetScrollOnVisit)return;
  const previousRestoration=window.history.scrollRestoration;
  const scrollToTop=()=>{
   if(!window.location.hash)window.scrollTo({top:0,left:0,behavior:'instant'});
  };
  window.history.scrollRestoration='manual';
  scrollToTop();
  window.addEventListener('pageshow',scrollToTop);
  return ()=>{
   window.removeEventListener('pageshow',scrollToTop);
   window.history.scrollRestoration=previousRestoration;
  };
 },[resetScrollOnVisit]);
 useLayoutEffect(()=>{
  if(!resetScrollOnVisit)return observeScrollMotion(rootSelector);
  const root=document.querySelector(rootSelector);
  if(!root||!('IntersectionObserver' in window))return;
  const disposers=[];
  // Keep server-rendered content intact; prepare motion only near the viewport.
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(!entry.isIntersecting)continue;
    observer.unobserve(entry.target);
    const dispose=observeScrollMotion(entry.target);
    if(dispose)disposers.push(dispose);
   }
  },{rootMargin:'350px 0px'});
  for(const section of root.querySelectorAll(':scope > section:not(.hero)'))observer.observe(section);
  return()=>{observer.disconnect();disposers.forEach(dispose=>dispose());};
 },[rootSelector,resetScrollOnVisit]);
 return null;
}
