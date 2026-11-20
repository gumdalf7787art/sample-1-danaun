import ResearchReferenceLink from './ResearchReferenceLink';
import SiteHeader from './SiteHeader';
import HomeFooter from './HomeFooter';
import { booking, CenterTabs } from './DetailShell';
import RegenOverviewMotion from './RegenOverviewMotion';
import RecoveryBeam from './RecoveryBeam';
import CenterCareProgram from './CenterCareProgram';
import * as copy from '../data/spine-center';

const symptomPhotos = ['neck-discomfort', 'assessment', 'rehab', 'walking-discomfort'];
const faqGroups = [
  ['증상과 원인', 0, 4],
  ['운동과 진료 준비', 4, 7],
  ['재평가와 빠른 진료', 7, 9],
];
const orbitStages = [
  { title: '통증', detail: '위치와 불편의 변화', position: 'top' },
  { title: '신경 기능', detail: '저림·감각·근력', position: 'right' },
  { title: '활동', detail: '앉기·걷기·손 사용', position: 'bottom' },
  { title: '치료 반응', detail: '달라진 점과 이상 반응', position: 'left' },
];

function Copy({ text }) {
  return text.split(/(\[S\d+(?:, S\d+)*\])/).map((part) => (
    part.startsWith('[S')
      ? <sup className="care-citations" key={part}>{part.slice(1, -1).split(', ').map((id) => (
        <a key={id} href={'#spine-source-' + id} aria-label={copy.sources.find(([source]) => source === id)?.[1]}>{id}</a>
      ))}</sup>
      : part
  ));
}

function Link({ href, children }) {
  return <a className="ro-link" href={href}>{children} <span aria-hidden="true">↗</span></a>;
}

function Heading({ id, label, children, intro }) {
  return <div className="ro-heading" data-ro-reveal>
    <p className="ro-label" lang="en">{label}</p>
    <h2 id={id}>{children}</h2>
    {intro && <p><Copy text={intro}/></p>}
  </div>;
}

function Photo({ name, alt, direction = 'left' }) {
  return <figure className="rp-photo" data-ro-reveal={direction}>
    <img src={'/images/spine-center-' + name + '.webp'} alt={alt} loading="lazy" decoding="async"/>
  </figure>;
}

function Rows({ items, start = 1, className = 'ro-evaluation-list rp-rows' }) {
  return <ol className={className} start={start}>{items.map(([title, body], index) => (
    <li key={title} data-ro-reveal data-ro-reveal-delay={index * 90}>
      <span aria-hidden="true">{String(index + start).padStart(2, '0')}</span>
      <div><h3>{title}</h3><p><Copy text={body}/></p></div>
    </li>
  ))}</ol>;
}

function Comparison({ caption, data }) {
  const [headings, ...rows] = data;
  return <table className="care-table" role="table">
    <caption>{caption}</caption>
    <thead role="rowgroup"><tr role="row">{headings.map((label) => <th key={label} scope="col" role="columnheader">{label}</th>)}</tr></thead>
    <tbody role="rowgroup">{rows.map(([title, ...details]) => (
      <tr key={title} role="row">
        <th scope="row" role="rowheader">{title}</th>
        {details.map((detail, i) => <td key={headings[i + 1]} role="cell"><strong aria-hidden="true">{headings[i + 1]}</strong>{detail}</td>)}
      </tr>
    ))}</tbody>
  </table>;
}

