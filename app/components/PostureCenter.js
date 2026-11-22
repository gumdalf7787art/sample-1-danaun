import ResearchReferenceLink from './ResearchReferenceLink';
import SiteHeader from './SiteHeader';
import HomeFooter from './HomeFooter';
import CenterCareProgram from './CenterCareProgram';
import { booking, CenterTabs } from './DetailShell';
import RegenOverviewMotion from './RegenOverviewMotion';
import RecoveryBeam from './RecoveryBeam';
import * as copy from '../data/posture-center';

const guideSources = [' [S1, S2]', ' [S4]', '', ' [S6]', ' [S1, S8]'];
const faqGroups = [['측만증과 체형이 궁금할 때', 0, 4], ['운동과 방문 준비', 4, 9]];
const orbitStages = [
  { title: '일상 활동', detail: '앉기·서기·걷기', position: 'top' },
  { title: '움직임', detail: '관절 기능과 근력', position: 'right' },
  { title: '척추 경과', detail: '성장과 만곡의 변화', position: 'bottom' },
  { title: '실천', detail: '가능한 운동과 반응', position: 'left' },
];

function Copy({ text }) {
  return text.split(/(\[S\d+(?:, S\d+)*\])/).map(part => {
    if (!/^\[S\d/.test(part)) return part;
    return <sup className="care-citations" key={part}>{part.slice(1, -1).split(', ').map(id => (
      <a key={id} href={'#pc-source-' + id} aria-label={copy.sources.find(([source]) => source === id)?.[1]}>{id}</a>
    ))}</sup>;
  });
}

function Heading({ id, label, children, intro }) {
  return <div className="ro-heading" data-ro-reveal>
    <p className="ro-label" lang="en">{label}</p>
    <h2 id={id}>{children}</h2>
    {intro && <p><Copy text={intro}/></p>}
  </div>;
}

function Link({ href, children }) {
  return <a className="ro-link" href={href}>{children} <span aria-hidden="true">↗</span></a>;
}

function Photo({ name, alt, direction = 'left' }) {
  return <figure className="rp-photo" data-ro-reveal={direction}>
    <img src={'/images/posture-center-' + name + '.webp'} alt={alt} loading="lazy" decoding="async"/>
  </figure>;
}

function Rows({ items, className = 'ro-evaluation-list rp-rows' }) {
  return <ol className={className}>{items.map(([title, body], i) => (
    <li key={title} data-ro-reveal data-ro-reveal-delay={i * 90}>
      <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
      <div><h3>{title}</h3><p><Copy text={body}/></p></div>
    </li>
  ))}</ol>;
}

function Comparison({ caption, data }) {
  const [headings, ...rows] = data;
  return <table className="care-table" role="table">
    <caption>{caption}</caption>
    <thead role="rowgroup"><tr role="row">{headings.map(label => <th scope="col" role="columnheader" key={label}>{label}</th>)}</tr></thead>
    <tbody role="rowgroup">{rows.map(([title, ...details]) => (
      <tr role="row" key={title}>
        <th scope="row" role="rowheader">{title}</th>
        {details.map((detail, i) => <td role="cell" key={headings[i + 1]}><strong aria-hidden="true">{headings[i + 1]}</strong>{detail}</td>)}
      </tr>
    ))}</tbody>
  </table>;
}

function Prompts({ items }) {
  return <ul className="care-prompt-list">{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

export default function PostureCenter() {
  return <div className="regen-overview center-detail posture-center">
    <a className="skip" href="#main">본문 바로가기</a>
    <SiteHeader/>
    <main id="main">
      <RegenOverviewMotion visibleOnly/>
      <section id="top" className="ro-hero" aria-labelledby="pc-title">
        <picture className="ro-hero-image">
          <source media="(max-width:640px)" srcSet="/images/posture-center-hero-mobile.webp"/>
          <img src="/images/posture-center-hero.webp" alt="" fetchPriority="high"/>
        </picture>
        <div className="ro-hero-content">
          <p className="ro-label" lang="en">POSTURE & MOVEMENT</p>
          <p className="ro-hero-sub">다나은재활의학과의원 · 연결성·안정성</p>
          <h1 id="pc-title"><em>척추·체형 교정 센터</em></h1>
          <p><strong>겉모습 너머, 움직임의 균형을 봅니다.</strong><br/>
            척추의 구조와 자세의 차이를 구분하고, 성장 상태와 생활 속 움직임에 맞춰 관리 방향을 함께 정합니다.</p>
          <div className="ro-hero-links">
            <a className="ro-link" href="#assessment">체형 평가 알아보기 <span aria-hidden="true">↓</span></a>
            <Link href="/visit">진료·방문 안내</Link>
          </div>
        </div>
      </section>
      <CenterTabs active="posture" variant="regen"/>

      <section id="overview" className="ro-intro ro-concept ro-band" aria-labelledby="pc-overview">
        <div className="ro-wrap">
          <div className="ro-concept-definition">
            <h2 id="pc-overview" data-ro-title>기울어진 몸, <br/><span>평가하고 측정하며 바로잡아 갑니다</span></h2>
            <p>{copy.centerIntro}</p>
            <p>{copy.definitionDetail}</p>
          </div>
          <div className="center-care-targets" data-ro-reveal>
            <h3 id="pc-care-targets">주로 살피는 척추·체형 문제</h3>
            <ul aria-labelledby="pc-care-targets">
              {copy.postureTargets.map(target => <li key={target}>{target}</li>)}
            </ul>
          </div>
          <CenterCareProgram id="pc-care-flow" title="척추·체형 교정 진료 흐름"
            intro="재활의학과 전문의가 자세와 움직임을 평가하고, 정기 측정으로 변화를 확인해 계획을 조정합니다."
            items={copy.careFlow}
            note="청소년 척추측만증은 성장 상태와 만곡의 진행 정도에 따라 보조기나 전문기관 진료를 검토합니다."/>
          <div className="care-links">
            <a className="ro-link" href="#treatment">치료 선택 과정 보기 <span aria-hidden="true">↓</span></a>
            <a className="ro-link" href="#referral">보조기·전문기관 의뢰 기준 <span aria-hidden="true">↓</span></a>
            <Link href="/diagnosis/alignment">체형 분석 안내</Link>
          </div>
        </div>
      </section>

      <section id="symptoms" className="ro-band rp-summary" aria-labelledby="pc-symptoms">
        <div className="ro-wrap">
          <Heading id="pc-symptoms" label="WHEN TO VISIT" intro={copy.symptomLead}>자세나 움직임이 달라지면서,<br/><em>이런 일상이 불편해졌나요?</em></Heading>
          <div className="care-symptom-grid">
            {copy.symptoms.map(([title, body, photo], index) => (
              <article key={title} className="care-symptom-card" data-ro-reveal data-ro-reveal-delay={index * 105}>
                <img src={'/images/posture-center-' + photo + '.webp'} width="600" height="400" alt="" loading="lazy" decoding="async"/>
                <div><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
          <p className="care-note">{copy.symptomNote}</p>
        </div>
      </section>

      <section id="keyword-guide" className="ro-band pc-guide" aria-labelledby="pc-guide">
        <div className="ro-wrap">
          <Heading id="pc-guide" label="SCOLIOSIS & POSTURE">척추측만증 재활과 <em>체형 교정 상담</em></Heading>
          <div className="pc-guide-layout">
            <div className="pc-guide-grid">
              {copy.guide.map(([title, body], i) => (
                <article key={title} data-ro-reveal data-ro-reveal-delay={i * 85}><h3>{title}</h3><p><Copy text={body + guideSources[i]}/></p></article>
              ))}
            </div>
            <figure className="pc-guide-image" data-ro-reveal="right">
              <img src="/images/posture-center-scoliosis-xray.webp" width="800" height="1000" alt="척추의 옆굽음이 보이는 정면 엑스레이 예시 이미지" loading="lazy" decoding="async"/>
            </figure>
          </div>
        </div>
      </section>

      <section id="assessment" className="ro-precision ro-band" aria-labelledby="pc-assessment">
        <div className="ro-wrap">
          <Heading id="pc-assessment" label="PRECISION FIRST" intro={copy.assessLead}>다나은은 구조·증상·움직임을<br/><em>함께 평가합니다.</em></Heading>
          <div className="ro-split rp-split rp-aligned-split">
            <Photo name="assessment" alt="의료진이 서 있는 사람의 어깨와 몸통 정렬을 관찰하는 모습"/>
            <Rows items={copy.assessment}/>
          </div>
          <p className="care-note">{copy.assessNote}</p>
          <div className="pc-comparison">
            <p className="care-note"><Copy text={copy.definition}/></p>
            <Comparison caption="자세 비대칭과 척추측만증을 어떻게 구분하나요?" data={copy.definitionTable}/>
            <p className="care-note">{copy.definitionNote}</p>
          </div>
          <div className="care-links"><Link href="/diagnosis/alignment">체형 분석 알아보기</Link><Link href="/diagnosis/movement">움직임·자세 평가 알아보기</Link></div>
        </div>
      </section>

      <section id="adolescent" className="ro-personal ro-personal-parallax ro-band pc-growth" aria-labelledby="pc-growth">
        <div className="journey-backdrop" aria-hidden="true"><img src="/images/posture-center-growth.webp" alt="" loading="lazy" decoding="async"/></div>
        <div className="ro-wrap">
          <div className="ro-personal-layout">
            <div className="ro-personal-copy" data-ro-reveal>
              <p className="ro-label" lang="en">ADOLESCENT SCOLIOSIS</p>
              <h2 id="pc-growth">성장기 척추측만증,<br/><em>진행 가능성을 함께 살핍니다.</em></h2>
              <p><Copy text={copy.growthLead}/></p>
            </div>
            <Rows items={copy.growth} className="ro-personal-steps"/>
          </div>
          <p className="pc-growth-note">{copy.growthNote}</p>
        </div>
      </section>

      <section id="adult" className="ro-band" aria-labelledby="pc-adult">
        <div className="ro-wrap">
          <Heading id="pc-adult" label="ADULT POSTURE" intro={copy.adultLead}>편안하게 움직이는 <em>일상을 목표로 합니다.</em></Heading>
          <div className="ro-split rp-split rp-aligned-split">
            <Photo name="adult" alt="업무 중 잠시 앉은 자세를 바꾸는 사람"/>
            <div className="pc-adult-copy">
              {copy.adult.map(([title, body], i) => <article key={title} data-ro-reveal data-ro-reveal-delay={i * 90}><h3>{title}</h3><p><Copy text={i === 0 ? body + ' [S6]' : body}/></p></article>)}
            </div>
          </div>
          <p className="care-note">{copy.adultNote}</p>
          <div className="care-links"><Link href="/centers/spine">목·허리 통증과 신경 증상 안내</Link></div>
        </div>
      </section>

      <section id="treatment" className="ro-band care-paper" aria-labelledby="pc-treatment">
        <div className="ro-wrap">
          <Heading id="pc-treatment" label="TREATMENT OPTIONS" intro={copy.treatmentLead}>평가에 따라,<br/><em>필요한 방법을 선택합니다.</em></Heading>
          <Comparison caption="치료 선택지별 목적과 확인할 점" data={copy.treatment}/>
          <p className="care-note">{copy.treatmentNote}</p>
          <p className="care-note">{copy.insuranceNote}</p>
        </div>
      </section>

      <section id="follow-up" className="ro-process ro-band" aria-labelledby="pc-follow-up">
        <div className="ro-wrap">
          <Heading id="pc-follow-up" label="CONNECTED CARE">처음의 평가를,<br/><em>다음 진료의 기준으로 삼습니다.</em></Heading>
          <ol className="ro-process-steps ro-process-sequence" data-ro-reveal>{copy.process.map(([title, body], i) => (
            <li key={title}><span className="ro-point" aria-hidden="true"/><small>{String(i + 1).padStart(2, '0')}</small><h3>{title}</h3><p>{body}</p></li>
          ))}</ol>
          <RecoveryBeam stages={orbitStages} caption="일상에서 다시 확인하는 변화" centerTitle="생활 목표" centerDetail="나의 일상" label="생활 목표를 중심으로 일상 활동, 움직임, 척추 경과와 실천을 확인합니다."/>
          <Prompts items={copy.progress}/>
          <p className="care-note">{copy.progressNote}</p>
        </div>
      </section>

      <section id="referral" className="ro-band rp-summary" aria-labelledby="pc-referral">
        <div className="ro-wrap care-narrow">
          <Heading id="pc-referral" label="WHEN TO SEEK CARE" intro={copy.referralLead}>필요한 진료의 시기를 <em>함께 판단합니다.</em></Heading>
          <div className="care-safety pc-referral" data-ro-reveal>
            <h3>보조기와 전문 진료를 검토할 때</h3>
            <p><Copy text={copy.brace}/></p>
            <Prompts items={copy.referral}/>
            <p className="care-note">{copy.referralNote}</p>
          </div>
        </div>
      </section>

      <section id="visit-guide" className="ro-band" aria-labelledby="pc-visit">
        <div className="ro-wrap care-narrow">
          <Heading id="pc-visit" label="VISIT DANAUN">이전 검사와 <em>생활 속 불편함을 함께 알려주세요.</em></Heading>
          <div className="care-location" data-ro-reveal>
            <Prompts items={copy.visit}/>
            <h3>동천동·수지에서 척추와 체형 평가를 찾는 분께</h3>
            <p>{copy.visitLead}</p>
            <p>{copy.visitNote}</p>
            <address><strong>다나은재활의학과의원</strong><br/>주소 준비 중</address>
            <div className="care-links"><Link href="/visit">진료시간·오시는 길 확인</Link><Link href="/about/doctor">담당 의료진 소개</Link></div>
          </div>
        </div>
      </section>

      <section id="faq" className="ro-faq ro-faq-expanded ro-band" aria-labelledby="pc-faq">
        <div className="ro-wrap ro-faq-grid">
          <div className="ro-faq-heading">
            <p className="ro-label" lang="en">QUESTIONS & ANSWERS</p>
            <h2 id="pc-faq" aria-label="척추·체형 교정 센터 자주 묻는 질문">FAQ</h2>
            <p>척추측만증과 체형 평가, 자주 묻는 질문</p>
          </div>
          <div className="ro-faq-groups">
            {faqGroups.map(([title, start, end]) => (
              <section className="ro-faq-group" aria-labelledby={'pc-faq-' + start} key={title}>
                <h3 id={'pc-faq-' + start}>{title}</h3>
                <ol start={start + 1}>{copy.faqs.slice(start, end).map(([number, question, answer]) => (
                  <li className="ro-faq-answer" key={number}><span aria-hidden="true">{number}</span><div><h4>{question}</h4><p><Copy text={answer}/></p></div></li>
                ))}</ol>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section id="references" className="ro-band care-paper care-sources" aria-labelledby="pc-references">
        <div className="ro-wrap care-narrow">
          <Heading id="pc-references" label="REFERENCES" intro={copy.referenceLead}>근거를 확인하고,<br/><em>내 상태에 맞게 적용합니다.</em></Heading>
          <p className="care-note"><Copy text={copy.research}/></p>
          <ul>{copy.sources.map(([id, title, url]) => <li id={'pc-source-' + id} key={id}><span>{id}</span><a href={url} target="_blank" rel="noreferrer">{title} ↗</a></li>)}</ul>
          <p className="care-note">자료 확인 <time dateTime="2026-11-15">2026.11.15</time> · 의료진 검토 완료</p>
          <ResearchReferenceLink path="/centers/posture"/>
        </div>
      </section>
    </main>
    <HomeFooter/>
    <div className="mobile-actions"><a href="/visit">전화 상담</a><a href={booking} target="_blank" rel="noreferrer">예약 안내 ↗</a><a href="/visit">오시는 길</a></div>
  </div>;
}
