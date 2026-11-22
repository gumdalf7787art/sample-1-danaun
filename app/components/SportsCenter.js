import ResearchReferenceLink from './ResearchReferenceLink';
import SiteHeader from './SiteHeader';
import HomeFooter from './HomeFooter';
import CenterCareProgram from './CenterCareProgram';
import { booking, CenterTabs } from './DetailShell';
import RegenOverviewMotion from './RegenOverviewMotion';
import {
  overview, injuryTargets, symptoms, injuryContext, assessments, carePlan, sports, treatmentFlow, treatments,
  recovery, returnCriteria, tracking, firstVisit, faqs, sources,
} from '../data/sports-center';

const faqGroups = [
  ['스포츠손상과 진료', 0, 6],
  ['치료 선택과 재활', 6, 11],
  ['운동 복귀와 방문 준비', 11, 18],
];

function Heading({ id, label, children, description }) {
  return (
    <div className="ro-heading" data-ro-reveal>
      <p className="ro-label" lang="en">{label}</p>
      <h2 id={id}>{children}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Rows({ items, className = 'ro-evaluation-list rp-rows' }) {
  return (
    <ol className={className}>
      {items.map(([title, body], index) => (
        <li key={title} data-ro-reveal data-ro-reveal-delay={index * 100}>
          <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div><h3>{title}</h3><p>{body}</p></div>
        </li>
      ))}
    </ol>
  );
}

function Link({ href, children }) {
  return <a className="ro-link" href={href}>{children} <span aria-hidden="true">↗</span></a>;
}

function Photo({ name, alt, direction = 'left' }) {
  return (
    <figure className="rp-photo" data-ro-reveal={direction} data-ro-reveal-delay={0}>
      <img src={'/images/' + name} alt={alt} loading="lazy" decoding="async"/>
    </figure>
  );
}

function Backdrop({ image }) {
  return (
    <div className="journey-backdrop" aria-hidden="true">
      <img src={'/images/' + image} alt="" loading="lazy" decoding="async"/>
    </div>
  );
}

function RecoveryTable({ caption, heading, rows }) {
  return (
    <div className="rp-table-wrap">
      <table className="rp-table">
        <caption>{caption}</caption>
        <thead><tr><th scope="col">{heading}</th><th scope="col">살펴보는 내용</th></tr></thead>
        <tbody>
          {rows.map(([label, body]) => (
            <tr key={label}><th scope="row">{label}</th><td>{body}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SportsCenter() {
  return (
    <div className="regen-overview">
      <a className="skip" href="#main">본문 바로가기</a>
      <SiteHeader/>
      <main id="main">
        <RegenOverviewMotion/>
        <section className="ro-hero" aria-labelledby="sports-title">
          <picture className="ro-hero-image">
            <source media="(max-width:640px)" srcSet="/images/sports-center-hero-mobile.webp"/>
            <img src="/images/sports-center-hero.webp" alt="" fetchPriority="high"/>
          </picture>
          <div className="ro-hero-content">
            <p className="ro-label" lang="en">DANAUN SPORTS</p>
            <p className="ro-hero-sub">다나은재활의학과 · 손상 평가와 운동 재활</p>
            <h1 id="sports-title"><em>스포츠손상 센터</em></h1>
            <p>다시 뛰기 위해, 손상된 조직과 움직임을 함께 봅니다.<br/>현재의 상태와 돌아가고 싶은 운동에 맞춰 치료와 재활을 계획합니다.</p>
            <div className="ro-hero-links">
              <a className="ro-link" href="#recovery">다나은의 진료 과정 <span aria-hidden="true">↓</span></a>
              <Link href="/support/booking">진료·예약 안내</Link>
            </div>
          </div>
        </section>
        <CenterTabs active="sports" variant="regen"/>

        <section className="ro-intro ro-concept ro-band" id="overview" aria-labelledby="overview-title">
          <div className="ro-wrap">
            <div className="ro-concept-definition">
              <h2 id="overview-title" data-ro-title>다시 뛰기 위해, <br/><span>손상된 조직과 몸의 균형을 함께 봅니다.</span></h2>
              <p>{overview[0]}</p>
              <p>{overview[1]}</p>
            </div>
            <div className="center-care-targets" data-ro-reveal>
              <h3 id="sports-injury-targets-title">주로 살피는 스포츠손상</h3>
              <ul aria-labelledby="sports-injury-targets-title">
                {injuryTargets.map(target => <li key={target}>{target}</li>)}
              </ul>
            </div>
            <CenterCareProgram id="sports-recovery-program-title" title="다나은 리커버리" duration="8주"
              intro="손상 평가부터 1:1 운동치료와 복귀 테스트까지 이어지는 스포츠손상 재활 프로그램입니다."
              items={[['초음파 진단', '2회'], ['재생주사', '1~3회'], ['1:1 운동치료', '8회'], ['복귀 테스트', '복귀 준비도 평가']]}
              note="위 횟수는 대표 구성입니다. 주사 시행 여부와 치료 일정은 진찰 결과에 따라 조정하며, 운동 복귀 시점은 테스트와 회복 경과를 바탕으로 판단합니다."/>
            <a className="ro-link center-treatment-link" href="#treatment">치료 선택 과정 보기 <span aria-hidden="true">↓</span></a>
            <p className="ro-note">{overview[2]} <a href="#first-visit">주의사항 확인 ↓</a></p>
          </div>
        </section>

        <section id="symptoms" className="ro-band rp-summary" aria-labelledby="symptoms-title">
          <div className="ro-wrap">
            <div className="rp-summary-layout">
              <div className="rp-summary-copy">
                <div data-ro-reveal>
                  <p className="ro-label" lang="en">WHEN TO VISIT</p>
                  <h2 id="symptoms-title">운동할 때 반복되는 불편,<br/><em>이런 경우 함께 살펴봅니다.</em></h2>
                </div>
                <Rows items={symptoms}/>
              </div>
              <figure className="rp-summary-photo" data-ro-reveal="right" data-ro-reveal-delay={0}>
                <img src="/images/center-care-1.webp" width="800" height="1000" alt="발목의 상태를 살피는 진찰 예시" loading="lazy" decoding="async"/>
              </figure>
            </div>
            <p className="rp-note">위 증상만으로 질환을 진단할 수는 없습니다. 골절이나 관절 내부 손상 등 추가 평가가 필요한지 진찰을 통해 구분합니다.</p>
          </div>
        </section>

        <section id="injury-context" className="ro-why ro-band" aria-labelledby="injury-title">
          <div className="ro-wrap">
            <Heading id="injury-title" label="HOW IT STARTED" description="어디가 아픈지와 함께 어떤 운동을, 얼마나, 어떤 방식으로 해왔는지 묻습니다.">
              갑자기 다친 통증과,<br/><em>반복해서 생긴 통증을 구분합니다.</em>
            </Heading>
            <div className="ro-comparison ro-comparison-photos">
              {injuryContext.map(([title, body], index) => (
                <article key={title} data-ro-reveal={index === 0 ? 'left' : 'right'} data-ro-reveal-delay={0}>
                  <img src={index === 0 ? '/images/regen-pain-640.webp' : '/images/sports-center-hero.webp'} alt="" width="640" height="427" loading="lazy" decoding="async"/>
                  <div className="ro-comparison-copy">
                    <span>{index === 0 ? '01 · 급성 손상' : '02 · 과사용 손상'}</span>
                    <h3>{title}</h3><p>{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ro-precision ro-band" id="assessment" aria-labelledby="assessment-title">
          <div className="ro-wrap">
            <Heading id="assessment-title" label="PRECISION FIRST" description="검사와 평가 항목은 증상과 진찰 소견에 따라 선택합니다.">
              손상 부위에 더해,<br/><em>돌아가고 싶은 움직임을 살핍니다.</em>
            </Heading>
            <div className="ro-split rp-split rp-aligned-split">
              <Photo name="regen-ultrasound-focus-1120.webp" alt="무릎과 주변 조직을 초음파로 살피는 장면 예시"/>
              <Rows items={assessments}/>
            </div>
            <div className="ro-center"><Link href="/diagnosis">정밀 진단 알아보기</Link></div>
          </div>
        </section>

        <section className="ro-personal ro-personal-parallax ro-band" id="care-plan" aria-labelledby="care-plan-title">
          <Backdrop image="hero-recovery.webp"/>
          <div className="ro-wrap ro-personal-layout">
            <div className="ro-personal-copy" data-ro-reveal>
              <p className="ro-label" lang="en">PERSONALIZED CARE</p>
              <h2 id="care-plan-title">평가 결과를,<br/><em>나에게 필요한 치료 계획으로.</em></h2>
              <p>같은 부위가 다쳤어도 손상 정도, 이전 치료, 일상과 운동의 목표에 따라 계획이 달라질 수 있습니다.</p>
            </div>
            <Rows items={carePlan} className="ro-personal-steps"/>
          </div>
        </section>

        <section className="ro-band" id="sports" aria-labelledby="sports-examples-title">
          <div className="ro-wrap">
            <Heading id="sports-examples-title" label="SPORT BY SPORT" description="확인할 동작과 조절할 운동량은 종목과 개인의 상태에 따라 달라집니다.">
              어떤 운동으로 돌아가고 싶은지에 따라,<br/><em>살펴볼 동작도 달라집니다.</em>
            </Heading>
            <div className="ro-split rp-split rp-aligned-split">
              <ol className="ro-evaluation-list rp-rows">
                {sports.map(([title, example, body], index) => (
                  <li key={title} data-ro-reveal data-ro-reveal-delay={index * 100}>
                    <span aria-hidden="true">0{index + 1}</span>
                    <div><h3>{title}</h3><p><strong>{example}</strong></p><p>{body}</p></div>
                  </li>
                ))}
              </ol>
              <Photo name="hero-recovery-mobile.webp" alt="하지의 움직임을 확인하는 재활 평가 예시" direction="right"/>
            </div>
          </div>
        </section>

        <section className="ro-band ro-intro" id="treatment" aria-labelledby="treatment-title">
          <div className="ro-wrap">
            <Heading id="treatment-title" label="TREATMENT OPTIONS" description="보호와 활동 조절, 증상에 대한 치료, 운동 재활을 필요한 순서와 범위로 계획합니다.">
              치료는 <em>현재의 상태와 목표에 맞춰</em> 선택합니다.
            </Heading>
            <ol className="ro-process-steps center-treatment-flow" aria-label="치료 선택의 네 단계" data-ro-reveal>
              {treatmentFlow.map(([title, detail, href], index) => (
                <li key={title}>
                  <span className="ro-point" aria-hidden="true"/>
                  <small aria-hidden="true">0{index + 1}</small>
                  <h3>{href ? <a href={href}>{title}</a> : title}</h3>
                  <p>{detail}</p>
                </li>
              ))}
            </ol>
            <RecoveryTable caption="상태에 따라 검토하는 치료" heading="치료 방향" rows={treatments}/>
            <div className="rp-summary-answer" data-ro-reveal>
              <h3>주사치료은 필요성을 판단한 뒤 연결합니다.</h3>
              <p>주사치료를 고려할 때에는 진단과 치료 목적을 먼저 확인합니다. 사용 성분과 기대할 수 있는 변화, 한계와 다른 선택지를 설명합니다.</p>
              <p>주사치료에는 통증·멍·출혈·감염·알레르기 반응 등이 생길 수 있습니다. 주의사항은 약제와 시술 부위에 따라 다르며 치료 반응에도 개인차가 있습니다.</p>
              <p><Link href="/regen/injection">맞춤 주사치료 안내</Link>　<Link href="/regen/principles">주사 성분 설명 원칙</Link></p>
            </div>
          </div>
        </section>

        <section className="ro-process ro-band" id="recovery" aria-labelledby="recovery-title">
          <div className="ro-wrap">
            <Heading id="recovery-title" label="DANAUN RECOVERY" description="손상 상태와 경과에 따라 여러 단계를 병행하거나 이전 단계로 돌아가 계획을 조정할 수 있습니다.">
              다나은 리커버리,<br/><em>평가에서 활동 복귀까지.</em>
            </Heading>
            <ol className="ro-process-steps ro-process-sequence" data-ro-reveal>
              {recovery.map(([title, body], index) => (
                <li key={title}>
                  <span className="ro-point" aria-hidden="true"/><small aria-hidden="true">0{index + 1}</small>
                  <h3>{title}</h3><p>{body}</p>
                </li>
              ))}
            </ol>
            <div className="ro-followup">
              <h3>다시 할 수 있는 움직임을 확인합니다.</h3>
              <p>다나은 리커버리는 평가, 치료와 재활, 복귀 검토를 연결하는 진료 과정입니다. 방문 간격과 치료 기간은 손상 상태와 회복 경과에 따라 정합니다.</p>
            </div>
          </div>
        </section>

        <section className="ro-band" id="return-to-sport" aria-labelledby="return-title">
          <div className="ro-wrap">
            <Heading id="return-title" label="RETURN TO SPORT" description="현재의 기능과 돌아갈 운동의 부담을 함께 살펴 재개할 활동과 강도를 논의합니다.">
              운동 복귀는,<br/><em>날짜와 통증만으로 결정하지 않습니다.</em>
            </Heading>
            <Rows items={returnCriteria}/>
            <div className="rp-summary-answer" data-ro-reveal>
              <h3>활동을 재개하는 범위도 나누어 생각합니다.</h3>
              <ol className="rp-sequence">
                {['일상 활동', '조절된 운동 참여', '종목별 훈련', '목표 활동 수준 검토'].map(stage => <li key={stage}>{stage}</li>)}
              </ol>
              <p>각 단계의 시작 시점과 진행 속도는 개인마다 다릅니다. 운동량을 늘린 뒤에도 증상과 기능의 변화를 확인하며 재손상 위험을 살핍니다.</p>
            </div>
          </div>
        </section>

        <section className="ro-band ro-intro" id="follow-up" aria-labelledby="follow-up-title">
          <div className="ro-wrap">
            <Heading id="follow-up-title" label="FOLLOW-UP" description="운동량, 불편이 나타난 시점, 다음 날의 반응을 함께 확인합니다.">
              지난번보다 무엇이 달라졌는지,<br/><em>움직임에서 확인합니다.</em>
            </Heading>
            <RecoveryTable caption="진료 때 함께 볼 기록 예시" heading="기록 항목" rows={tracking}/>
            <p className="rp-note">경과가 예상과 다르면 진단과 치료 계획을 다시 검토합니다. 새롭거나 심해지는 증상은 의료진에게 알려주세요.</p>
          </div>
        </section>

        <section className="ro-band rp-dark sports-clinic" id="clinic" aria-labelledby="clinic-title">
          <div className="ro-wrap sports-clinic-layout">
            <Heading id="clinic-title" label="THE DANAUN APPROACH">
              재활의학과의 관점으로,<br/><em>손상 이후의 움직임까지 살핍니다.</em>
            </Heading>
            <figure className="sports-clinic-portrait" data-ro-reveal="right" data-ro-reveal-delay={0}>
              <img src="/images/danaun-doctor.png" width="780" height="1280" alt="팔짱을 낀 샘플 의료진의 프로필" loading="lazy" decoding="async"/>
            </figure>
            <div className="sports-clinic-copy">
              <Rows items={[
                ['샘플 의료진 · 재활의학과 전문의', '통증을 느끼는 부위와 생활·운동에서의 기능을 함께 살핍니다.'],
                ['회복', '조직 상태와 증상·기능의 변화를 살펴 치료 방향을 조정합니다.'],
                ['안정성', '운동에 필요한 힘과 움직임 조절 능력을 고려해 활동 범위를 계획합니다.'],
              ]}/>
              <div className="sports-clinic-links">
                <Link href="/about/doctor">의료진 소개</Link>
                <Link href="/about/doctor#philosophy">다나은의 진료 철학</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="ro-intro ro-band" id="first-visit" aria-labelledby="visit-title">
          <div className="ro-wrap">
            <Heading id="visit-title" label="BEFORE YOUR VISIT">
              첫 진료에서는,<br/><em>다친 순간과 돌아가고 싶은 활동을 알려주세요.</em>
            </Heading>
            <Rows items={[
              ['준비하면 도움이 되는 정보', firstVisit.join(' · ') + '. 움직임을 확인하기 편한 옷을 준비해 주세요.'],
              ['빠른 진료가 필요한 신호', '외상 후 체중을 싣기 어렵거나 관절 모양이 달라졌을 때, 통증이나 부종이 심하거나 빠르게 커질 때에는 운동을 중단하고 신속히 진료받으세요. 손발의 감각이 떨어지거나 차갑고 창백해지는 변화, 뚜렷한 근력 저하가 있을 때에도 지체하지 마세요.'],
              ['119 또는 응급실을 이용해야 할 때', '머리를 다친 뒤 의식 저하나 반복 구토가 있거나, 운동 중 흉통·심한 호흡곤란·실신이 발생하면 119 또는 응급실을 이용하세요.'],
              ['치료 이후에도 확인해 주세요', '시술 부위의 통증이 심해지거나 발열·붉어짐·붓기가 악화되면 의료기관에 연락해 평가받으세요. 운동 재개와 약 복용은 개별 안내를 따르세요.'],
            ]}/>
          </div>
        </section>

        <section className="ro-faq ro-faq-expanded ro-band" id="faq" aria-labelledby="ro-faq-title">
          <div className="ro-wrap ro-faq-grid">
            <div className="ro-faq-heading">
              <p className="ro-label">QUESTIONS &amp; ANSWERS</p>
              <h2 id="ro-faq-title">FAQ</h2>
              <p>스포츠손상 진료, 자주 묻는 질문</p><span>18가지 질문</span>
            </div>
            <div className="ro-faq-groups">
              {faqGroups.map(([title, start, end]) => (
                <section className="ro-faq-group" key={title}>
                  <h3>{title}</h3>
                  {faqs.slice(start, end).map(([question, answer], index) => (
                    <article className="ro-faq-answer" key={question}>
                      <span className="ro-faq-number" aria-hidden="true">{String(start + index + 1).padStart(2, '0')}</span>
                      <div><h4>{question}</h4><p>{answer}</p></div>
                    </article>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="ro-band" id="resources" aria-labelledby="resources-title">
          <div className="ro-wrap" id="references">
            <Heading id="resources-title" label="REFERENCES" description="일반 의학정보는 아래 자료를 참고해 정리했습니다. 개인의 진단과 치료는 진찰 결과에 따라 달라집니다.">
              진료를 이해하는 데 <em>도움이 되는 정보</em>
            </Heading>
            <ol className="rp-references">
              {sources.map(([title, url], index) => (
                <li key={url}><span aria-hidden="true">0{index + 1}</span><div><a href={url}>{title} ↗</a></div></li>
              ))}
            </ol>
            <ResearchReferenceLink path="/centers/sports"/>
          </div>
        </section>
      </main>
      <HomeFooter/>
    </div>
  );
}
