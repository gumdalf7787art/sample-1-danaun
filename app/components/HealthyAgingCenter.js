import ResearchReferenceLink from './ResearchReferenceLink';
import SiteHeader from './SiteHeader';
import HomeFooter from './HomeFooter';
import CenterCareProgram from './CenterCareProgram';
import { booking, CenterTabs } from './DetailShell';
import RegenOverviewMotion from './RegenOverviewMotion';
import * as copy from '../data/healthy-aging-center';

const imageRoot = '/images/healthy-aging-';

function Heading({ id, label, intro, children }) {
  return <div className="ro-heading" data-ro-reveal>
    {label && <p className="ro-label" lang="en">{label}</p>}
    <h2 id={id}>{children}</h2>
    {intro && <p>{intro}</p>}
  </div>;
}

function SourceLinks({ ids }) {
  if (!ids.length) return null;
  return <sup className="care-citations">{ids.map(id => (
    <a key={id} href={'#ha-source-' + id} aria-label={copy.sources[id][0]}>{id}</a>
  ))}</sup>;
}

function Link({ href, children }) {
  return <a className="ro-link" href={href}>{children} <span aria-hidden="true">↗</span></a>;
}

function Photo({ name, alt, direction = 'left' }) {
  const src = imageRoot + name;
  return <figure className="ha-photo" data-ro-reveal={direction}>
    <img src={src + '.webp'} srcSet={src + '-small.webp 600w, ' + src + '.webp 1080w'}
      sizes="(max-width: 760px) 92vw, 45vw" width="1080" height="720" alt={alt} loading="lazy" decoding="async"/>
  </figure>;
}

