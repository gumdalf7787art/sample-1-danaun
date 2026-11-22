'use client';
import {useLayoutEffect} from 'react';
export default function RegenOverviewMotion({once = false, visibleOnly = false} = {}){
 useLayoutEffect(()=>{
  const root=document.querySelector('.regen-overview');
  if(!root||!window.IntersectionObserver||!Element.prototype.animate)return;
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const states=new Map();
  const prepare=target=>{
   const status = states.get(target)?.status;
   if (preference.matches || status === 'pending' || status === 'running' || (once && status === 'done')) return;
   const direction = target.dataset.roReveal;
   const horizontal = direction === 'left' || direction === 'right';
   const transform = horizontal
    ? `translateX(${direction === 'left' ? -48 : 48}px)`
    : 'translateY(18px)';
   const animation = target.animate(
    [{opacity: 0, transform}, {opacity: 1, transform: 'translate(0,0)'}],
    {
     duration: horizontal || target.id === 'ro-why-title' ? 1500 : 1000,
     delay: Number(target.dataset.roRevealDelay ?? 0),
     easing: 'cubic-bezier(.22,.61,.36,1)',
     fill: 'both',
    },
   );
   animation.pause();animation.currentTime=0;
   const state={animation,status:'pending'};states.set(target,state);
   animation.onfinish=()=>{state.status='done';animation.cancel();if(once){exit.unobserve(target);enter.unobserve(target);visibleEnter.unobserve(target);titleEnter.unobserve(target)}};
  };
  const exit=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(!isIntersecting)prepare(target)}),{rootMargin:'220px 0px'});
  const playReveals = entries => {
   for (const {target, isIntersecting} of entries) {
    const state = states.get(target);
    if (isIntersecting && state?.status === 'pending') {
     state.status = 'running';
     state.animation.play();
    }
   }
  };
  const enter = new IntersectionObserver(playReveals, {rootMargin: '80px 0px'});
  const visibleEnter = new IntersectionObserver(playReveals, {rootMargin: '0px 0px -24px', threshold: visibleOnly ? 0 : 0.1});
  root.querySelectorAll('[data-ro-reveal]').forEach(target => {
   const rect = target.getBoundingClientRect();
   if (rect.top >= innerHeight || rect.bottom <= 0) prepare(target);
   exit.observe(target);
   const observer = visibleOnly || target.hasAttribute('data-ro-reveal-delay') ? visibleEnter : enter;
   observer.observe(target);
  });
  const titleEnter = new IntersectionObserver(entries => entries.forEach(({target,isIntersecting}) => {
   const state=states.get(target);
   if(isIntersecting&&state?.status==='pending'){state.status='running';state.animation.play()}
  }), {rootMargin:'0px 0px -35px',threshold:0.25});
  root.querySelectorAll('[data-ro-title]').forEach(target=>{prepare(target);exit.observe(target);titleEnter.observe(target)});
  const highlightObserver = new IntersectionObserver(entries => {
   for (const {target, isIntersecting, intersectionRatio} of entries) {
    if (!isIntersecting) target.classList.remove('is-highlighted');
    else if (intersectionRatio >= 0.6) target.classList.add('is-highlighted');
   }
  }, {threshold: [0, 0.6], rootMargin: '0px 0px -32px'});
  root.querySelectorAll('[data-ro-highlight]').forEach(target => highlightObserver.observe(target));
  const standards = root.querySelector('[data-ro-standards]');
  const standardsObserver = new IntersectionObserver(([entry]) => {
   if (!entry.isIntersecting) return;
   standards.dataset.roStandards = 'visible';
   standardsObserver.disconnect();
  }, {rootMargin: '0px 0px -24px', threshold: 0.25});
  if (standards && !preference.matches) {
   standards.dataset.roStandards = 'pending';
   standardsObserver.observe(standards);
  }
  const stepObserver = new IntersectionObserver(entries => {
   entries.forEach(({target, isIntersecting}) => target.classList.toggle('is-current', isIntersecting));
  }, {rootMargin: '-25% 0px -30% 0px', threshold: 0});
  root.querySelectorAll('[data-ro-step]').forEach(target => stepObserver.observe(target));
  const reveal=event=>states.forEach((state,target)=>{if(preference.matches||target.contains(event.target)){state.animation.cancel();state.status='done'}});
  root.addEventListener('focusin',reveal);preference.addEventListener('change',reveal);
  return()=>{titleEnter.disconnect();stepObserver.disconnect();standardsObserver.disconnect();if(standards)standards.dataset.roStandards="";exit.disconnect();enter.disconnect();visibleEnter.disconnect();highlightObserver.disconnect();states.forEach(s=>s.animation.cancel());root.removeEventListener('focusin',reveal);preference.removeEventListener('change',reveal)};
 },[once, visibleOnly]);
 return null;
}
