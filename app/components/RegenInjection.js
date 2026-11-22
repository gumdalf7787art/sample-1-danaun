import ResearchReferenceLink from './ResearchReferenceLink';
import SiteHeader from './SiteHeader';
import HomeFooter from './HomeFooter';
import {RegenTabs} from './RegenPage';
import {booking} from './DetailShell';
import RegenOverviewMotion from './RegenOverviewMotion';
import RegenConsentMarquee from './RegenConsentMarquee';
import {regenPages} from '../data/regen';
import {centers} from '../data/centers';
import {injectionFaqGroups, injectionTitle, sources} from '../data/regen-injection';

const injectionTypes = [
  ['DNA 계열 주사', 'DNA 유래 성분을 쓰는 주사로, 조직 환경을 고려해 사용하는 주사제', 'hero-regen-dna-mobile.webp'],
  ['포도당 증식치료', '포도당 용액을 사용하여 인대·힘줄 부착부 등에 시행하는 증식치료', 'regen-dextrose-vial.webp'],
  ['PRP', '내 혈액에서 혈소판이 풍부한 혈장을 분리해 사용합니다.', 'regen-photo-02.webp'],
  ['PRF', '내 혈액에서 얻은 혈소판과 피브린 성분을 활용합니다.', 'regen-prf-mesh.webp'],
];

const situations = [
  ['반복되는 운동 통증', '운동을 쉬면 나아지지만 다시 시작하면 같은 부위가 불편합니다. 운동량과 동작, 관련 조직의 상태를 살핍니다.', 'hero-recovery-mobile.webp'],
  ['일상 동작의 불편', '계단을 오르거나 팔을 들고 물건을 잡을 때처럼, 어느 동작에서 증상이 나타나는지 살핍니다.', 'diagnosis-assessment-2.webp'],
  ['손상 이후 남은 불편', '다친 뒤에도 특정 동작이 어렵거나 불안정할 때, 남은 증상과 근력·움직임을 다시 평가합니다.', 'regen-function-640.webp'],
  ['치료 방향의 재검토', '치료를 받아도 불편이 남거나 반복될 때, 이전 진단과 검사, 치료 반응을 확인하고 다음 계획을 논의합니다.', 'regen-pain-640.webp'],
];

const assessments = [
  ['증상과 이전 치료', '통증이 시작된 상황과 불편한 동작, 이전 치료 반응과 복용약을 확인합니다.'],
  ['진찰', '압통, 움직임 범위, 근력과 관절의 안정성을 살핍니다.'],
  ['필요한 검사', '진찰 결과에 따라 초음파 등 필요한 검사를 선택하고 조직 상태를 확인합니다.'],
  ['치료 목표', '걷기, 팔 들기, 운동 복귀 등 회복하고 싶은 동작을 함께 정합니다.'],
];

const choices = [
  ['진단과 맞는가', '통증에 관여하는 조직과 질환에 해당 치료를 적용할 수 있는지 확인합니다.'],
  ['무엇을 개선하려는가', '통증 완화, 움직임 또는 생활 기능 개선처럼 이번 치료에서 확인할 목표를 정합니다.'],
  ['어떤 근거와 한계가 있는가', '질환과 적용 부위에 맞는 근거를 살피고 기대할 수 있는 변화와 불확실한 점을 설명합니다.'],
  ['다른 선택지는 무엇인가', '운동·생활 관리, 약물·물리치료 등을 비교합니다. 건강 상태에 따라 계획을 조정하거나 시술을 미룰 수 있습니다.'],
];

const procedure = [
  ['시술 부위와 방법 확인', '의료진이 주사 부위와 사용할 성분을 확인합니다. 환자는 시술 부위가 잘 드러나는 자세를 취합니다.'],
  ['피부 소독과 주사', '피부를 소독하고 시술에 필요한 준비를 한 뒤, 의료진이 정한 부위에 약제를 주입합니다. 부위와 방법에 따라 초음파를 활용할 수 있습니다.'],
  ['직후 상태와 관리 안내', '시술 부위를 정리하고 통증이나 어지러움 등 직후 불편이 있는지 확인합니다. 귀가 전 활동 범위와 연락이 필요한 증상을 안내합니다.'],
];

