import ResearchReferenceLink from './ResearchReferenceLink';
import SiteHeader from './SiteHeader';
import HomeFooter from './HomeFooter';
import CenterCareProgram from './CenterCareProgram';
import { booking, CenterTabs } from './DetailShell';
import RegenOverviewMotion from './RegenOverviewMotion';
import RecoveryBeam from './RecoveryBeam';
import * as copy from '../data/breast-cancer-rehab';

const symptomPhotos = ['dressing', 'ring', 'reach', 'outing'];
const symptomSources = [' [S1]', ' [S2]', ' [S3]', ' [S4]'];
const guideSources = [' [S1]', ' [S3]', ' [S2, S5]', ' [S4]'];
const faqGroups = [['수술 후 재활과 증상', 0, 5], ['방문 준비와 경과 확인', 5, 9]];
const orbitStages = [
  { title: '움직임', detail: '어깨·팔과 일상 동작', position: 'top' },
  { title: '부종', detail: '붓기와 무거움', position: 'right' },
  { title: '피로', detail: '활동 후의 반응', position: 'bottom' },
  { title: '치료 계획', detail: '암 치료 일정과 제한', position: 'left' },
];

function Copy({ text }) {
  return text.split(/(\[(?:S|K)\d+(?:, (?:S|K)\d+)*\])/).map((part) => {
    if (!/^\[[SK]\d/.test(part)) return part;
    return <sup className="care-citations" key={part}>{part.slice(1, -1).split(', ').map((id) => (
      <a key={id} href={'#br-source-' + id} aria-label={copy.sources.find(([source]) => source === id)?.[1]}>{id}</a>
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

function Photo({ name, alt, direction = 'left' }) {
  return <figure className="rp-photo" data-ro-reveal={direction}>
    <img src={'/images/breast-rehab-' + name + '.webp'} alt={alt} loading="lazy" decoding="async"/>
  </figure>;
}

function Rows({ items }) {
  return <ol className="ro-evaluation-list rp-rows">{items.map(([title, body], index) => (
    <li key={title} data-ro-reveal data-ro-reveal-delay={index * 90}>
      <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <div><h3>{title}</h3><p><Copy text={body}/></p></div>
    </li>
  ))}</ol>;
}

function Link({ href, children }) {
  return <a className="ro-link" href={href}>{children} <span aria-hidden="true">↗</span></a>;
}

function SafetyLink() {
  return <a className="br-safety-link" href="#safety">빠른 확인이 필요한 증상 <span aria-hidden="true">↓</span></a>;
}

export default function BreastCancerRehab() {
  return <div className="regen-overview center-detail breast-rehab">
    <a className="skip" href="#main">본문 바로가기</a>
    <SiteHeader/>
    <main id="main">
      <RegenOverviewMotion visibleOnly/>
      <section id="top" className="ro-hero" aria-labelledby="br-title">
        <picture className="ro-hero-image">
          <source media="(max-width:640px)" srcSet="/images/breast-rehab-hero-mobile.webp"/>
          <img src="/images/breast-rehab-hero.webp" alt="" fetchPriority="high"/>
        </picture>
        <div className="ro-hero-content">
          <p className="ro-label" lang="en">BREAST CANCER REHABILITATION</p>
          <p className="ro-hero-sub">다나은재활의학과의원 · 유방암 치료 과정과 이후의 기능 회복을 위한 진료</p>
          <h1 id="br-title"><em>유방암 재활 센터</em></h1>
          <p><strong>암 치료의 계획을 존중하며, 어깨와 팔의 일상을 함께 살핍니다.</strong><br/>
            팔을 올릴 때의 불편, 붓기와 무거움, 겨드랑이 당김과 체력 저하를 확인합니다.
            치료 일정과 몸의 상태에 맞춰 재활과 생활 관리의 방향을 함께 정합니다.</p>
          <div className="ro-hero-links">
            <a className="ro-link" href="#assessment">다나은의 평가 과정 <span aria-hidden="true">↓</span></a>
            <a className="ro-link" href="#visit-info">첫 방문 준비 <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>
      <CenterTabs active="breast-cancer-rehab" variant="regen"/>

      <section id="overview" className="ro-intro ro-concept ro-band" aria-labelledby="br-overview">
        <div className="ro-wrap">
          <div className="ro-concept-definition">
            <h2 id="br-overview" data-ro-title>수술 뒤 어깨와 팔, <br/><span>일상으로 돌아가는 길을 함께 설계합니다</span></h2>
            <p><Copy text={copy.definition}/></p>
          </div>
          <div className="center-care-targets" data-ro-reveal>
            <h3 id="br-rehab-targets">주로 살피는 증상</h3>
            <ul aria-labelledby="br-rehab-targets">
              {copy.rehabTargets.map(target => <li key={target}>{target}</li>)}
            </ul>
          </div>
          <CenterCareProgram id="br-reset-care" title="다나은 케어"
            intro="부종 관리부터 어깨 움직임, 근력과 체력 회복까지 현재 상태에 맞춰 재활을 계획합니다."
            items={copy.resetCare}
            note="급여·산정특례 적용 범위를 확인한 뒤 치료 항목과 일정을 개별적으로 구성합니다."/>
          <div className="br-program-guidance" data-ro-reveal>
            <p><strong>치료 중 협진</strong> 항암·방사선 등 암 치료 중에는 종양 주치의와 협진하는 것을 원칙으로 하며, 치료 일정과 제한사항을 확인해 재활 계획을 조정합니다.</p>
            <p><strong>독립된 진료 공간</strong> 프라이버시를 지킬 수 있도록 독립된 공간을 안내하고, 진찰에 필요한 부위와 방법을 먼저 설명합니다.</p>
          </div>
          <a className="ro-link center-treatment-link" href="#treatment">재활 치료 자세히 보기 <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section id="symptoms" className="ro-band rp-summary" aria-labelledby="br-symptoms">
        <div className="ro-wrap">
          <Heading id="br-symptoms" label="WHEN TO VISIT">수술 뒤, <em>이런 일상이 어려워졌나요?</em></Heading>
          <div className="care-symptom-grid">
            {copy.symptoms.map(([title, body], i) => (
              <article className="care-symptom-card" key={title} data-ro-reveal data-ro-reveal-delay={i * 100}>
                <img src={'/images/breast-rehab-' + symptomPhotos[i] + '.webp'} width="600" height="400" alt="" loading="lazy" decoding="async"/>
                <div><h3>{title}</h3><p><Copy text={body + symptomSources[i]}/></p></div>
              </article>
            ))}
          </div>
          <p className="care-note">{copy.earlySafety} <SafetyLink/></p>
        </div>
      </section>

      <section id="keyword-guide" className="ro-band br-guide" aria-labelledby="br-guide">
        <div className="ro-wrap">
          <Heading id="br-guide" label="AFTER BREAST CANCER SURGERY">유방암 수술 후 재활,<br/><em>어깨와 팔의 일상 기능부터</em></Heading>
          <div className="br-guide-grid">
            {copy.guide.map(([title, body], i) => <article key={title} data-ro-reveal data-ro-reveal-delay={i * 90}><h3>{title}</h3><p><Copy text={body + guideSources[i]}/></p></article>)}
          </div>
        </div>
      </section>

      <section id="assessment" className="ro-precision ro-band" aria-labelledby="br-assessment">
        <div className="ro-wrap">
          <Heading id="br-assessment" label="PRECISION FIRST">치료받은 과정과,<br/><em>현재의 불편을 함께 확인합니다.</em></Heading>
          <div className="ro-split rp-split rp-aligned-split">
            <Photo name="assessment" alt="환자가 팔을 움직이는 범위를 의료진이 옆에서 확인하는 모습"/>
            <Rows items={copy.assessment}/>
          </div>
          <div className="care-links"><Link href="/diagnosis">기능 평가와 진료 안내</Link><Link href="/about/doctor">샘플 의료진 소개</Link></div>
        </div>
      </section>

      <section id="timing" className="ro-personal ro-personal-parallax ro-band br-timing" aria-labelledby="br-timing">
        <div className="journey-backdrop" aria-hidden="true"><img src="/images/breast-rehab-hero.webp" alt="" loading="lazy" decoding="async"/></div>
        <div className="ro-wrap ro-personal-layout">
          <div className="ro-personal-copy" data-ro-reveal>
            <p className="ro-label" lang="en">WHEN TO BEGIN</p>
            <h2 id="br-timing">수술 후 며칠째보다,<br/><em>지금 허용된 범위를 먼저 봅니다.</em></h2>
            <p><Copy text={copy.timingLead}/></p>
            <p>{copy.timingNote}</p>
          </div>
          <dl className="br-timing-list">
            {copy.timing.map(([title, body], i) => <div key={title} data-ro-reveal data-ro-reveal-delay={i * 80}><dt>{title}</dt><dd>{body}</dd></div>)}
          </dl>
        </div>
      </section>

      <section id="treatment" className="ro-band" aria-labelledby="br-treatment">
        <div className="ro-wrap">
          <Heading id="br-treatment" label="SHOULDER & ARM">어깨의 움직임과,<br/><em>당김이 생기는 부위를 함께 살핍니다.</em></Heading>
          <div className="br-stories">
            {copy.treatment.map(([title, body], i) => (
              <article className={'ro-split rp-split care-story br-story' + (i ? ' br-story-reverse' : '')} key={title}>
                <Photo name={i ? 'reach' : 'dressing'} alt={i ? '소매를 입은 채 팔을 천천히 드는 모습' : '가디건의 소매에 팔을 넣는 모습'} direction={i ? 'right' : 'left'}/>
                <div data-ro-reveal><h3>{title}</h3><p><Copy text={body}/></p></div>
              </article>
            ))}
          </div>
          <p className="care-note">{copy.treatmentNote}</p>
          <div className="care-links"><Link href="/diagnosis/movement">움직임 평가 알아보기</Link></div>
        </div>
      </section>

      <section id="lymphedema" className="ro-band care-paper" aria-labelledby="br-lymphedema">
        <div className="ro-wrap">
          <Heading id="br-lymphedema" label="LYMPHEDEMA CARE" intro={copy.lymphedemaLead}>붓기의 원인을 확인하고,<br/><em>지속할 수 있는 관리 방법을 찾습니다.</em></Heading>
          <div className="ro-split rp-split rp-aligned-split">
            <Photo name="arm-doctor" alt="샘플 의료진이 환자의 팔과 손 상태를 살피는 장면을 재현한 이미지"/>
            <Rows items={copy.lymphedema}/>
          </div>
          <p className="care-note"><strong>붓기 관리의 목표와 한계를 함께 설명합니다.</strong> <SafetyLink/></p>
        </div>
      </section>

      <section id="fatigue" className="ro-band" aria-labelledby="br-fatigue">
        <div className="ro-wrap">
          <Heading id="br-fatigue" label="FATIGUE & STRENGTH" intro={copy.fatigueLead}>지친 몸에 필요한 활동량을,<br/><em>현재 상태에 맞춰 조절합니다.</em></Heading>
          <div className="ro-split rp-split rp-aligned-split">
            <Photo name="fatigue" alt="외출 중 벤치에 앉아서 잠시 쉬는 모습"/>
            <Rows items={copy.fatigue}/>
          </div>
          <p className="care-note">{copy.fatigueNote}</p>
        </div>
      </section>

      <section id="follow-up" className="ro-process ro-band" aria-labelledby="br-follow-up">
        <div className="ro-wrap">
          <Heading id="br-follow-up" label="DANAUN CARE" intro={copy.followUpLead}>다나은 케어,<br/><em>일상에서 달라진 점까지 확인합니다.</em></Heading>
          <ol className="ro-process-steps ro-process-sequence" data-ro-reveal>{copy.process.map(([title, body], i) => (
            <li key={title}><span className="ro-point" aria-hidden="true"/><small>{String(i + 1).padStart(2, '0')}</small><h3>{title}</h3><p>{body}</p></li>
          ))}</ol>
          <RecoveryBeam stages={orbitStages} caption="일상에서 함께 확인하는 변화" centerTitle="생활 목표" centerDetail="나의 일상" label="생활 목표를 중심으로 움직임, 부종, 피로와 암 치료 계획을 살핍니다."/>
          <ul className="care-prompt-list">{copy.progress.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section id="safety" className="ro-band care-paper" aria-labelledby="br-safety">
        <div className="ro-wrap care-narrow">
          <Heading id="br-safety" label="WHEN TO SEEK CARE">이런 변화는 <em>먼저 의료진에게 알려주세요.</em></Heading>
          <div className="br-safety-grid">
            {copy.safety.map(([title, body], i) => <article className="care-safety" key={title} data-ro-reveal data-ro-reveal-delay={i * 90}><h3>{title}</h3><p><Copy text={body}/></p></article>)}
          </div>
        </div>
      </section>

      <section id="visit-info" className="ro-band" aria-labelledby="br-visit">
        <div className="ro-wrap care-narrow">
          <Heading id="br-visit" label="VISIT DANAUN">인근 역·동천동에서,<br/><em>수술 후 어깨와 팔의 불편을 상담하고 싶다면.</em></Heading>
          <div className="care-location" data-ro-reveal>
            <p>{copy.visitLead}</p>
            <h3>처음 방문할 때 준비하면 좋은 자료</h3>
            <ul className="care-prompt-list">{copy.visitPrep.map((item) => <li key={item}>{item}</li>)}</ul>
            <p className="care-note">{copy.visitNote}</p>
            {copy.visitInfo.map(([title, body]) => <article key={title}><h3>{title}</h3><p><Copy text={body}/></p></article>)}
            <address><strong>다나은재활의학과의원</strong><br/>주소 준비 중</address>
            <div className="care-links"><Link href="/visit">진료시간·오시는 길</Link><Link href="/about/doctor">샘플 의료진 소개</Link></div>
          </div>
        </div>
      </section>

      <section id="faq" className="ro-faq ro-faq-expanded ro-band" aria-labelledby="br-faq">
        <div className="ro-wrap ro-faq-grid">
          <div className="ro-faq-heading">
            <p className="ro-label" lang="en">QUESTIONS & ANSWERS</p>
            <h2 id="br-faq" aria-label="유방암 재활 센터 자주 묻는 질문">FAQ</h2>
            <p>유방암 재활, 자주 묻는 질문</p>
          </div>
          <div className="ro-faq-groups">
            {faqGroups.map(([title, start, end]) => (
              <section className="ro-faq-group" aria-labelledby={'br-faq-' + start} key={title}>
                <h3 id={'br-faq-' + start}>{title}</h3>
                <ol start={start + 1}>{copy.faqs.slice(start, end).map(([number, question, answer]) => (
                  <li className="ro-faq-answer" key={number}><span aria-hidden="true">{number}</span><div><h4>{question}</h4><p><Copy text={answer}/></p></div></li>
                ))}</ol>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section id="references" className="ro-band care-paper care-sources" aria-labelledby="br-references">
        <div className="ro-wrap care-narrow">
          <Heading id="br-references" label="REFERENCES" intro={copy.referenceNote}>참고 자료와 <em>작성 안내</em></Heading>
          <ul>{copy.sources.map(([id, title, url]) => <li id={'br-source-' + id} key={id}><span>{id}</span><a href={url} target="_blank" rel="noreferrer">{title} ↗</a></li>)}</ul>
          <p className="care-note">자료 확인 <time dateTime="2026-11-15">2026.11.15</time> · 의료진 검토 완료</p>
          <ResearchReferenceLink path="/centers/breast-cancer-rehab"/>
        </div>
      </section>
    </main>
    <HomeFooter/>
    <div className="mobile-actions"><a href="/visit">전화 상담</a><a href={booking} target="_blank" rel="noreferrer">예약 안내 ↗</a><a href="/visit">오시는 길</a></div>
  </div>;
}
