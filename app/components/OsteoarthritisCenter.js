import ResearchReferenceLink from './ResearchReferenceLink';
import SiteHeader from './SiteHeader';
import HomeFooter from './HomeFooter';
import CenterCareProgram from './CenterCareProgram';
import { booking, CenterTabs } from './DetailShell';
import RegenOverviewMotion from './RegenOverviewMotion';
import RecoveryBeam from './RecoveryBeam';
import * as copy from '../data/osteoarthritis-center';

const symptomPhotos = ['joint-center-walking.webp', 'joint-center-hip.webp', 'joint-center-hand.webp', 'joint-center-shoulder.webp'];
const faqGroups = [['증상과 진단', 0, 5], ['치료 선택', 5, 14], ['경과와 방문', 14, 18], ['부위별 질문과 치료 연결', 18, 26]];
const faqLinks = {
  5: ['/diagnosis/ultrasound', '근골격 초음파 알아보기'],
  11: ['/regen/prp-prf', 'PRP·PRF 알아보기'],
  12: ['/regen/prp-prf', 'PRP와 PRF의 차이'],
  13: ['/regen/knee-svf', '무릎 SVF 대상과 과정'],
  14: ['/regen/injection', '리젠 주사 안내'],
  23: ['#exercise', '운동과 생활 관리'],
};

const orbitStages = [
  { title: '통증', detail: '불편한 순간과 지속 시간', position: 'top' },
  { title: '기능', detail: '걷기·계단·일어서기', position: 'right' },
  { title: '활동', detail: '다시 하고 싶은 일', position: 'bottom' },
  { title: '치료 반응', detail: '달라진 점과 불편', position: 'left' },
];

function Copy({ text }) {
  return text.split(/(\[S\d+(?:, S\d+)*\]|\*\*[^*]+\*\*)/).map((part, index) => {
    if (part.startsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('[S')) {
      return <sup className="care-citations" key={index}>{part.slice(1, -1).split(', ').map((id) => (
        <a key={id} href={'#oa-source-' + id} aria-label={copy.sources.find(([source]) => source === id)?.[1]}>{id}</a>
      ))}</sup>;
    }
    return part;
  });
}

function Link({ href, children }) {
  return <a className="ro-link" href={href}>{children} <span aria-hidden="true">↗</span></a>;
}

function Heading({ id, label, children, intro }) {
  return <div className="ro-heading" data-ro-reveal>
    {label && <p className="ro-label" lang="en">{label}</p>}
    <h2 id={id}>{children}</h2>
    {intro && <p><Copy text={intro}/></p>}
  </div>;
}

function Rows({ items, className = 'ro-evaluation-list rp-rows' }) {
  return <ol className={className}>{items.map(([title, body], i) => (
    <li key={title} data-ro-reveal data-ro-reveal-delay={i * 85}>
      <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
      <div><h3>{title}</h3><p><Copy text={body}/></p></div>
    </li>
  ))}</ol>;
}

function Photo({ name, alt, direction = 'left' }) {
  return <figure className="rp-photo" data-ro-reveal={direction}>
    <img src={'/images/' + name} alt={alt} loading="lazy" decoding="async"/>
  </figure>;
}

function CopyParagraphs({ items }) {
  return items.map((item) => <p key={item}><Copy text={item}/></p>);
}

function Note({ children }) {
  return <p className="care-note"><Copy text={children}/></p>;
}

function Comparison({ caption, data }) {
  const [headings, ...rows] = data;
  return <table className="care-table" role="table">
    <caption>{caption}</caption>
    <thead role="rowgroup"><tr role="row">{headings.map((label) => <th key={label} scope="col" role="columnheader">{label}</th>)}</tr></thead>
    <tbody role="rowgroup">{rows.map(([title, ...details]) => <tr key={title} role="row">
      <th scope="row" role="rowheader">{title}</th>
      {details.map((detail, i) => <td key={headings[i+1]} role="cell"><strong aria-hidden="true">{headings[i+1]}</strong><Copy text={detail}/></td>)}
    </tr>)}</tbody>
  </table>;
}