function Rows({ items }) {
  return <ol className="ro-evaluation-list rp-rows">{items.map(([title, body, ...ids], i) => (
    <li key={title} data-ro-reveal data-ro-reveal-delay={i * 85}>
      <span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
      <div><h3>{title}</h3><p>{body}<SourceLinks ids={ids}/></p></div>
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

export default function HealthyAgingCenter() {
  return <div className="regen-overview center-detail healthy-aging-center">
    <a className="skip" href="#main">본문 바로가기</a>
    <SiteHeader/>
    <main id="main">
      <RegenOverviewMotion visibleOnly/>
      <section id="top" className="ro-hero" aria-labelledby="ha-title">
        <picture className="ro-hero-image">
          <source media="(max-width: 640px)" srcSet={imageRoot + 'hero-mobile.webp'}/>
          <img src={imageRoot + 'hero.webp'} alt="" fetchPriority="high" width="1500" height="1000"/>
        </picture>
        <div className="ro-hero-content">
          <p className="ro-label" lang="en">HEALTHY AGING</p>
          <p className="ro-hero-sub">다나은재활의학과의원 · 안정성·회복</p>
          <h1 id="ha-title"><em>{copy.title}</em></h1>
          <p><strong>{copy.message}</strong><br/>근력과 균형, 피부와 두피의 상태를 각각 평가하고 지금의 나에게 필요한 관리 방향을 함께 정합니다.</p>
          <div className="ro-hero-links">
            <a className="ro-link" href="#overview">진료 영역 알아보기 <span aria-hidden="true">↓</span></a>
            <Link href="/visit">진료·방문 안내</Link>
          </div>
        </div>
      </section>
      <CenterTabs active="healthy-aging" variant="regen"/>

      <section id="overview" className="ro-intro ro-concept ro-band" aria-labelledby="ha-overview">
        <div className="ro-wrap">
          <div className="ro-concept-definition">
            <h2 id="ha-overview" data-ro-title>나이 들어도 잘 움직이는 몸, <br/><span>피부와 두피의 변화도 함께 살핍니다</span></h2>
            <p data-ro-reveal>근력과 균형은 평가를 바탕으로 운동 방향을 정합니다. 피부·두피는 현재 상태와 고민을 살펴 자가혈 재생치료를 포함한 관리 방법을 상의합니다.</p>
            <p data-ro-reveal>여기서 항노화는 나이가 들면서 달라지는 기능과 일상을 살피고, 개인의 상태에 맞는 관리 목표를 세우는 것을 뜻합니다.<SourceLinks ids={['S1']}/></p>
          </div>
          <div className="center-care-targets" data-ro-reveal>
            <h3 id="ha-care-targets">주로 살피는 고민</h3>
            <ul aria-labelledby="ha-care-targets">
              {copy.agingTargets.map(target => <li key={target}>{target}</li>)}
            </ul>
          </div>
          <CenterCareProgram id="ha-aging-program" title="리셋 에이징"
            intro="두피와 피부의 고민에 따라 검토하는 두 가지 대표 구성입니다."
            items={copy.agingProgram}
            note="시술 적합성과 국내 적용 범위를 확인한 뒤 치료를 결정합니다. 실제 시술 횟수와 간격, 약물 처방은 진찰 결과에 따라 조정합니다."/>
          <a className="ro-link center-treatment-link" href="#treatment">관리와 치료 선택지 보기 <span aria-hidden="true">↓</span></a>
          <section className="ha-card-group" aria-labelledby="ha-areas">
            <h3 id="ha-areas" data-ro-reveal>건강한 노화를 위한 세 가지 진료 영역</h3>
            <ul className="ha-card-grid">
              {copy.areas.map(([title, assessment, goal, image], i) => (
                <li className="ha-care-card" key={title} data-ro-reveal data-ro-reveal-delay={i * 85}>
                  <img src={imageRoot + image + '.webp'} alt="" width="720" height="480" loading="lazy" decoding="async"/>
                  <div className="ha-card-copy">
                    <h4>{title}</h4>
                    <p>{assessment}</p>
                    <p className="ha-card-goal">{goal}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section id="symptoms" className="ro-band care-paper" aria-labelledby="ha-symptoms">
        <div className="ro-wrap">
          <Heading id="ha-symptoms" label="WHEN TO VISIT">변화의 이름보다,<br/><em>지금의 불편함을 듣습니다.</em></Heading>
          <div className="care-treatment-grid">{copy.symptoms.map(([title, body], i) => (
            <article key={title} data-ro-reveal data-ro-reveal-delay={i * 85}><span aria-hidden="true">0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>
          ))}</div>
          <p className="care-note ha-centered">새로 나타났거나 빠르게 진행하는 증상은 원인부터 확인합니다.</p>
        </div>
      </section>

      <section id="keyword-guide" className="ro-band ha-guide" aria-labelledby="ha-guide">
        <div className="ro-wrap">
          <Heading id="ha-guide" label="MOVEMENT, SKIN & SCALP" intro="다나은재활의학과의원은 증상과 원인, 현재 기능을 살펴 필요한 진료를 선택하고 경과에 따라 계획을 조정합니다.">근력 저하 재활과 <em>두피·탈모 상담</em></Heading>
          <div className="ha-guide-grid">{copy.guide.map(([title, body, ...ids], i) => (
            <article key={title} data-ro-reveal data-ro-reveal-delay={i * 85}><h3>{title}</h3><p>{body}<SourceLinks ids={ids}/></p></article>
          ))}</div>
        </div>
      </section>

      <section id="assessment" className="ro-band" aria-labelledby="ha-assessment">
        <div className="ro-wrap">
          <Heading id="ha-assessment" label="PRECISION FIRST" intro="가장 불편한 문제와 생활에서 원하는 변화를 먼저 듣고, 필요한 진찰과 추가 평가를 바탕으로 관리 방향을 설명합니다.">시술을 고르기 전에,<br/><em>상태와 목표를 확인합니다.</em></Heading>
          <div className="ha-split">
            <Photo name="consultation" alt="진료실에서 현재의 불편과 관리 목표를 상의하는 모습"/>
            <Rows items={copy.assessment}/>
          </div>
          <div className="care-links"><Link href="/diagnosis">정밀 진단 소개</Link><Link href="/about/doctor">담당 의료진 소개</Link></div>
        </div>
      </section>

      <section id="function" className="ro-band care-paper" aria-labelledby="ha-function">
        <div className="ro-wrap">
          <Heading id="ha-function" label="STRENGTH & BALANCE" intro="통증, 활동량, 영양 상태와 동반 질환이 움직임에 영향을 줄 수 있습니다. 현재 할 수 있는 동작과 불편한 동작을 확인해 운동 방향을 정합니다.">근력 저하 재활,<br/><em>생활 속 동작에서 시작합니다.</em></Heading>
          <div className="ha-split ha-reverse">
            <Photo name="function" alt="의료진이 의자에서 일어나는 동작을 살피는 모습" direction="right"/>
            <Rows items={copy.functionCare}/>
          </div>
          <div className="care-links"><Link href="/diagnosis/movement">움직임·자세 평가 보기</Link></div>
        </div>
      </section>

      <section id="skin" className="ro-band" aria-labelledby="ha-skin">
        <div className="ro-wrap">
          <Heading id="ha-skin" label="SKIN CARE" intro="건조함과 자극, 피부결과 탄력에 대한 고민은 원인과 관리 목표가 다를 수 있습니다. 현재 증상, 생활 습관과 이전 시술 후 반응까지 살핍니다.">피부결과 탄력,<br/><em>고민의 종류부터 구분합니다.</em></Heading>
          <div className="ha-split">
            <Photo name="skin-v4" alt="왼손으로 환자의 귀 위쪽과 관자놀이를 받치며 볼에 주사하는 시술 예시"/>
            <Rows items={copy.skin}/>
          </div>
        </div>
      </section>

      <section id="scalp" className="ro-band care-paper" aria-labelledby="ha-scalp">
        <div className="ro-wrap">
          <Heading id="ha-scalp" label="SCALP & HAIR" intro="모발이 가늘어지는지, 전반적으로 빠짐이 늘었는지, 일부만 비어 보이는지에 따라 확인할 내용이 달라집니다.">탈모는 빠지는 양뿐 아니라,<br/><em>양상과 원인을 봅니다.</em></Heading>
          <div className="ha-split ha-reverse">
            <Photo name="scalp-v2" alt="샘플 의료진 사진을 바탕으로 제작한 두피 주사 시술 예시" direction="right"/>
            <div data-ro-reveal><Comparison caption="모발과 두피에서 관찰할 변화" data={copy.scalp}/></div>
          </div>
          <div className="ha-scalp-note care-narrow" data-ro-reveal>
            <p>원인에 따라 치료가 달라집니다. 약물을 검토할 때는 건강 상태, 임신·수유 여부와 임신 계획, 복용약을 확인합니다.<SourceLinks ids={['S5']}/></p>
            <p>치료를 시작했다면 두피 증상과 모발 변화, 불편한 반응을 함께 확인합니다. 사진으로 경과를 살필 때에는 조명, 각도와 가르마 등 촬영 조건을 고려합니다.</p>
          </div>
        </div>
      </section>

      <section id="treatment" className="ro-band" aria-labelledby="ha-treatment">
        <div className="ro-wrap">
          <Heading id="ha-treatment" label="INFORMED CHOICE" intro="운동·생활 관리, 약물과 시술은 서로 다른 역할을 합니다. 현재 문제에 왜 필요한지, 다른 방법은 무엇인지 함께 상의합니다.">치료 이름보다,<br/><em>목적과 적용 범위를 설명합니다.</em></Heading>
          <Comparison caption="근력·균형, 피부·두피의 관리와 치료 선택지" data={copy.treatment}/>
          <div className="ha-consent">
            <Photo name="treatment-v2" alt="샘플 의료진 사진을 바탕으로 편집한 피부 주사 시술 예시"/>
            <div data-ro-reveal>
              <h3>시술을 검토할 때 확인하는 네 가지</h3>
              <ol>{['무엇을 사용하는지', '어떤 목적과 근거가 있는지', '다른 선택지와 주의사항은 무엇인지', '충분히 이해한 뒤 동의 여부 결정'].map(item => <li key={item}>{item}</li>)}</ol>
              <p>주사에는 통증, 멍, 출혈, 붓기와 감염 위험이 있을 수 있습니다. 상담 후 진단과 목표에 따라 생활 관리나 추가 평가를 먼저 권할 수 있습니다.</p>
              <Link href="/regen/principles">주사 성분 설명 원칙 보기</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="follow-up" className="ro-process ro-band care-paper" aria-labelledby="ha-follow-up">
        <div className="ro-wrap">
          <Heading id="ha-follow-up" label="RESET AGING" intro="현재의 기능과 피부·두피 고민을 나눠 살피고, 필요한 관리의 우선순위와 경과를 확인할 시점을 함께 정합니다.">리셋 에이징,<br/><em>평가와 경과를 연결합니다.</em></Heading>
          <ol className="ro-process-steps ro-process-sequence" data-ro-reveal>{copy.process.map(([title, body], i) => (
            <li key={title}><span className="ro-point" aria-hidden="true"/><small>0{i + 1}</small><h3>{title}</h3><p>{body}</p></li>
          ))}</ol>
          <section className="ha-card-group" aria-labelledby="ha-progress">
            <h3 id="ha-progress" data-ro-reveal>다음 진료에서 다시 살피는 변화</h3>
            <ul className="ha-card-grid ha-progress-grid">
              {copy.progress.map(([title, detail], i) => (
                <li className="ha-care-card ha-card-copy" key={title} data-ro-reveal data-ro-reveal-delay={i * 85}>
                  <h4>{title}</h4>
                  <p>{detail}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section id="safety" className="ro-band" aria-labelledby="ha-safety">
        <div className="ro-wrap">
          <Heading id="ha-safety" label="WHEN TO SEEK CARE">이런 변화는 <em>평가가 먼저입니다.</em></Heading>
          <div className="ha-safety-grid">{copy.safety.map(([title, body, ...ids]) => (
            <article key={title} className="care-safety" data-ro-reveal><h3>{title}</h3><p>{body}<SourceLinks ids={ids}/></p></article>
          ))}</div>
        </div>
      </section>

      <section id="visit-guide" className="ro-band rp-summary" aria-labelledby="ha-visit">
        <div className="ro-wrap care-narrow">
          <Heading id="ha-visit" label="VISIT DANAUN">변화의 기록과<br/><em>이전 치료를 함께 알려주세요.</em></Heading>
          <div className="care-location" data-ro-reveal>
            <ul className="care-prompt-list">{copy.visit.map(item => <li key={item}>{item}</li>)}</ul>
            <h3>동천동·수지에서 일상 기능 진료를 찾는 분께</h3>
            <p>인근 역 정형외과·동천동 정형외과를 검색하며 근골격계 진료를 알아보셨다면 의료진의 전문과목과 평가 범위를 확인해 주세요. 다나은재활의학과의원은 재활의학과 전문의의 진료를 안내합니다.</p>
            <address><strong>다나은재활의학과의원</strong><br/>주소 준비 중</address>
            <div className="care-links"><Link href="/visit">진료시간·오시는 길</Link><Link href="/about/doctor">의료진 소개</Link></div>
          </div>
        </div>
      </section>

      <section id="faq" className="ro-faq ro-faq-expanded ro-band" aria-labelledby="ro-faq-title">
        <div className="ro-wrap ro-faq-grid">
          <div className="ro-faq-heading">
            <p className="ro-label" lang="en">QUESTIONS & ANSWERS</p>
            <h2 id="ro-faq-title" aria-label="자주 묻는 질문">FAQ</h2>
            <p>근력·균형, 피부와 두피에 대해 자주 묻는 질문</p>
          </div>
          <div className="ro-faq-groups">
            <ol className="ro-faq-group">{copy.faqs.map(([question, answer], i) => (
              <li className="ro-faq-answer" key={question}><span className="ro-faq-number" aria-hidden="true">0{i + 1}</span><div><h3>{question}</h3><p>{answer}</p></div></li>
            ))}</ol>
          </div>
        </div>
      </section>

      <section id="references" className="ro-band care-paper care-sources" aria-labelledby="ha-references">
        <div className="ro-wrap care-narrow">
          <Heading id="ha-references" label="REFERENCES">근거의 범위까지<br/><em>확인하고 설명합니다.</em></Heading>
          <p className="care-note">두피 PRP 연구에서는 개선을 보고한 시험과 뚜렷한 차이를 확인하지 못한 시험이 함께 있습니다. 연구 대상과 시술 방법이 달라 결과를 모든 탈모에 일반화하기 어렵습니다.<SourceLinks ids={['S6', 'S7']}/></p>
          <div className="care-links"><Link href="/regen/prp-prf">PRP·PRF의 일반 원리 알아보기</Link></div>
          <ul>{Object.entries(copy.sources).map(([id, [title, url]]) => (
            <li id={'ha-source-' + id} key={id}><span>{id}</span><a href={url} target="_blank" rel="noreferrer">{title} ↗</a></li>
          ))}</ul>
          <p className="care-note">개인별 진단과 치료 계획은 진찰 후 결정하며, 필요한 치료와 반응은 개인에 따라 달라질 수 있습니다.</p>
          <ResearchReferenceLink path="/centers/healthy-aging"/>
        </div>
      </section>
    </main>
    <HomeFooter/>
    <div className="mobile-actions"><a href="/visit">전화 상담</a><a href={booking} target="_blank" rel="noreferrer">예약 안내 ↗</a><a href="/visit">오시는 길</a></div>
  </div>;
}
