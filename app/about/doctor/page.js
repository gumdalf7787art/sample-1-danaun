import {getClinicMedia} from '../../../lib/clinic-media.mjs';
import ClinicMedia from '../../components/ClinicMedia';
import HomeScrollMotion from '../../components/HomeScrollMotion';
import {pageMeta, siteUrl} from '../../data/seo';
import {JsonLd} from '../../components/StructuredData';
import SiteHeader from '../../components/SiteHeader';
import {booking} from '../../components/DetailShell';
import HomeFooter from '../../components/HomeFooter';
import RegenOverviewMotion from '../../components/RegenOverviewMotion';
import {centers} from '../../data/centers';
import {doctorClinicalCareer, doctorFaqs, doctorTraining} from '../../data/doctor-profile';
import '../../regen-overview.css';
import './profile.css';
import BroadcastStrip from './BroadcastStrip';
import AboutTabs from '../../components/AboutTabs';
import '../../about-detail.css';

export const metadata = pageMeta(
  '/about/doctor',
  '이고은 대표원장 소개 | 재활의학과 전문의 | 리셋재활의학과의원',
  '리셋재활의학과의원 이고은 대표원장의 진료 관점과 임상 경력, 학술·교육 활동, 저서 및 방송활동을 소개합니다.',
);

const career = [
 ['현재 진료·자문', ['리셋재활의학과의원 대표원장','미즈메디병원 여성 통증 자문의']],
 ['주요 임상 경력', ['전 분당제생병원 재활의학과 지도전문의', ...doctorClinicalCareer]],
 ['연수', [doctorTraining]],
];
const education = [
 ['건강 교육·자문',['국민연금공단 장애진단평가 자문의','2016~2019 보령 메디앙스·남양유업 산모교실 강사','국제 트레이너 연합회·스포츠산업연구회 자문의사']],
 ['움직임·운동 교육',['닥터 이고은필라테스 대표','SH더위크 필라테스 자문의사·비상임이사','IIPAMASTER 대표강사','의학 채널 비온뒤 피트니스 멘토']],
];
const care = [
 ['불편이 시작된 상황','통증의 위치와 기간, 다치거나 무리했던 계기, 이전 치료와 현재 복용 중인 약을 확인합니다.'],
 ['생활 속 움직임','어떤 자세와 동작에서 불편한지, 업무·운동·가사 등 생활에서 무엇이 어려워졌는지 함께 살핍니다.'],
 ['지금 필요한 치료','진찰과 필요한 평가를 바탕으로 치료의 목적과 선택지를 설명합니다. 기대할 수 있는 변화와 한계, 주의사항을 함께 안내합니다.'],
 ['치료 이후의 변화','증상의 변화와 움직임의 불편을 다시 확인합니다. 경과에 따라 치료 계획과 생활 속 관리 방향을 조정합니다.'],
];
const media = [['KBS 맘스홈트','고정패널 활동'],['MBC 생방송 오늘 아침','무릎통증 관련 출연'],['채널A 나는 몸신이다','엉덩이 운동 관련 출연']];
const otherMedia = ['MBN 엄지의 제왕','MBN 알약방','TV조선 기적의 습관','백세 누리쇼','닥터 지바고','내 몸 사용 설명서','굿모닝 정보 세상','MBC 기분 좋은날','SBS 좋은 아침','모닝와이드'];
const fieldDescriptions = ['운동 중 손상과 운동 복귀에 대한 평가 안내','관절 통증과 일상 기능에 대한 평가 안내','목·허리 통증과 관련 움직임에 대한 평가 안내','치료 후 움직임과 일상 기능에 대한 상담','자세와 움직임에서 느끼는 불편에 대한 평가 안내','해당 진료 분야의 상담 및 치료 안내'];
function Heading({label,children}) {return <div className="ro-heading" data-ro-reveal><p className="ro-label">{label}</p><h2>{children}</h2></div>}
function Link({href,children}) {return <a className="ro-link" href={href}>{children}<span aria-hidden="true">↗</span></a>}
function Scene({name,alt,direction='left'}) {return <figure className="dp-scene" data-ro-reveal={direction}><img src={'/images/'+name+'-1120.webp'} srcSet={'/images/'+name+'-640.webp 640w, /images/'+name+'-1120.webp 1120w'} sizes="(max-width:640px) calc(100vw - 44px), 48vw" alt={alt} width="1536" height="1024" loading="lazy" decoding="async"/></figure>}
function Groups({items}) {return <div className="dp-groups">{items.map(([title,lines],i)=><div className="dp-group" key={title} data-ro-reveal><div className="dp-group-label"><span>0{i+1}</span><h3>{title}</h3></div><ul>{lines.map(line=><li key={line}>{line}</li>)}</ul></div>)}</div>}