export default function OsteoarthritisCenter() {
  return <div className="regen-overview center-detail">
    <a className="skip" href="#main">본문 바로가기</a>
    <SiteHeader/>
    <main id="main">
      <RegenOverviewMotion visibleOnly/>
      <section className="ro-hero" aria-labelledby="oa-title">
        <picture className="ro-hero-image">
          <source media="(max-width:640px)" srcSet="/images/joint-center-hero-mobile.webp"/>
          <img src="/images/joint-center-hero.webp" alt="" fetchPriority="high"/>
        </picture>
        <div className="ro-hero-content">
          <p className="ro-label" lang="en">JOINT CARE</p>
          <p className="ro-hero-sub">다나은재활의학과의원 · 관절 통증과 움직임을 함께 살피는 진료</p>
          <h1 id="oa-title"><em>퇴행성 관절염 센터</em></h1>
          <p><strong>오래 쓸 관절을 위해, 지금의 움직임부터 살핍니다.</strong><br/>
            무릎 퇴행성 관절염과 관절 통증을 평가하고, 현재 상태에 맞는 치료·운동·주사 선택과 경과 확인을 함께합니다.</p>
          <div className="ro-hero-links">
            <a className="ro-link" href="#assessment">다나은의 평가 과정 <span aria-hidden="true">↓</span></a>
            <Link href="/support/booking">진료·예약 안내</Link>
          </div>
        </div>
      </section>
      <CenterTabs active="osteoarthritis" variant="regen"/>

      <section className="ro-intro ro-concept ro-band" id="overview" aria-labelledby="oa-overview">
        <div className="ro-wrap">
          <div className="ro-concept-definition">
            <h2 id="oa-overview" data-ro-title>오래 쓸 관절을 위해, <br/><span>단계에 맞는 치료를 고릅니다</span></h2>
            <CopyParagraphs items={copy.definition}/>
          </div>
          <div className="center-care-targets" data-ro-reveal>
            <h3 id="oa-joint-targets">주로 살피는 관절염</h3>
            <ul aria-labelledby="oa-joint-targets">
              {copy.jointTargets.map(target => <li key={target}>{target}</li>)}
            </ul>
          </div>
          <CenterCareProgram id="oa-joint-program" title="리셋 조인트" duration="12주"
            intro="초음파 평가부터 근력 운동치료와 경과 확인까지 이어가는 무릎 관절염 관리 프로그램입니다."
            items={copy.jointProgram}
            note="위 항목은 대표 구성입니다. 검사와 운동치료 일정은 진찰과 회복 경과에 따라 조정합니다."/>
          <a className="ro-link center-treatment-link" href="#treatment">치료 선택 과정 보기 <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="ro-band care-paper" id="symptoms" aria-labelledby="oa-symptoms">
        <div className="ro-wrap">
          <Heading id="oa-symptoms" label="WHEN TO VISIT" intro={copy.symptomLead}>이런 움직임이 <em>불편해졌나요?</em></Heading>
          <div className="care-symptom-grid">
            {copy.symptoms.map(([label, body], i) => {
              const [joint, title] = label.split(' — ');
              return <article className="care-symptom-card" key={joint} data-ro-reveal data-ro-reveal-delay={i * 110}>
                <img src={'/images/' + symptomPhotos[i]} width="600" height="400" alt="" loading="lazy" decoding="async"/>
                <div><p className="ro-label">{joint}</p><h3>{title}</h3><p>{body}</p></div>
              </article>;
            })}
          </div>
          <Note>{copy.symptomNote}</Note>
        </div>
      </section>

      <section className="ro-band" id="knee-pain" aria-labelledby="oa-knee">
        <div className="ro-wrap care-narrow">
          <Heading id="oa-knee" label="KNEE PAIN" intro={copy.knee[0]}>무릎 통증이 있으면<br/><em>모두 퇴행성 관절염일까요?</em></Heading>
          <ul className="care-prompt-list" aria-label="무릎 통증을 평가할 때 확인하는 내용">
            {copy.kneePrompts.map((line, i) => <li key={line} data-ro-reveal data-ro-reveal-delay={i * 85}>{line}</li>)}
          </ul>
          <Note>{copy.knee[1]}</Note>
          <div className="care-links"><Link href="#assessment">무릎 통증의 평가 과정</Link><Link href="/centers/sports">외상·운동 중 손상 안내</Link></div>
        </div>
      </section>

      <section className="ro-band care-paper" aria-label="고관절과 손가락의 불편">
        <div className="ro-wrap care-joint-stories">
          <article className="ro-split rp-split care-story" id="hip-pain" aria-labelledby="oa-hip">
            <Photo name="joint-center-hip.webp" alt="의자에 앉아 양말을 신는 모습"/>
            <div data-ro-reveal="right">
              <Heading id="oa-hip" label="HIP PAIN">고관절 통증,<br/><em>사타구니와 걷기 불편을 함께 확인합니다.</em></Heading>
              <CopyParagraphs items={copy.hip}/>
              <Link href="/diagnosis/movement">관절 가동범위와 움직임 평가</Link>
            </div>
          </article>
          <article className="ro-split rp-split care-story" id="hand-arthritis" aria-labelledby="oa-hand">
            <div data-ro-reveal="left">
              <Heading id="oa-hand" label="HAND OSTEOARTHRITIS">손가락 관절염,<br/><em>쥐기·집기·돌리기의 불편을 살핍니다.</em></Heading>
              <CopyParagraphs items={copy.hand}/>
            </div>
            <Photo name="joint-center-hand.webp" alt="두 손으로 병을 잡고 뚜껑을 돌리는 모습" direction="right"/>
          </article>
        </div>
      </section>

      <section className="ro-precision ro-band" id="assessment" aria-labelledby="oa-assessment">
        <div className="ro-wrap">
          <Heading id="oa-assessment" label="PRECISION FIRST" intro={copy.assessmentLead}>어디가 아픈지부터,<br/><em>어떤 움직임이 어려운지까지.</em></Heading>
          <div className="ro-split rp-split rp-aligned-split">
            <Photo name="danaun-doctor.png" alt="진료실에서 환자와 상담하는 의료진"/>
            <Rows items={copy.assessments}/>
          </div>
          <div className="care-links"><Link href="/diagnosis">정밀 진단 소개</Link></div>
        </div>
      </section>

      <section className="ro-personal ro-personal-parallax ro-band" aria-labelledby="oa-goals">
        <div className="journey-backdrop" aria-hidden="true"><img src="/images/hero-recovery.webp" alt="" loading="lazy" decoding="async"/></div>
        <div className="ro-wrap ro-personal-layout">
          <div className="ro-personal-copy" data-ro-reveal>
            <p className="ro-label" lang="en">YOUR RECOVERY GOALS</p>
            <h2 id="oa-goals">영상에 보이는 변화와,<br/><em>생활에서 느끼는 불편을 함께 봅니다.</em></h2>
            <p><Copy text={copy.goalLead + ' [S3]'}/></p>
          </div>
          <Rows className="ro-personal-steps" items={copy.goals}/>
        </div>
      </section>

      <section className="ro-band" id="treatment" aria-labelledby="oa-treatment">
        <div className="ro-wrap">
          <Heading id="oa-treatment" label="TREATMENT OPTIONS" intro={copy.treatmentLead}>무릎 관절염 치료,<br/><em>무엇부터 시작하나요?</em></Heading>
          <ol className="ro-process-steps center-treatment-flow" aria-label="관절염 치료의 네 가지 선택 단계" data-ro-reveal>
            {copy.treatmentFlow.map(([title, detail], i) => (
              <li key={title}>
                <span className="ro-point" aria-hidden="true"/>
                <small aria-hidden="true">0{i + 1}</small>
                <h3>{title}</h3><p><Copy text={detail}/></p>
              </li>
            ))}
          </ol>
          <div className="care-treatment-grid">
            {copy.treatments.map(([title, body], i) => <article key={title} data-ro-reveal data-ro-reveal-delay={i * 110}>
              <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{body}</p>
            </article>)}
          </div>
          <Note>{copy.treatmentNote}</Note>
        </div>
      </section>

      <section className="ro-band care-paper" id="injections" aria-labelledby="oa-injections">
        <div className="ro-wrap">
          <Heading id="oa-injections" label="KNEE INJECTION COMPARISON" intro={copy.injectionLead}>무릎 관절염 주사 종류,<br/><em>성분과 목적은 어떻게 다른가요?</em></Heading>
          <Comparison caption="무릎 관절염에 사용되거나 연구되는 주사 비교" data={copy.injections}/>
          <Note>{copy.injectionNote}</Note>
          <div className="care-answers">
            {copy.injectionQuestions.map(([title, body]) => <article key={title} data-ro-reveal><h3>{title}</h3><p><Copy text={body}/></p></article>)}
          </div>
          <div className="care-regen-links">
            <h3>DANAUN REGEN과 연결해 알아보기</h3>
            <ul>{copy.injectionLinks.map(([title, body, href]) => <li key={title}><Link href={href}>{title}</Link><p>{body}</p></li>)}</ul>
            <Link href="/regen/principles">주사 성분 설명 원칙</Link>
          </div>
        </div>
      </section>

      <section className="ro-band" id="exercise" aria-labelledby="oa-exercise">
        <div className="ro-wrap">
          <Heading id="oa-exercise" label="MOVEMENT & DAILY CARE" intro={copy.exerciseLead}>무릎 관절염 운동,<br/><em>걷기와 근력 운동을 어떻게 조절하나요?</em></Heading>
          <div className="ro-split rp-split rp-aligned-split">
            <Photo name="joint-center-knee-physiotherapy.webp" alt="물리치료사가 환자의 무릎 위아래를 두 손으로 받쳐 움직임을 돕는 모습"/>
            <Rows items={copy.exercises}/>
          </div>
          <Comparison caption="생활 목표에 맞춰 운동을 고릅니다" data={copy.activities}/>
          {copy.exerciseNote.map((item) => <Note key={item}>{item}</Note>)}
          <div className="care-links"><Link href="/diagnosis/movement">관절 가동범위·근력·균형 평가</Link></div>
        </div>
      </section>

      <section className="ro-process ro-band" id="recovery" aria-labelledby="oa-recovery">
        <div className="ro-wrap">
          <Heading id="oa-recovery" label="CONNECTED CARE">치료의 변화는,<br/><em>일상의 움직임에서 다시 확인합니다.</em></Heading>
          <ol className="ro-process-steps ro-process-sequence" data-ro-reveal>{copy.process.map(([title, body], i) => (
            <li key={title}><span className="ro-point" aria-hidden="true"/><small>{String(i + 1).padStart(2, '0')}</small><h3>{title}</h3><p>{body}</p></li>
          ))}</ol>
          <RecoveryBeam stages={orbitStages} caption="일상에서 함께 확인하는 변화" centerTitle="생활 목표" centerDetail="나의 일상" label="생활 목표를 중심으로 통증, 기능, 활동과 치료 반응을 살핍니다."/>
          <ul className="care-prompt-list">{copy.progress.map((item) => <li key={item}>{item}</li>)}</ul>
          <Note>{copy.processNote + ' [S3]'}</Note>
        </div>
      </section>

      <section className="ro-band care-paper" id="safety" aria-labelledby="oa-safety">
        <div className="ro-wrap care-narrow">
          <Heading id="oa-safety" label="WHEN TO SEEK CARE">관절염으로 생각하고<br/><em>넘기지 말아야 할 때도 있습니다.</em></Heading>
          <div className="care-safety" data-ro-reveal>
            <p>{copy.safety[0]}</p>
            <h3>수술 상담이 필요한 경우</h3>
            <CopyParagraphs items={copy.safety.slice(1)}/>
          </div>
        </div>
      </section>

      <section className="ro-band" id="location" aria-labelledby="oa-location">
        <div className="ro-wrap care-narrow">
          <Heading id="oa-location" label="VISIT DANAUN">수지 무릎 통증,<br/><em>관절염 평가와 치료를 상담하세요.</em></Heading>
          <div className="care-location" data-ro-reveal>
            <CopyParagraphs items={copy.location}/>
            <address><strong>다나은재활의학과의원</strong><br/>주소 준비 중</address>
            <div className="care-links"><Link href="/visit">진료시간·오시는 길</Link><Link href="/about/doctor">샘플 의료진 소개</Link></div>
          </div>
        </div>
      </section>

      <section className="ro-faq ro-faq-expanded ro-band" id="faq" aria-labelledby="oa-faq">
        <div className="ro-wrap ro-faq-grid">
          <div className="ro-faq-heading">
            <p className="ro-label" lang="en">QUESTIONS & ANSWERS</p>
            <h2 id="oa-faq" aria-label="퇴행성 관절염, 자주 묻는 질문">FAQ</h2>
            <p>퇴행성 관절염, 자주 묻는 질문</p>
          </div>
          <div className="ro-faq-groups">
            {faqGroups.map(([title, start, end]) => <section className="ro-faq-group" aria-labelledby={'oa-faq-' + start} key={title}>
              <h3 id={'oa-faq-' + start}>{title}</h3>
              <ol start={start + 1}>{copy.faqs.slice(start, end).map(([number, question, answer]) => <li key={number} className="ro-faq-answer">
                <span aria-hidden="true">{number.padStart(2, '0')}</span>
                <div><h4>{question}</h4><p><Copy text={answer}/></p>
                  {faqLinks[number] && <Link href={faqLinks[number][0]}>{faqLinks[number][1]}</Link>}
                </div>
              </li>)}</ol>
            </section>)}
          </div>
        </div>
      </section>

      <section className="ro-band care-paper care-sources" id="references" aria-labelledby="oa-references">
        <div className="ro-wrap care-narrow">
          <Heading id="oa-references" label="REFERENCES" intro={copy.referenceNote}>참고 자료와 <em>작성 안내</em></Heading>
          <ul>{copy.sources.map(([id, title, url]) => <li id={'oa-source-' + id} key={id}><span>{id}</span><a href={url} target="_blank" rel="noreferrer">{title} ↗</a></li>)}</ul>
          <p className="care-note">작성·자료 확인 <time dateTime="2026-11-15">2026.11.15</time> · 의료진 검토 완료</p>
          <ResearchReferenceLink path="/centers/osteoarthritis"/>
        </div>
      </section>
    </main>
    <HomeFooter/>
    <div className="mobile-actions"><a href="/visit">전화 상담</a><a href={booking} target="_blank" rel="noreferrer">예약 안내 ↗</a><a href="/visit">오시는 길</a></div>
  </div>;
}