export default function SpineCenter() {
  const [referralTitle, referralBody] = copy.treatments[4];

  return <div className="regen-overview center-detail spine-center">
    <a className="skip" href="#main">본문 바로가기</a>
    <SiteHeader/>
    <main id="main">
      <RegenOverviewMotion visibleOnly/>
      <section id="top" className="ro-hero" aria-labelledby="spine-title">
        <picture className="ro-hero-image">
          <source media="(max-width:640px)" srcSet="/images/spine-center-hero-mobile.webp"/>
          <img src="/images/spine-center-hero.webp" alt="" fetchPriority="high"/>
        </picture>
        <div className="ro-hero-content">
          <p className="ro-label" lang="en">SPINE CARE</p>
          <p className="ro-hero-sub">리셋재활의학과의원 · 목·허리 통증과 기능 회복을 위한 진료</p>
          <h1 id="spine-title"><em>척추 재생 센터</em></h1>
          <p><strong>목과 허리의 통증, 신경 증상과 움직임을 함께 살핍니다.</strong><br/>
            통증의 위치와 팔·다리 저림, 생활에서 어려워진 동작을 확인합니다.
            필요한 치료를 선택하고, 경과에 맞는 운동과 생활 관리로 이어갑니다.</p>
          <div className="ro-hero-links">
            <a className="ro-link" href="#assessment">리셋의 평가 과정 <span aria-hidden="true">↓</span></a>
            <Link href="/support/booking">진료·예약 안내</Link>
          </div>
        </div>
      </section>
      <CenterTabs active="spine" variant="regen"/>

      <section id="overview" className="ro-intro ro-concept ro-band" aria-labelledby="spine-overview">
        <div className="ro-wrap">
          <div className="ro-concept-definition">
            <h2 id="spine-overview" data-ro-title>수술 전에 해볼 수 있는 것, <br/><span>원인부터 확인합니다</span></h2>
            <p>{copy.definition}</p>
          </div>
          <div className="center-care-targets" data-ro-reveal>
            <h3 id="spine-care-targets">주로 살피는 척추 질환</h3>
            <ul aria-labelledby="spine-care-targets">
              {copy.spineTargets.map(target => <li key={target}>{target}</li>)}
            </ul>
          </div>
          <CenterCareProgram id="spine-treatment-flow" title="척추 재생 치료 흐름"
            intro="진찰과 영상에서 확인한 내용을 바탕으로 필요한 치료와 운동을 상의합니다."
            items={copy.treatmentFlow}
            note="주사와 도수치료는 적합성을 확인한 뒤 선택합니다. 수술 평가가 필요한 신호가 있으면 전문 진료를 우선합니다."/>
          <a className="ro-link center-treatment-link" href="#treatment">치료 선택 과정 보기 <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section id="symptoms" className="ro-band care-paper" aria-labelledby="spine-symptoms">
        <div className="ro-wrap">
          <Heading id="spine-symptoms" label="WHEN TO VISIT">통증이 나타나는 방식부터 <em>구분합니다.</em></Heading>
          <div className="care-symptom-grid">
            {copy.symptoms.map(([title, body], index) => (
              <article key={title} className="care-symptom-card" data-ro-reveal data-ro-reveal-delay={index * 100}>
                <img src={'/images/spine-center-' + symptomPhotos[index] + '.webp'} width="600" height="400" alt="" loading="lazy" decoding="async"/>
                <div><h3>{title}</h3><p><Copy text={body}/></p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="keyword-guide" className="ro-band spine-guide-section" aria-labelledby="spine-guide">
        <div className="ro-wrap">
          <Heading id="spine-guide" label="UNDERSTAND YOUR SYMPTOMS" intro={copy.guideLead}>목 통증 재활과 <em>허리 통증의 원인 평가</em></Heading>
          <div className="spine-guide-layout">
            <div className="spine-guide">
              {copy.guide.map(([title, body], index) => (
                <article key={title} data-ro-reveal data-ro-reveal-delay={index * 90}>
                  <h3>{title}</h3><p><Copy text={body + [' [S3, S10]', ' [S4]', ' [S6]', ' [S7]'][index]}/></p>
                </article>
              ))}
            </div>
            <figure className="spine-guide-image" data-ro-reveal="right">
              <img src="/images/spine-center-lumbar-xray.webp" width="800" height="1000" alt="요추를 옆에서 본 엑스레이 예시 이미지" loading="lazy" decoding="async"/>
            </figure>
          </div>
        </div>
      </section>

      <section id="conditions" className="ro-band care-paper" aria-labelledby="spine-conditions">
        <div className="ro-wrap">
          <Heading id="spine-conditions" label="CONDITIONS & SYMPTOMS">같은 목·허리 통증도,<br/><em>살펴야 할 원인은 다릅니다.</em></Heading>
          <Comparison caption="주요 상담 주제와 평가에서 확인할 점" data={copy.conditions}/>
          <p className="care-note"><Copy text={copy.conditionNote}/></p>
        </div>
      </section>

      <section id="assessment" className="ro-precision ro-band" aria-labelledby="spine-assessment">
        <div className="ro-wrap">
          <Heading id="spine-assessment" label="PRECISION FIRST">치료를 정하기 전에,<br/><em>증상과 기능을 연결합니다.</em></Heading>
          <div className="ro-split rp-split rp-aligned-split">
            <Photo name="assessment" alt="진료실에서 환자의 손과 팔에 힘이 들어가는지 살피는 모습"/>
            <Rows items={copy.assessment}/>
          </div>
          <div className="care-links"><Link href="/diagnosis">정밀 진단 과정 알아보기</Link></div>
        </div>
      </section>

      <section id="imaging" className="ro-band" aria-labelledby="spine-imaging">
        <div className="ro-wrap">
          <Heading id="spine-imaging" label="DIAGNOSTIC IMAGING" intro={copy.imagingLead}>검사는 ‘많이’보다,<br/><em>확인할 질문에 맞춰 선택합니다.</em></Heading>
          <Comparison caption="진찰과 영상검사의 역할 및 한계" data={copy.imaging}/>
          <div className="care-links"><Link href="/diagnosis/ultrasound">초음파의 역할과 한계</Link></div>
        </div>
      </section>

      <section id="treatment" className="ro-band care-paper" aria-labelledby="spine-treatment">
        <div className="ro-wrap">
          <Heading id="spine-treatment" label="TREATMENT OPTIONS">현재 상태에 필요한 치료를 선택하고,<br/><em>일상에서의 움직임으로 연결합니다.</em></Heading>
          <div className="care-treatment-grid">
            {copy.treatments.slice(0, 4).map(([title, body], index) => (
              <article key={title} data-ro-reveal data-ro-reveal-delay={index * 105}><h3>{title}</h3><p><Copy text={body}/></p></article>
            ))}
          </div>
          <div className="care-safety spine-referral" data-ro-reveal><h3>{referralTitle}</h3><p><Copy text={referralBody}/></p></div>
        </div>
      </section>

      <section id="injections" className="ro-personal ro-personal-parallax ro-band spine-injections" aria-labelledby="spine-injections">
        <div className="journey-backdrop" aria-hidden="true"><img src="/images/spine-center-consult.webp" alt="" loading="lazy" decoding="async"/></div>
        <div className="ro-wrap">
          <div className="ro-personal-layout">
            <div className="ro-personal-copy" data-ro-reveal>
              <p className="ro-label" lang="en">BEFORE AN INJECTION</p>
              <h2 id="spine-injections">무엇을 치료하려는 주사인지,<br/><em>먼저 설명합니다.</em></h2>
              <p><Copy text={copy.injectionRisk}/></p>
            </div>
            <Rows items={copy.consent} className="ro-personal-steps"/>
          </div>
          <div className="spine-injection-link"><p>{copy.injectionConnection}</p><Link href="/regen/injection">리젠 주사의 선택 원칙</Link></div>
        </div>
      </section>

      <section id="rehabilitation" className="ro-band" aria-labelledby="spine-rehab">
        <div className="ro-wrap">
          <Heading id="spine-rehab" label="MOVEMENT & REHABILITATION" intro={copy.rehabLead}>치료 이후에도,<br/><em>일상에서 쓸 수 있는 움직임을 살핍니다.</em></Heading>
          <div className="spine-rehab-pair ro-split rp-split rp-aligned-split">
            <Photo name="assessment" alt="치료사와 함께 팔과 손의 움직임을 살피는 모습"/>
            <Rows items={copy.rehabilitation.slice(0, 1)}/>
          </div>
          <div className="spine-rehab-pair spine-rehab-reverse ro-split rp-split rp-aligned-split">
            <Rows items={copy.rehabilitation.slice(1)} start={2}/>
            <Photo name="rehab" alt="치료사와 함께 앉았다 일어나는 동작을 연습하는 모습" direction="right"/>
          </div>
          <p className="care-note">{copy.rehabNote}</p>
          <div className="care-links"><Link href="/diagnosis/movement">움직임 평가 알아보기</Link><Link href="/centers/posture">척추·자세 평가 알아보기</Link></div>
        </div>
      </section>

      <section id="follow-up" className="ro-process ro-band" aria-labelledby="spine-follow-up">
        <div className="ro-wrap">
          <Heading id="spine-follow-up" label="CONNECTED CARE">통증의 숫자와 함께,<br/><em>생활에서 달라진 점을 확인합니다.</em></Heading>
          <ol className="ro-process-steps ro-process-sequence" data-ro-reveal>{copy.process.map(([title, body], index) => (
            <li key={title}><span className="ro-point" aria-hidden="true"/><small>{String(index + 1).padStart(2, '0')}</small><h3>{title}</h3><p>{body}</p></li>
          ))}</ol>
          <RecoveryBeam stages={orbitStages} caption="일상에서 함께 확인하는 변화" centerTitle="생활 목표" centerDetail="나의 일상" label="생활 목표를 중심으로 통증, 신경 기능, 활동과 치료 반응을 살핍니다."/>
          <ul className="care-prompt-list">{copy.progress.map((item) => <li key={item}>{item}</li>)}</ul>
          <p className="care-note">{copy.followupNote}</p>
        </div>
      </section>

      <section id="safety" className="ro-band care-paper" aria-labelledby="spine-safety">
        <div className="ro-wrap care-narrow">
          <Heading id="spine-safety" label="WHEN TO SEEK CARE">이런 변화는 <em>예약일까지 기다리지 마세요.</em></Heading>
          <div className="spine-safety-grid">
            {copy.safety.map(([title, body], index) => <article className="care-safety" data-ro-reveal data-ro-reveal-delay={index * 90} key={title}>
              <h3>{title}</h3><p><Copy text={body}/></p>
            </article>)}
          </div>
        </div>
      </section>

      <section id="local-care" className="ro-band" aria-labelledby="spine-location">
        <div className="ro-wrap care-narrow">
          <Heading id="spine-location" label="VISIT RESET">동천역·동천동에서<br/><em>목·허리 통증 진료를 찾고 계신가요?</em></Heading>
          <div className="care-location" data-ro-reveal>
            <p>{copy.visitLead}</p><p>{copy.visitPrep}</p>
            <address><strong>리셋재활의학과의원</strong><br/>경기 용인시 수지구 손곡로 95 송란아트프라자 2층</address>
            <div className="care-links"><Link href="/visit">진료시간·오시는 길</Link><Link href="/about/doctor">이고은 대표원장 소개</Link></div>
          </div>
        </div>
      </section>

      <section id="faq" className="ro-faq ro-faq-expanded ro-band" aria-labelledby="spine-faq">
        <div className="ro-wrap ro-faq-grid">
          <div className="ro-faq-heading">
            <p className="ro-label" lang="en">QUESTIONS & ANSWERS</p>
            <h2 id="spine-faq" aria-label="척추 재생 센터 자주 묻는 질문">FAQ</h2>
            <p>척추 재생 센터, 자주 묻는 질문</p>
          </div>
          <div className="ro-faq-groups">
            {faqGroups.map(([title, start, end]) => (
              <section className="ro-faq-group" aria-labelledby={'spine-faq-' + start} key={title}>
                <h3 id={'spine-faq-' + start}>{title}</h3>
                <ol start={start + 1}>{copy.faqs.slice(start, end).map(([number, question, answer]) => (
                  <li className="ro-faq-answer" key={number}><span aria-hidden="true">{number}</span><div><h4>{question}</h4><p><Copy text={answer}/></p></div></li>
                ))}</ol>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section id="references" className="ro-band care-paper care-sources" aria-labelledby="spine-references">
        <div className="ro-wrap care-narrow">
          <Heading id="spine-references" label="REFERENCES" intro={copy.referenceNote}>참고 자료와 <em>작성 안내</em></Heading>
          <ul>{copy.sources.map(([id, title, url]) => <li id={'spine-source-' + id} key={id}><span>{id}</span><a href={url} target="_blank" rel="noreferrer">{title} ↗</a></li>)}</ul>
          <p className="care-note">자료 확인 <time dateTime="2026-11-15">2026.11.15</time> · 의료진 검토 완료</p>
          <ResearchReferenceLink path="/centers/spine"/>
        </div>
      </section>
    </main>
    <HomeFooter/>
    <div className="mobile-actions"><a href="tel:0312632520">전화 상담</a><a href={booking} target="_blank" rel="noreferrer">네이버 예약 ↗</a><a href="/visit">오시는 길</a></div>
  </div>;
}
