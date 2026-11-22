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
import AboutTabs from '../../components/AboutTabs';
import '../../about-detail.css';

export const metadata = pageMeta(
  '/about/doctor',
  '샘플 의료진 소개 | 재활의학과 전문의 | 다나은재활의학과의원',
  '다나은재활의학과의원 샘플 의료진과 진료 방향을 소개합니다.',
);

const career = [['진료 안내', [doctorTraining, ...doctorClinicalCareer]]];
const education = [['운동 안내', ['평가 내용을 바탕으로 일상에서 실천할 수 있는 움직임을 설명합니다.']]];
const care = [
 ['불편이 시작된 상황','통증의 위치와 기간, 다치거나 무리했던 계기, 이전 치료와 현재 복용 중인 약을 확인합니다.'],
 ['생활 속 움직임','어떤 자세와 동작에서 불편한지, 업무·운동·가사 등 생활에서 무엇이 어려워졌는지 함께 살핍니다.'],
 ['지금 필요한 치료','진찰과 필요한 평가를 바탕으로 치료의 목적과 선택지를 설명합니다. 기대할 수 있는 변화와 한계, 주의사항을 함께 안내합니다.'],
 ['치료 이후의 변화','증상의 변화와 움직임의 불편을 다시 확인합니다. 경과에 따라 치료 계획과 생활 속 관리 방향을 조정합니다.'],
];
const fieldDescriptions = ['운동 중 손상과 운동 복귀에 대한 평가 안내','관절 통증과 일상 기능에 대한 평가 안내','목·허리 통증과 관련 움직임에 대한 평가 안내','치료 후 움직임과 일상 기능에 대한 상담','자세와 움직임에서 느끼는 불편에 대한 평가 안내','해당 진료 분야의 상담 및 치료 안내'];
function Heading({label,children}) {return <div className="ro-heading" data-ro-reveal><p className="ro-label">{label}</p><h2>{children}</h2></div>}
function Link({href,children}) {return <a className="ro-link" href={href}>{children}<span aria-hidden="true">↗</span></a>}
function Scene({direction='left'}) {return <figure className="dp-scene" data-ro-reveal={direction}><img src="/images/danaun-doctor.png" sizes="(max-width:640px) calc(100vw - 44px), 48vw" alt="다나은 샘플 의료진" width="1536" height="1024" loading="lazy" decoding="async"/></figure>}
function Groups({items}) {return <div className="dp-groups">{items.map(([title,lines],i)=><div className="dp-group" key={title} data-ro-reveal><div className="dp-group-label"><span>0{i+1}</span><h3>{title}</h3></div><ul>{lines.map(line=><li key={line}>{line}</li>)}</ul></div>)}</div>}

export const dynamic = 'force-dynamic';