const steps = [
  ['진료와 평가', '증상, 진찰 결과와 필요한 검사를 바탕으로 방향을 정합니다. 이전 검사와 치료 기록도 함께 확인합니다.'],
  ['설명과 치료 선택', '성분과 목적, 대안과 주의사항을 설명하고 필요한 치료를 함께 결정합니다.'],
  ['시술', '주사치료에 동의한 경우 정한 부위와 방법에 따라 시술하고, 직후 상태를 확인합니다.'],
  ['재평가와 회복 관리', '통증과 동작의 변화를 확인하고 치료 계획과 운동·활동량을 조정합니다.'],
];

const changes = [
  ['통증의 변화', '얼마나 아픈지, 언제 불편한지, 변화가 얼마나 이어지는지 확인합니다.'],
  ['동작의 변화', '어려웠던 움직임이 편해졌는지, 힘과 안정성이 달라졌는지 살핍니다.'],
  ['활동의 변화', '일상과 운동에 어느 정도 참여할 수 있는지, 활동 이후 증상은 어떤지 확인합니다.'],
];

function Heading({label, children, description}) {
  return (
    <div className="ro-heading" data-ro-reveal>
      <p className="ro-label">{label}</p>
      <h2>{children}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function NumberedList({items, className = 'ro-evaluation-list'}) {
  return (
    <ol className={className}>
      {items.map(([title, description], index) => (
        <li key={title} data-ro-reveal data-ro-reveal-delay={index * 100}>
          <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div><h3>{title}</h3><p>{description}</p></div>
        </li>
      ))}
    </ol>
  );
}

function InjectionPhoto({image, direction, alt}) {
  const source = '/images/regen-injection-' + image;
  return (
    <figure className="ri-scene-photo" data-ro-reveal={direction} data-ro-reveal-delay={0}>
      <img
        src={source + '-1120.webp'}
        srcSet={source + '-640.webp 640w, ' + source + '-1120.webp 1120w'}
        sizes="(max-width:640px) calc(100vw - 44px), (max-width:1272px) 44vw, 550px"
        width="1120" height="840" alt={alt} loading="lazy" decoding="async"
      />
    </figure>
  );
}

export default function RegenInjection() {
  return (
    <div className="regen-overview regen-injection">
      <a className="skip" href="#main">본문 바로가기</a>
      <SiteHeader/>
      <main id="main">
        <RegenOverviewMotion/>
        <section className="ro-hero" id="regen-main" aria-labelledby="injection-title">
          <picture className="ro-hero-image">
            <img src="/images/danaun-doctor.png" alt="" fetchPriority="high"/>
          </picture>
          <div className="ro-hero-content">
            <p className="ro-label" lang="en">DANAUN REGEN</p>
            <h1 id="injection-title"><em>{injectionTitle}</em></h1>
            <div className="ri-hero-summary">
              <p className="ri-hero-lead">다나은재활의학과 <strong>맞춤형 조직 회복 프로그램</strong></p>
              <p>통증 조절과 조직 회복을 함께 고려합니다.<br className="ro-desktop-break"/> 같은 무릎 통증이라도 손상된 조직과 상태가 다르면 치료도 달라집니다.</p>
            </div>
            <div className="ro-hero-links">
              <a className="ro-link" href="#understand">리젠 주사 알아보기 <span aria-hidden="true">↓</span></a>
              <a className="ro-link" href={booking} target="_blank" rel="noreferrer">진료 예약 <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <RegenTabs active="injection"/>

        <section className="ro-intro ro-concept ro-band" id="understand" aria-labelledby="ri-definition-title">
          <div className="ro-wrap">
            <div className="ro-concept-definition">
              <h2 id="ri-definition-title" data-ro-title><span>리젠주사</span>란?</h2>
              <div className="ro-concept-approach" data-ro-reveal>
                <h3>다나은재활의학과<br/><em className="ro-concept-highlight" data-ro-highlight>맞춤형 조직 회복 프로그램</em></h3>
              </div>
              <p>통증의 원인이 되는 인대·힘줄 등 손상 조직을 초음파로 살피고, 여러 주사치료 중 환자의 진단과 조직 상태에 따라 적합한 방법을 검토하는 맞춤형 복합 주사치료 프로그램입니다.</p>
            </div>
          </div>
        </section>

        <section className="ro-band regen-editorial ri-injection-types" id="evidence">
          <div className="ro-wrap">
            <Heading label="INJECTION TYPES" description="진료에서 치료를 선택하는 기준을 이해할 수 있도록, 주사치료의 이름과 성분을 소개합니다.">
              다나은 리젠의 <em>주사치료</em>
            </Heading>
            <ul className="ri-type-grid">
              {injectionTypes.map(([title, description, image], index) => (
                <li key={title} data-ro-reveal data-ro-reveal-delay={index * 100}>
                  <div className="therapy-image">
                    <img src={'/images/' + image} alt="" loading="lazy" decoding="async"/>
                    <span className="therapy-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="therapy-body">
                    <h3>{title}</h3>
                    <p className="therapy-description">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="ro-note">
              여기에 소개한 종류는 성분을 이해하기 위한 안내입니다. 모든 분께 같은 주사를 쓰지 않습니다.<br/>
              시술 가능 여부와 적용 대상은 진료 후 안내드리며, 치료 근거는 질환에 따라 다릅니다.
            </p>
            <div className="ri-type-links">
              <a className="ro-link" href="/regen/prp-prf">PRP·PRF 자세히 보기 <span aria-hidden="true">↗</span></a>
              <a className="ro-link" href="/insights/research">근거·연구 보기 <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="ro-wrap ro-band" id="symptoms">
          <Heading label="EVERYDAY MOVEMENT" description="반복되는 통증이나 불편한 움직임으로 치료 방향이 고민될 때, 현재 상태부터 함께 살펴봅니다.">
            이런 불편이 있다면<br/><em>원인부터 확인해 보세요.</em>
          </Heading>
          <div className="ro-option-grid">
            {situations.map(([title, description, image], index) => (
              <article className="ro-option" key={title} data-ro-reveal data-ro-reveal-delay={index * 110}>
                <div className="ro-option-image"><img src={'/images/' + image} alt="" loading="lazy" decoding="async"/></div>
                <div className="ro-option-copy"><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="ro-precision ro-band" id="content-1">
          <div className="ro-wrap" id="criteria">
            <Heading label="PRECISION FIRST" description="증상이 시작된 과정과 생활 속 불편을 듣고, 진찰로 통증 양상과 움직임을 확인합니다.">
              무엇을 보고<br/><em>치료를 결정하나요?</em>
            </Heading>
            <div className="ro-precision-layout ri-assessment-layout">
              <figure data-ro-reveal="left" data-ro-reveal-delay={0}>
                <img src="/images/regen-ultrasound-focus-1120.webp" srcSet="/images/regen-ultrasound-focus-640.webp 640w, /images/regen-ultrasound-focus-1120.webp 1120w" sizes="(max-width:640px) calc(100vw - 44px), 45vw" width="1120" height="747" alt="무릎에 탐촉자를 대고 초음파로 평가하는 예시" loading="lazy" decoding="async"/>
              </figure>
              <NumberedList items={assessments}/>
            </div>
            <p className="ro-note">초음파는 인대·힘줄·근육 등 일부 연부조직과 움직임을 살피는 데 도움이 됩니다. 확인하기 어려운 관절 내부나 깊은 구조도 있어, 진찰과 함께 해석하고 필요하면 다른 검사를 검토합니다.</p>
            <div className="ro-center"><a className="ro-link" href="/diagnosis">정밀 진단 자세히 보기 <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>

        <section className="ro-band" id="content-0">
          <div className="ro-wrap">
            <Heading label="TREATMENT DECISION" description="진단과 목표, 기대할 수 있는 변화, 개인별 주의사항을 함께 검토합니다.">
              어떤 주사가 필요한지부터 <em>판단합니다.</em>
            </Heading>
            <div className="ri-scene-layout">
              <NumberedList items={choices}/>
              <InjectionPhoto image="ultrasound-review" direction="right"
                alt="샘플 의료진을 바탕으로 제작한 초음파 화면 판독 장면"/>
            </div>
          </div>
        </section>

        <section className="ro-principles ro-principles-policy ro-band" id="principles">
          <img className="ro-consult-image" src="/images/regen-evidence-consultation.webp" alt="" loading="lazy"/>
          <div className="ro-wrap">
            <div className="ro-principles-copy" data-ro-reveal>
              <p className="ro-label">BEFORE YOUR TREATMENT</p>
              <h2>무엇을 맞는지,<br/><em>알고 맞으셔야 합니다.</em></h2>
              <p>제품과 성분, 주사 부위와 목적, 기대할 수 있는 변화와 한계, 대안과 주의사항을 설명합니다. 궁금한 점을 확인한 뒤 치료 여부를 함께 결정합니다.</p>
              <p className="ro-statement">다나은은 환자에게 설명되지 않은 스테로이드 사용 여부를 사전에 설명합니다.</p>
              <p>스테로이드가 필요한 경우에도 사용 목적과 이득·위험, 다른 선택지를 설명합니다.</p>
              <RegenConsentMarquee/>
              <a className="ro-link" href="/regen/principles">주사 성분 설명 원칙 자세히 보기 <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="ro-band ri-procedure" id="injection-procedure">
          <div className="ro-wrap">
            <Heading label="DURING YOUR INJECTION" description="리젠 주사가 적합하다고 판단하고 환자가 동의하면, 진료에서 정한 부위와 방법에 따라 시술을 진행합니다.">
              리젠 주사는 <em>어떻게 진행하나요?</em>
            </Heading>
            <div className="ri-scene-layout">
              <InjectionPhoto image="shoulder-procedure" direction="left"
                alt="샘플 의료진을 바탕으로 제작한 어깨 주사 장면"/>
              <NumberedList items={procedure}/>
            </div>
            <p className="ro-note">시술 중 평소와 다른 불편이 느껴지면 바로 의료진에게 알려주세요. <a className="ri-aftercare-link" href="#aftercare">치료 전후 안내 보기 ↓</a></p>
          </div>
        </section>

        <section className="ro-process ro-band" id="treatment-process">
          <div className="ro-wrap">
            <Heading label="CARE &amp; FOLLOW-UP" description="치료 횟수와 간격은 진단과 반응에 따라 달라집니다. 이후의 변화를 확인하면서 계획을 이어가거나 조정합니다.">
              치료 횟수와 간격도,<br/><em>나에게 맞게.</em>
            </Heading>
            <ol id="schedule" className="ro-process-steps ro-process-sequence" data-ro-reveal>
              {steps.map(([title, description], index) => (
                <li key={title}>
                  <span className="ro-point" aria-hidden="true"/>
                  <small aria-hidden="true">0{index + 1}</small>
                  <h3>{title}</h3><p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="ro-wrap ro-band" id="follow-up">
          <Heading label="DAILY RECOVERY" description="걷는 거리, 계단 오르기, 팔 들기, 운동할 때의 불편처럼 환자에게 중요한 동작이 재평가의 기준이 됩니다.">
            덜 아픈지,<br/><em>더 편하게 움직이는지.</em>
          </Heading>
          <div className="ri-change-panel" data-ro-reveal>
            <ol className="ri-change-track" aria-label="재평가에서 확인하는 세 가지 변화">
              {changes.map(([title, description], index) => (
                <li key={title} style={{'--ri-change-delay': index * 2 + 's'}}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
          </div>
          <p className="ro-note">통증이나 기능의 개선만으로 조직이 원래 상태로 돌아왔다고 판단하지 않습니다. 필요한 평가와 경과를 종합해 다음 계획을 세웁니다.</p>
        </section>

        <section className="ro-intro ro-band" id="aftercare">
          <div className="ro-wrap">
            <Heading label="BEFORE &amp; AFTER">치료 전후, <em>함께 확인해 주세요.</em></Heading>
            <NumberedList items={[
              ['치료 전 알려주세요', '복용약과 영양제, 알레르기, 동반 질환, 최근 감염이나 발열 여부를 알려주세요. 이전 검사와 치료 기록이 있다면 가져오세요. 약은 임의로 중단하지 말고 의료진과 상의하세요.'],
              ['치료 후에는 이렇게 확인하세요', '활동과 운동, 목욕·수영은 시술 부위와 성분에 따라 안내가 달라질 수 있습니다. 개인별 안내를 따르고, 다음 진료 때 좋아진 점과 남은 불편을 알려주세요.'],
              ['병원에 연락해야 할 때', '통증·붓기가 점점 심해지거나 열감·붉어짐·발열, 지속되는 출혈이 있으면 병원에 연락하거나 신속히 진료받으세요. 호흡곤란이나 얼굴·목이 붓는 등 심한 증상이 있으면 즉시 119에 도움을 요청하세요.'],
            ]}/>
            <p className="ro-note">주사치료에는 통증·멍·출혈·감염이나 약제별 이상반응이 생길 수 있습니다. 구체적인 주의사항은 사용하는 약제와 시술 방법에 맞춰 설명합니다.</p>
          </div>
        </section>

        <section className="ro-faq ro-faq-expanded ro-band" id="regen-faq" aria-labelledby="ro-faq-title">
          <div className="ro-wrap ro-faq-grid">
            <div className="ro-faq-heading">
              <p className="ro-label">QUESTIONS &amp; ANSWERS</p>
              <h2 id="ro-faq-title">FAQ</h2>
              <p>리젠 주사에 대해 궁금한 점</p>
            </div>
            <div className="ro-faq-groups">
              {Object.entries(injectionFaqGroups).map(([group, entries], groupIndex) => (
                <section className="ro-faq-group" key={group} aria-labelledby={'ri-faq-group-' + groupIndex}>
                  <h3 id={'ri-faq-group-' + groupIndex}>{group}</h3>
                  {entries.map(([question, answer], index) => (
                    <article className="ro-faq-answer" key={question}>
                      <span className="ro-faq-number" aria-hidden="true">{String(groupIndex * 4 + index + 1).padStart(2, '0')}</span>
                      <div><h4>{question}</h4><p>{answer}</p></div>
                    </article>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </section>

        <aside id="references" className="ro-review ro-wrap" aria-label="자료와 검토 안내">
          <p>자료 확인 2026.11.14 · 의료진 검토 완료. 참고 자료는 개별 검사와 시술 안내를 뒷받침하며, 환자별 치료 계획은 진료에서 확인합니다.</p>
          <ul>{sources.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noreferrer">{label} ↗</a></li>)}</ul>
          <ResearchReferenceLink path="/regen/injection"/>
          <p>관련 진료 센터</p>
          <ul>{centers.filter(center => regenPages.injection.related.includes(center.slug)).map(center => (
            <li key={center.slug}><a href={'/centers/' + center.slug}>{center.name}</a></li>
          ))}</ul>
        </aside>
      </main>
      <HomeFooter/>
      <div className="mobile-actions">
        <a href="/visit">전화 상담</a>
        <a href={booking} target="_blank" rel="noreferrer">예약 안내 ↗</a>
        <a href="/visit">오시는 길</a>
      </div>
    </div>
  );
}