export const dynamic = 'force-dynamic';

export default async function DoctorPage() {
  const clinicMedia = await getClinicMedia();
  return (
    <div className="regen-overview doctor-profile">
      <JsonLd data={{'@context':'https://schema.org','@graph':[{'@type':'ProfilePage','@id':siteUrl+'/about/doctor#page',url:siteUrl+'/about/doctor',name:'이고은 대표원장 소개',dateModified:'2026-11-15',mainEntity:{'@type':'Person','@id':siteUrl+'/about/doctor#person',name:'이고은',jobTitle:'대표원장 · 재활의학과 전문의',image:siteUrl+'/images/sports-center-director-cutout.webp',worksFor:{'@id':siteUrl+'/#clinic'}}},{'@type':'FAQPage',mainEntity:doctorFaqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}]}}/>
      <a className="skip" href="#main">본문 바로가기</a><SiteHeader/>
      <main id="main"><RegenOverviewMotion visibleOnly/>
        <section id="top" className="ro-hero" aria-labelledby="doctor-title"><picture className="ro-hero-image"><img src="/images/hero-regen-fibrin.webp" alt="" fetchPriority="high"/></picture><div className="ro-hero-content"><p className="ro-label">MEET YOUR DOCTOR</p><p className="ro-hero-sub">리셋재활의학과의원 · 원장 소개</p><h1 id="doctor-title"><em>이고은 대표원장</em></h1><p>재활의학과 전문의</p></div></section>
        <AboutTabs active="/about/doctor"/>
        <section id="profile" className="ro-band dp-profile"><div className="ro-wrap dp-profile-grid"><div className="dp-portrait" data-ro-reveal="left"><img src="/images/sports-center-director-cutout.webp" alt="팔짱을 끼고 있는 이고은 대표원장" width="780" height="1280" decoding="async"/></div><div className="dp-profile-copy" data-ro-reveal><p className="ro-label">A DOCTOR WHO LISTENS</p><h2>통증을 살피고,<br/><em>다시 이어갈 일상을 생각합니다.</em></h2><p className="dp-name">이고은 <span>대표원장 · 재활의학과 전문의</span></p><p>아픈 부위와 함께, 불편이 시작된 상황과 일상에서 반복되는 움직임을 살핍니다. 환자마다 다른 증상과 생활을 이해하고, 현재 상태에 맞는 치료 방향을 함께 논의하겠습니다.</p><div className="dp-links"><Link href="#career">약력과 활동 보기</Link><Link href="/support/booking">진료·예약 안내</Link></div></div></div></section>
        <section id="philosophy" className="ro-band dp-perspective"><div id="perspective" className="ro-wrap"><Heading label="OUR PERSPECTIVE">통증이 생긴 순간부터,<br/><em>일상에서 반복되는 움직임까지.</em></Heading><div className="dp-scene-layout"><Scene name="doctor-profile-consultation" alt="무릎 모형을 활용해 환자와 상담하는 장면"/><div className="dp-prose" data-ro-reveal><p>같은 부위가 아파도 불편이 시작된 계기와 생활 속 부담은 다를 수 있습니다. 어디가 아픈지, 어떤 동작에서 불편한지, 일상에서 무엇이 어려워졌는지를 함께 듣는 이유입니다.</p><p>대학병원과 임상 현장에서의 진료 경험, 여성 통증 관련 자문, 움직임을 설명하는 교육 활동은 몸의 불편을 여러 측면에서 생각하게 하는 바탕입니다.</p><p>리셋에서는 진찰과 필요한 평가를 바탕으로 치료 선택지를 설명하고, 치료 이후의 변화와 생활 속 관리까지 함께 논의하고자 합니다.</p></div></div></div></section>
        <section id="career" className="ro-band dp-career">
          <div className="journey-backdrop" aria-hidden="true">
            <img src="/images/hero-lecture.webp" alt="" loading="lazy" decoding="async"/>
          </div>
          <div className="ro-wrap dp-career-content">
            <Heading label="CLINICAL EXPERIENCE">진료와 <em>임상 경력</em></Heading>
            <p className="dp-intro">이고은 대표원장의 진료 경력과 연수 이력을 소개합니다.</p>
            <Groups items={career}/>
          </div>
        </section>
        <section id="education" className="ro-band"><div className="ro-wrap"><Heading label="EDUCATION & ADVISORY">진료실 밖에서도,<br/><em>움직임을 설명합니다.</em></Heading><p className="dp-intro">여성 건강과 운동을 주제로 한 강의, 필라테스 교육과 관련 자문 등 다양한 활동을 이어온 이력을 소개합니다.</p><Groups items={education}/><p className="dp-note">진료에서는 환자의 상태와 목표를 바탕으로 일상에서의 움직임과 관리 방향을 함께 논의합니다.</p></div></section>
        <section id="book" className="ro-band dp-book" aria-labelledby="dp-book-heading">
          <div className="ro-wrap ro-split dp-book-layout">
            <figure className="dp-book-cover" data-ro-reveal="left">
              <img src="/images/doctor-pelvis-reset-cover.webp" alt="이고은 저서 골반 리셋 클리닉 표지" width="560" height="761" loading="lazy" decoding="async"/>
            </figure>
            <div className="dp-book-title" data-ro-reveal="right">
              <p className="ro-label">저서 소개</p>
              <h2 id="dp-book-heading">골반 리셋 클리닉</h2>
              <p className="dp-book-author">이고은 지음</p>
              <p>임신 전후 달라지는 몸과 생활 속 통증을 살펴보고, 척추와 골반을 돌보는 자세와 운동을 소개합니다.</p>
              <Link href="https://www.yes24.com/product/goods/60820793">도서 정보 보기</Link>
            </div>
          </div>
        </section>
        <section id="media" className="ro-band dp-media"><div className="ro-wrap"><Heading label="MEDIA ARCHIVE">방송·건강정보 <em>활동</em></Heading><p className="dp-intro">방송 프로그램과 건강정보 콘텐츠에 참여한 활동을 소개합니다.</p><div className="dp-media-grid">{media.map(([title,body],i)=><article key={title} data-ro-reveal data-ro-reveal-delay={i*100}><span className="dp-index">0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div><div className="dp-media-other" data-ro-reveal><h3>그 밖의 방송 활동</h3><ul>{otherMedia.map(t=><li key={t}>{t}</li>)}</ul></div><BroadcastStrip/></div></section>
        <div className="home-premium doctor-clinic-media">
          <HomeScrollMotion rootSelector=".doctor-clinic-media"/>
          <ClinicMedia {...clinicMedia}/>
        </div>
        <section id="care" className="ro-band dp-care"><div className="ro-wrap"><Heading label="FOUR PERSPECTIVES">리셋에서 함께 살피는 <em>네 가지</em></Heading><div className="dp-care-layout"><div className="dp-care-grid">{care.map(([title,body],i)=><article key={title} data-ro-reveal data-ro-reveal-delay={i*100}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div><Scene name="doctor-profile-treatment" direction="right" alt="무릎 주변에 주사치료를 시행하는 장면"/></div><p className="dp-note">검사와 치료의 종류·횟수·간격은 환자의 상태와 진료 결과에 따라 달라집니다.</p></div></section>
        <section id="fields" className="ro-band"><div className="ro-wrap"><Heading label="SPECIALIZED CARE">진료 분야 <em>안내</em></Heading><div className="dp-fields">{centers.map((c,i)=><a key={c.slug} href={'/centers/'+c.slug} data-ro-reveal><span className="dp-index">0{i+1}</span><div><h3>{c.name} 센터</h3><p>{fieldDescriptions[i]}</p></div><span aria-hidden="true">↗</span></a>)}</div></div></section>
        <section id="questions" className="ro-band ro-faq ro-faq-expanded"><div className="ro-wrap ro-faq-grid"><div className="ro-faq-heading"><p className="ro-label">QUESTIONS & ANSWERS</p><h2 id="ro-faq-title">FAQ</h2><p>원장 진료에 대해<br/>자주 묻는 질문</p><span>6가지 질문</span></div><div className="ro-faq-group"><h3>진료를 준비하는 분께</h3>{doctorFaqs.map(([q,a],i)=><article className="ro-faq-answer" key={q}><span className="ro-faq-number">0{i+1}</span><div><h4>{q}</h4><p>{a}</p></div></article>)}</div></div></section>
      </main>
      <HomeFooter/>
    </div>
  );
}
