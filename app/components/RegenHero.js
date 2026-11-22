'use client';
import {useEffect,useRef,useState} from 'react';
const labels=['주사치료와 통증 회복','통증 원인 평가','주사치료의 선택','치료 후 재활'];
function HeroLabel({children, lang}) {
 return (
  <div className="reset-intro-label rise">
   <p className="reset-kicker reset-brand-kicker" lang="en">DANAUN INJECTION THERAPY</p>
   <p className="reset-hero-subtitle" lang={lang}>{children}</p>
  </div>
 );
}
function HeroBackground({name, priority = 'low'}) {
 return <picture>
  <source media="(max-width: 640px)" srcSet={'/images/hero-'+name+'-mobile.webp'}/>
  <img src={'/images/hero-'+name+'.webp'} width="1672" height="941" alt="" fetchPriority={priority}/>
 </picture>;
}

export default function RegenHero(){
 const firstImage=useRef(null);
 const [prepared,setPrepared]=useState(false);
 const [ready,setReady]=useState(false);
 useEffect(()=>{
  const image=firstImage.current;
  if(!image)return;
  let cancelled=false,frame=0,timer=0;
  // Let the visible image paint before fetching the other slides.
  image.decode().catch(()=>{}).then(()=>{
   if(cancelled)return;
   frame=requestAnimationFrame(()=>{
    timer=window.setTimeout(()=>setPrepared(true),250);
   });
  });
  return ()=>{cancelled=true;cancelAnimationFrame(frame);clearTimeout(timer);};
 },[]);
 useEffect(()=>{
  let cancelled=false,started=false,frame=0;
  function start(){if(cancelled||started)return;started=true;clearTimeout(timeout);frame=requestAnimationFrame(()=>{frame=requestAnimationFrame(()=>{if(!cancelled)setReady(true);});});}
  const timeout=setTimeout(start,600);
  document.fonts.load('600 32px "S-Core Dream"').then(start,start);
  return()=>{cancelled=true;clearTimeout(timeout);cancelAnimationFrame(frame);};
 },[]);
 const [{active,previous},setSlide]=useState({active:0,previous:null}),[paused,setPaused]=useState(false),[reduced,setReduced]=useState(true),[focused,setFocused]=useState(false);
 useEffect(()=>{const mq=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(mq.matches);update();mq.addEventListener('change',update);return()=>mq.removeEventListener('change',update)},[]);
 useEffect(()=>{
  if(!ready||paused||reduced||focused)return;
  const displayTime=6500;
  const timer=setInterval(()=>{
   if(!document.hidden)setSlide(s=>({active:(s.active+1)%labels.length,previous:s.active}));
  },displayTime);
  return()=>clearInterval(timer);
 },[ready,paused,reduced,focused,active]);
 // Keep the outgoing image and its zoom alive until the incoming slide fully covers it.
 useEffect(()=>{if(previous===null)return;const timer=setTimeout(()=>setSlide(s=>({...s,previous:null})),reduced?0:1200);return()=>clearTimeout(timer)},[active,previous,reduced]);
 const choose=n=>setSlide(s=>n===s.active?s:{active:n,previous:s.active});
 const prepareBackground=i=>prepared||i===active||i===previous;
 const panelProps=i=>({'aria-hidden':active!==i,inert:active!==i,className:'reset-slide slide-'+i+(active===i?' is-active':previous===i?' is-outgoing':'')});
 return <div className={"reset-slider"+(ready?" hero-ready":"")} role="region" aria-roledescription="캐러셀" aria-label="다나은의 진료 이야기" onFocusCapture={e=>{if(e.target.closest('.reset-slide-copy'))setFocused(true)}} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget)||!e.relatedTarget?.closest('.reset-slide-copy'))setFocused(false)}}>
  <button className="reset-motion-toggle" onClick={()=>setPaused(v=>!v)}>{paused?'자동 전환 시작':'자동 전환 정지'}</button>
  <div className="reset-slide-stack">
   <article {...panelProps(0)} aria-label="1 / 4 주사치료와 통증 회복" aria-roledescription="슬라이드">
    <div className="reset-slide-background">
     <picture>
      <source media="(max-width: 640px)" srcSet="/images/hero-regen-depth-mobile.webp"/>
      <img ref={firstImage} src="/images/hero-regen-depth.webp" width="1672" height="941" alt="" fetchPriority="high"/>
     </picture>
    </div>
    <div className="reset-slide-copy reset-regen-intro">
     <HeroLabel>다나은재활의학과 <span aria-hidden="true">|</span> 주사치료와 재활</HeroLabel>
     <h1 className="reset-hero-title rise"><span>주사치료를 중심으로,</span>{' '}<em>통증 완화와 회복을 돕습니다.</em></h1>
     <p className="reset-summary rise">통증의 원인을 살피고 상태에 맞는 치료를 상의합니다.<br className="reset-desktop-break"/> 치료 후에는 움직임을 확인하고 재활을 이어갑니다.</p>
     <p className="reset-treatment-names rise">맞춤 주사치료 · PRP · PRF · 무릎 SVF</p>
     <a className="reset-hero-link rise" href="/regen">주사치료 알아보기 <span aria-hidden="true">↗</span></a>
     <a className="reset-evidence rise" href="/insights/research">치료 근거와 적용 범위 보기 ↗</a>
    </div>
   </article>
   <article {...panelProps(1)} aria-label="2 / 4 통증 원인 평가" aria-roledescription="슬라이드">
    <div className="reset-slide-background">{prepareBackground(1)&&<HeroBackground name="precision" priority={active===1?'auto':'low'}/>}</div>
    <div className="reset-slide-copy reset-regen-intro">
     <HeroLabel lang="en">PRECISION DIAGNOSIS &amp; RECOVERY</HeroLabel>
     <h2 className="reset-hero-title rise"><span>불편한 움직임을 듣고,</span>{' '}<em>통증의 원인부터 살핍니다.</em></h2>
     <p className="reset-summary rise">통증이 시작된 상황과 불편한 동작을 듣고,<br/>진찰과 필요한 검사를 통해 원인을 살핍니다.</p>
     <p className="reset-promise rise">원인을 보고, 치료하고<br/>다시 확인합니다.</p>
     <a className="reset-hero-link rise" href="/about/doctor">다나은의 진료 철학 알아보기 <span aria-hidden="true">↗</span></a>
    </div>
   </article>
   <article {...panelProps(2)} aria-label="3 / 4 주사치료의 선택" aria-roledescription="슬라이드">
    <div className="reset-slide-background">{prepareBackground(2)&&<HeroBackground name="regen-injection" priority={active===2?'auto':'low'}/>}</div>
    <div className="reset-slide-copy reset-regen-intro">
     <HeroLabel lang="en">PERSONALIZED INJECTION CARE</HeroLabel>
     <h2 className="reset-hero-title rise"><span>주사가 필요한 경우,</span>{' '}<em>성분과 목적부터 설명합니다.</em></h2>
     <p className="reset-summary rise">인대·힘줄 등 통증에 관여하는 조직을 살피고,<br className="reset-desktop-break"/> 진단과 상태에 맞는 주사치료를 선택합니다.</p>
     <p className="reset-promise rise">기대할 수 있는 변화와 주의점,<br className="reset-desktop-break"/> 함께 검토할 치료 선택지를 안내합니다.</p>
     <a className="reset-hero-link rise" href="/regen/injection">맞춤 주사치료 알아보기 <span aria-hidden="true">↗</span></a>
    </div>
   </article>
   <article {...panelProps(3)} aria-label="4 / 4 치료 후 재활" aria-roledescription="슬라이드">
    <div className="reset-slide-background">{prepareBackground(3)&&<HeroBackground name="recovery" priority={active===3?'auto':'low'}/>}</div>
    <div className="reset-slide-copy reset-regen-intro">
     <HeroLabel lang="en">RECOVERY &amp; REHABILITATION</HeroLabel>
     <h2 className="reset-hero-title rise"><span>치료 후에는</span>{' '}<em>움직임의 변화를 확인합니다.</em></h2>
     <p className="reset-summary rise">치료 후 조직의 상태와 움직임을 다시 살피고,<br/>상태에 맞춰 운동치료와 생활 관리를 이어갑니다.</p>
     <p className="reset-promise rise">다시 하고 싶은 일상 동작을 목표로,<br/>회복 과정에 맞춰 운동을 조절합니다.</p>
     <a className="reset-hero-link rise" href="#journey">다나은의 치료 과정 알아보기 <span aria-hidden="true">↗</span></a>
    </div>
   </article>
  </div>
  <div className="reset-slide-dots" aria-label="히어로 슬라이드 선택">{labels.map((label,i)=><button key={label} aria-label={`${i+1}번 슬라이드: ${label}`} aria-pressed={active===i} onClick={()=>choose(i)}><span/></button>)}</div>
 </div>
}
