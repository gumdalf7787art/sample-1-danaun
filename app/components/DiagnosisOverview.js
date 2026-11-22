import ResearchReferenceLink from './ResearchReferenceLink';
import HomeFooter from './HomeFooter';
import SiteHeader from './SiteHeader';
import {DiagnosisTabs} from './DiagnosisPage';
import RegenOverviewMotion from './RegenOverviewMotion';
import {diagnosisLinks} from '../data/diagnosis';
import {
  definition, questions, perspectives, criteria, process, examples,
  explanation, followup, comparison, limits, preparation, faqs, sources,
} from '../data/diagnosis-overview';

const assessmentImages = [
  'diagnosis-assessment-1.webp',
  'diagnosis-assessment-2.webp',
  'diagnosis-assessment-3.webp',
];
const assessmentImagesAlt = ['연부조직 초음파 평가 예시', '움직임과 자세 평가 예시', '어깨와 골반의 정렬 평가 예시'];
const assessmentLabels = ['조직의 상태', '움직임의 기능', '정렬과 좌우 차이'];
const examplePhotos = [
  ['regen-function-640.webp', '무릎 움직임 범위를 확인하는 예시'],
  ['center-care-4.webp', '팔을 올릴 때 어깨 움직임을 살피는 예시'],
  ['diagnosis-assessment-3.webp', '어깨와 골반의 정렬을 살피는 예시'],
];
const faqGroups = ['진료와 검사 선택', '검사 결과와 기능 평가', '치료와 재평가'];

function Link({href, children}) {
  return <a className="ro-link" href={href}>{children}<span aria-hidden="true">↗</span></a>;
}

function Heading({id, label, description, children}) {
  return <div className="ro-heading" data-ro-reveal>
    <p className="ro-label" lang="en">{label}</p>
    <h2 id={id}>{children}</h2>
    {description && <p>{description}</p>}
  </div>;
}

function Rows({items, className = 'ro-evaluation-list rp-rows'}) {
  return <ol className={className}>
    {items.map(([title, body], index) => (
      <li key={title} data-ro-reveal data-ro-reveal-delay={index * 100}>
        <span aria-hidden="true">0{index + 1}</span>
        <div><h3>{title}</h3><p>{body}</p></div>
      </li>
    ))}
  </ol>;
}

function Source({name}) {
  const source = sources.find(([id]) => id === name);
  return <a className="diagnosis-source" href={'#source-' + name}>{source[1]}</a>;
}