export default async function DoctorPage() {
  const clinicMedia = await getClinicMedia();
  return (
    <div className="regen-overview doctor-profile">
      <JsonLd data={{'@context':'https://schema.org','@graph':[{'@type':'ProfilePage','@id':siteUrl+'/about/doctor#page',url:siteUrl+'/about/doctor',name:'샘플 의료진 소개',dateModified:'2026-11-15',mainEntity:{'@type':'Person','@id':siteUrl+'/about/doctor#person',name:'다나은 의료진',jobTitle:'대표원장 · 재활의학과 전문의',image:siteUrl+'/images/danaun-doctor.png',worksFor:{'@id':siteUrl+'/#clinic'}}},{'@type':'FAQPage',mainEntity:doctorFaqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}]}}/>
      <a className="skip" href="#main">본문 바로가기</a><SiteHeader/>
      <main id="main"><RegenOverviewMotion visibleOnly/>
        <section id="top" className="ro-hero" aria-labelledby="doctor-title"><picture className="ro-hero-image"><img src="/images/hero-regen-fibrin.webp" alt="" fetchPriority="high"/></picture><div className="ro-hero-content"><p className="ro-label">MEET YOUR DOCTOR</p><p className="ro-hero-sub">다나은재활의학과의원 · 원장 소개</p><h1 id="doctor-title"><em>샘플 의료진</em></h1><p>재활의학과 전문의</p></div></section>
        <AboutTabs active="/about/doctor"/>
        <section id="profile" className="ro-band dp-profile"><div className="ro-wrap dp-profile-grid"><div className="dp-portrait" data-ro-reveal="left"><img src="/images/danaun-doctor.png" alt="다나은 샘플 의료진" width="780" height="1280" decoding="async"/></div><div className="dp-profile-copy" data-ro-reveal><p className="ro-label">A DOCTOR WHO LISTENS</p><h2>통증을 살피고,<br/><em>다시 이어갈 일상을 생각합니다.</em></h2><p className="dp-name">다나은 의료진 <span>대표원장 · 재활의학과 전문의</span></p><p>아픈 부위와 함께, 불편이 시작된 상황과 일상에서 반복되는 움직임을 살핍니다. 환자마다 다른 증상과 생활을 이해하고, 현재 상태에 맞는 치료 방향을 함께 논의하겠습니다.</p><div className="dp-links"><Link href="#career">약력과 활동 보기</Link><Link href="/support/booking">진료·예약 안내</Link></div></div></div></section>
        <section id="philosophy" className="ro-band dp-perspective"><div id="perspective" className="ro-wrap"><Heading label="OUR PERSPECTIVE">통증이 생긴 순간부터,<br/><em>일상에서 반복되는 움직임까지.</em></Heading><div className="dp-scene-layout"><Scene/><div className="dp-prose" data-ro-reveal><p>같은 부위가 아파도 불편이 시작된 계기와 생활 속 부담은 다를 수 있습니다. 어디가 아픈지, 어떤 동작에서 불편한지, 일상에서 무엇이 어려워졌는지를 함께 듣는 이유입니다.</p><p>증상이 시작된 계기와 평소 움직임을 들으며 진료에 필요한 내용을 함께 정리합니다.</p><p>다나은에서는 진찰과 필요한 평가를 바탕으로 치료 선택지를 설명하고, 치료 이후의 변화와 생활 속 관리까지 함께 논의하고자 합니다.</p></div></div></div></section>
        <section id="career" className="ro-band dp-career">
          <div className="journey-backdrop" aria-hidden="true">
            <img src="/images/danaun-doctor.png" alt="" loading="lazy" decoding="async"/>
          </div>
          <div className="ro-wrap dp-career-content">
            <Heading label="CLINICAL EXPERIENCE">진료와 <em>임상 경력</em></Heading>
            <p className="dp-intro">샘플 의료진의 진료 경력과 연수 이력을 소개합니다.</p>
            <Groups items={career}/>
          </div>
        </section>
        <section id="education" className="ro-band"><div className="ro-wrap"><Heading label="EDUCATION & ADVISORY">진료실 밖에서도,<br/><em>움직임을 설명합니다.</em></Heading><p className="dp-intro">생활 속에서 필요한 움직임과 관리 방향을 설명합니다.</p><Groups items={education}/><p className="dp-note">진료에서는 환자의 상태와 목표를 바탕으로 일상에서의 움직임과 관리 방향을 함께 논의합니다.</p></div></section>
        <div className="home-premium doctor-clinic-media">
          <HomeScrollMotion rootSelector=".doctor-clinic-media"/>
          <ClinicMedia {...clinicMedia}/>
        </div>
        <section id="care" className="ro-band dp-care"><div className="ro-wrap"><Heading label="FOUR PERSPECTIVES">다나은에서 함께 살피는 <em>네 가지</em></Heading><div className="dp-care-layout"><div className="dp-care-grid">{care.map(([title,body],i)=><article key={title} data-ro-reveal data-ro-reveal-delay={i*100}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div><Scene direction="right"/></div><p className="dp-note">검사와 치료의 종류·횟수·간격은 환자의 상태와 진료 결과에 따라 달라집니다.</p></div></section>
        <section id="fields" className="ro-band"><div className="ro-wrap"><Heading label="SPECIALIZED CARE">진료 분야 <em>안내</em></Heading><div className="dp-fields">{centers.map((c,i)=><a key={c.slug} href={'/centers/'+c.slug} data-ro-reveal><span className="dp-index">0{i+1}</span><div><h3>{c.name} 센터</h3><p>{fieldDescriptions[i]}</p></div><span aria-hidden="true">↗</span></a>)}</div></div></section>
        <section id="questions" className="ro-band ro-faq ro-faq-expanded"><div className="ro-wrap ro-faq-grid"><div className="ro-faq-heading"><p className="ro-label">QUESTIONS & ANSWERS</p><h2 id="ro-faq-title">FAQ</h2><p>원장 진료에 대해<br/>자주 묻는 질문</p><span>6가지 질문</span></div><div className="ro-faq-group"><h3>진료를 준비하는 분께</h3>{doctorFaqs.map(([q,a],i)=><article className="ro-faq-answer" key={q}><span className="ro-faq-number">0{i+1}</span><div><h4>{q}</h4><p>{a}</p></div></article>)}</div></div></section>
      </main>
      <HomeFooter/>
    </div>
  );
}