export default function DiagnosisOverview() {
  return (
    <div className="regen-overview diagnosis-overview">
      <a className="skip" href="#main">본문 바로가기</a>
      <SiteHeader/>
      <main id="main">
        <RegenOverviewMotion once visibleOnly/>
        <section className="ro-hero diagnosis-overview-hero" aria-labelledby="diagnosis-title">
          <picture className="ro-hero-image">
            <img src="/images/danaun-doctor.png" alt="" fetchPriority="high"/>
          </picture>
          <div className="ro-hero-content">
            <p className="ro-label" lang="en">UNDERSTAND BEFORE WE TREAT</p>
            <p className="ro-hero-sub">증상을 듣고 · 필요한 평가를 선택하고 · 결과를 설명합니다</p>
            <h1 id="diagnosis-title"><em>정밀 진단 소개</em></h1>
            <p>치료의 시작, 내 몸을 이해하는 평가부터.<br/>
              진찰과 필요한 검사, 움직임 평가를 함께 해석해 치료와 재활의 방향을 정합니다.</p>
            <div className="ro-hero-links">
              <a className="ro-link" href="#process">다나은의 평가 과정 보기 <span aria-hidden="true">↓</span></a>
              <Link href="/support/booking">상담신청 및 예약</Link>
            </div>
          </div>
        </section>
        <DiagnosisTabs active="overview" variant="regen"/>

        <section className="ro-intro ro-concept ro-band" id="overview" aria-labelledby="definition-title">
          <div className="ro-wrap">
            <div className="ro-concept-definition">
              <h2 id="definition-title" data-ro-title>다나은의 <span>정밀 진단</span>은 무엇인가요?</h2>
              <p>{definition[0]}</p><p>{definition[1]}</p>
            </div>
            <div className="ro-concept-approach" data-ro-reveal>
              <p className="ro-label" lang="en">THE RESET APPROACH</p>
              <h3>내게 필요한 평가를 선택하고,<br/><em className="ro-concept-highlight" data-ro-highlight>그 결과가 무엇을 의미하는지 설명합니다.</em></h3>
              <p className="rp-note">{definition[3]}</p>
            </div>
          </div>
        </section>

        <section className="ro-band" id="questions" aria-labelledby="questions-title">
          <div className="ro-wrap">
            <Heading id="questions-title" label="EVERYDAY MOVEMENT" description="같은 부위의 통증이라도 시작된 상황과 불편한 동작은 다를 수 있습니다. 리셋은 환자가 느끼는 변화에서 평가를 시작합니다.">
              통증이 생긴 부위와,<br/><em>어려워진 일상을 함께 알려주세요.</em>
            </Heading>
            <div className="ro-split rp-split rp-aligned-split">
              <figure className="rp-photo diagnosis-questions-photo" data-ro-reveal="left">
                <img src="/images/regen-injection-decision-1120.webp" alt="생활 속 불편을 이야기하는 진료 상담 예시" loading="lazy" decoding="async"/>
              </figure>
              <Rows items={questions}/>
            </div>
            <p className="ro-note">위 문장은 상담 상황을 설명하기 위한 예시입니다.</p>
          </div>
        </section>

        <section className="ro-precision ro-band" id="focus" aria-labelledby="focus-title">
          <div className="ro-wrap">
            <Heading id="focus-title" label="THREE PERSPECTIVES" description="서로 다른 평가에서 얻은 정보는 진찰과 증상을 이해하는 데 참고가 됩니다. 필요한 항목과 범위는 환자의 상태에 따라 정합니다.">
              조직의 상태, 움직임, 정렬을<br/><em>연결해 살핍니다.</em>
            </Heading>
            <div className="diagnosis-overview-map" data-ro-reveal>
              <strong>증상 · 병력 · 진찰</strong>
              <ul>{assessmentLabels.map(label => <li key={label}>{label}</li>)}</ul>
              <p>문진·진찰 → 필요한 평가 선택 → 종합 해석</p>
            </div>
            <div className="ro-option-grid diagnosis-overview-options">
              {perspectives.map(([, body], index) => {
                const [title, href] = diagnosisLinks[index + 1];
                return <article className="ro-option" key={href} data-ro-reveal data-ro-reveal-delay={index * 110}>
                  <div className="ro-option-image"><img src={'/images/' + assessmentImages[index]} alt={assessmentImagesAlt[index]} width="800" height="1000" loading="lazy" decoding="async"/></div>
                  <div className="ro-option-copy"><h3>{title}</h3><p className="ro-option-feature">{assessmentLabels[index]}</p><p>{body}</p>
                    {index === 0 && <Source name="ultrasound"/>}
                    <Link href={href}>{title} 자세히 보기</Link>
                  </div>
                </article>;
              })}
            </div>
            <p className="ro-note">문진과 진찰을 바탕으로 필요한 평가를 선택합니다.</p>
          </div>
        </section>

        <section className="ro-personal ro-personal-parallax ro-band" id="criteria" aria-labelledby="criteria-title">
          <div className="journey-backdrop" aria-hidden="true"><img src="/images/hero-precision.webp" alt="" loading="lazy" decoding="async"/></div>
          <div className="ro-wrap ro-personal-layout">
            <div className="ro-personal-copy" data-ro-reveal>
              <p className="ro-label" lang="en">PERSONALIZED ASSESSMENT</p>
              <h2 id="criteria-title">어떤 평가가 필요한지는,<br/><em>진찰에서부터 결정합니다.</em></h2>
              <p>필요한 경우에는 추가 검사를 안내하고, 당장 추가 검사보다 경과 확인이 적절한 경우에는 그 이유를 설명합니다.</p>
            </div>
            <Rows items={criteria} className="ro-personal-steps"/>
          </div>
        </section>

        <section className="ro-process ro-band" id="process" aria-labelledby="process-title">
          <div className="ro-wrap">
            <Heading id="process-title" label="CARE PROCESS">이야기를 듣는 것에서,<br/><em>다음 계획을 설명하는 것까지.</em></Heading>
            <ol className="ro-process-steps ro-process-sequence" data-ro-reveal>
              {process.map(([title, body], index) => <li key={title}><span className="ro-point" aria-hidden="true"/><small aria-hidden="true">0{index + 1}</small><h3>{title}</h3><p>{body}</p></li>)}
            </ol>
            <p className="ro-note">평가 순서와 항목은 상태에 따라 달라질 수 있습니다. 진단과 치료는 각각의 필요성과 설명을 바탕으로 결정합니다.</p>
          </div>
        </section>

        <section className="ro-band" id="examples" aria-labelledby="examples-title">
          <div className="ro-wrap">
            <Heading id="examples-title" label="FROM SYMPTOMS TO CARE" description="아래는 평가가 치료 계획으로 이어지는 방식을 보여주는 설명 예시입니다. 필요한 평가와 치료는 진찰 결과에 따라 달라집니다.">
              같은 증상 이름보다,<br/><em>내게 나타나는 양상을 살핍니다.</em>
            </Heading>
            {examples.map(([title, items, note], index) => (
              <article className="diagnosis-example ro-split rp-split rp-aligned-split" key={title}>
                <div className="rp-copy diagnosis-example-summary" data-ro-reveal="left">
                  <div className="diagnosis-example-heading">
                    <img src={'/images/' + examplePhotos[index][0]} alt={examplePhotos[index][1]} width="112" height="112" loading="lazy" decoding="async"/>
                    <div><p className="ro-label">예시 0{index + 1}</p><h3>{title}</h3></div>
                  </div>
                  <p>{note}</p>{index === 2 && <Source name="scoliosis"/>}
                </div>
                <Rows items={items}/>
              </article>
            ))}
          </div>
        </section>

        <section className="ro-intro ro-band" id="results" aria-labelledby="results-title">
          <div className="ro-wrap">
            <Heading id="results-title" label="UNDERSTANDING YOUR RESULTS" description="평가에서 확인한 내용이 지금 느끼는 불편과 어떤 관련이 있는지 설명합니다.">
              결과를 들은 뒤,<br/><em>다음에 무엇을 할지 이해할 수 있도록.</em>
            </Heading>
            <div className="ro-split rp-split rp-aligned-split">
              <Rows items={explanation}/>
              <figure className="rp-photo diagnosis-results-photo" data-ro-reveal="right">
                <img src="/images/regen-evidence-consultation.webp" alt="평가 이후의 진료 방향을 설명하는 상담 예시" loading="lazy" decoding="async"/>
              </figure>
            </div>
            <p className="ro-note">궁금한 점은 설명 과정에서 질문해 주세요. 치료 방법은 평가 결과와 개인의 상황을 함께 고려해 정합니다.</p>
          </div>
        </section>

        <section className="ro-band" id="follow-up" aria-labelledby="follow-up-title">
          <div className="ro-wrap">
            <Heading id="follow-up-title" label="CARE & FOLLOW-UP">평가에서 얻은 정보는,<br/><em>치료 목표와 경과 확인으로 이어집니다.</em></Heading>

            <ol className="ro-evidence-grid diagnosis-followup-steps">
              {followup.map(([title, body], index) => <li key={title} data-ro-reveal data-ro-reveal-delay={index * 120}>
                <span aria-hidden="true">0{index + 1}</span><h3>{title}</h3><p>{body}</p>
              </li>)}
            </ol>
            <div className="rp-table-wrap diagnosis-followup-table" data-ro-reveal>
              <table className="rp-table">
                <caption>경과 확인의 예</caption>
                <thead><tr><th scope="col">처음 알려주신 불편</th><th scope="col">이후 확인할 수 있는 변화</th></tr></thead>
                <tbody>{comparison.map(([before, after]) => <tr key={before}><th scope="row">{before}</th><td>{after}</td></tr>)}</tbody>
              </table>
            </div>
            <p className="ro-note">재평가 항목과 간격은 개별적으로 정합니다.</p>
          </div>
        </section>

        <section className="ro-personal ro-personal-parallax ro-band" id="limits" aria-labelledby="limits-title">
          <div className="journey-backdrop" aria-hidden="true"><img src="/images/hero-recovery.webp" alt="" loading="lazy" decoding="async"/></div>
          <div className="ro-wrap ro-personal-layout">
            <div className="ro-personal-copy" data-ro-reveal="left">
              <p className="ro-label" lang="en">LIMITS OF ASSESSMENT</p>
              <h2 id="limits-title">확인할 수 있는 것과,<br/><em>더 살펴야 할 것을 구분합니다.</em></h2>
              <p>현재의 정보로 필요한 다음 단계를 정합니다. <Source name="exam"/></p>
            </div>
            <Rows items={limits} className="ro-personal-steps"/>
          </div>
        </section>

        <section className="ro-intro ro-band" id="prepare" aria-labelledby="prepare-title">
          <div className="ro-wrap">
            <Heading id="prepare-title" label="BEFORE YOUR VISIT">이 자료와 이야기를 <em>준비해 주세요.</em></Heading>
            <Rows items={[...preparation, ['평가 중 불편하면 바로 말씀해 주세요.', '통증을 억지로 참을 필요는 없으며, 현재 상태에 따라 범위와 동작을 조정합니다. 수술 후 제한 동작이나 넘어질 위험이 있다면 미리 알려주세요.']]}/>
            <div className="rp-summary-answer" data-ro-reveal>
              <h3>빠른 진료가 필요한 신호</h3>
              <p>외상 후 체중을 싣기 어렵거나 눈에 띄는 변형, 심한 통증이나 부종이 있으면 빠른 진료가 필요합니다. 갑자기 심해지는 근력 저하나 감각 변화도 지체하지 말고 의료기관에 알려주세요. <Source name="injury"/></p>
            </div>
          </div>
        </section>

        <section className="ro-faq ro-faq-expanded ro-band" id="faq" aria-labelledby="ro-faq-title">
          <div className="ro-wrap ro-faq-grid">
            <div className="ro-faq-heading"><p className="ro-label">QUESTIONS &amp; ANSWERS</p><h2 id="ro-faq-title">FAQ</h2><p>정밀 진단에 대해 궁금한 점</p><span>18가지 질문</span></div>
            <div className="ro-faq-groups">
              {faqGroups.map((title, group) => <section className="ro-faq-group" key={title}>
                <h3 data-ro-reveal>{title}</h3>
                {faqs.slice(group * 6, group * 6 + 6).map(([question, answer], index) => {
                  const number = group * 6 + index + 1;
                  return <article className="ro-faq-answer" key={question} data-ro-reveal>
                    <span className="ro-faq-number" aria-hidden="true">{String(number).padStart(2, '0')}</span>
                    <div><h4>{question}</h4><p>{answer}{number === 6 && <> <Source name="ultrasound"/></>}{number === 12 && <> <Source name="scoliosis"/></>}</p></div>
                  </article>;
                })}
              </section>)}
            </div>
          </div>
        </section>

        <section className="ro-band" id="references" aria-labelledby="references-title">
          <div className="ro-wrap">
            <Heading id="references-title" label="REFERENCES" description="개인별 평가와 치료 계획은 진찰 결과에 따라 달라집니다.">설명에 참고한 <em>의학정보</em></Heading>
            <ol className="rp-references">
              {sources.map(([id, title, url], index) => <li key={id} id={'source-' + id}><span aria-hidden="true">0{index + 1}</span><div><a href={url}>{title} ↗</a></div></li>)}
            </ol>
            <ResearchReferenceLink path="/diagnosis"/>
          </div>
        </section>
      </main>
      <HomeFooter/>
    </div>
  );
}
