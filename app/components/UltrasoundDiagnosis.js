import ResearchReferenceLink from './ResearchReferenceLink';
import HomeFooter from './HomeFooter';
import SiteHeader from './SiteHeader';
import { booking } from './DetailShell';
import { DiagnosisTabs } from './DiagnosisPage';
import RegenOverviewMotion from './RegenOverviewMotion';
import * as copy from '../data/diagnosis-ultrasound';

const imageRoot = '/images/ultrasound-diagnosis-';

function Heading({ id, label, intro, children }) {
  return <div className="ro-heading" data-ro-reveal>
    <p className="ro-label" lang="en">{label}</p>
    <h2 id={id}>{children}</h2>
    {intro && <p>{intro}</p>}
  </div>;
}

function Link({ href, children }) {
  return <a className="ro-link" href={href}>{children} <span aria-hidden="true">{href.startsWith('#') ? '↓' : '↗'}</span></a>;
}

function Photo({ name, alt, direction = 'left' }) {
  const src = imageRoot + name;
  return <figure className="us-photo" data-ro-reveal={direction}>
    <img src={src + '.webp'} srcSet={src + '-small.webp 600w, ' + src + '.webp 1080w'}
      sizes="(max-width: 760px) 88vw, (max-width: 1272px) 44vw, 540px"
      alt={alt} width="1080" height="720" loading="lazy" decoding="async"/>
  </figure>;
}

function Rows({ items }) {
  return <ol className="ro-evaluation-list rp-rows">{items.map(([title, body], i) => (
    <li key={title} data-ro-reveal data-ro-reveal-delay={i * 80}>
      <span aria-hidden="true">0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div>
    </li>
  ))}</ol>;
}

function Table({ caption, data }) {
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

export default function UltrasoundDiagnosis() {
  return <div className="regen-overview center-detail ultrasound-diagnosis">
    <a className="skip" href="#diagnosis-main">본문 바로가기</a>
    <SiteHeader/>
    <main id="diagnosis-main">
      <RegenOverviewMotion visibleOnly/>
      <section className="ro-hero" aria-labelledby="us-title">
        <picture className="ro-hero-image">
          <source media="(max-width: 640px)" srcSet={imageRoot + 'hero-mobile.webp'}/>
          <img src={imageRoot + 'hero.webp'} alt="" width="1500" height="1000" fetchPriority="high"/>
        </picture>
        <div className="ro-hero-content">
          <p className="ro-label" lang="en">MUSCULOSKELETAL ULTRASOUND</p>
          <p className="ro-hero-sub">다나은재활의학과의원 · 정밀 진단</p>
          <h1 id="us-title"><em>{copy.title}</em></h1>
          <p><strong>화면으로 살피고, 진찰과 함께 이해합니다.</strong><br/>힘줄·인대·관절 주변 조직을 실시간으로 관찰하고,<br className="us-desktop-break"/> 증상과 움직임에 맞춰 필요한 다음 단계를 정합니다.</p>
          <div className="ro-hero-links"><Link href="#process">검사 과정 알아보기</Link><Link href="#prepare">방문 전 준비</Link></div>
        </div>
      </section>
      <DiagnosisTabs active="ultrasound" variant="regen"/>

      <section id="overview" className="ro-intro ro-concept ro-band" aria-labelledby="us-overview">
        <div className="ro-wrap">
          <div className="ro-concept-definition">
            <h2 id="us-overview" data-ro-title>치료보다 먼저, <span>통증이 시작되는 곳을 찾습니다</span></h2>
            <p data-ro-reveal>같은 통증도 원인은 사람마다 다릅니다.</p>
            <p data-ro-reveal>근골격계 초음파는 음파를 이용해 힘줄·인대·근육과 관절 주변 연부조직을 관찰하는 검사입니다.</p>
            <p data-ro-reveal>다나은은 진찰과 초음파, 움직임 평가를 함께 보고 치료 순서를 정합니다.</p>
          </div>
          <ul className="us-features" aria-label="근골격계 초음파의 특징">{copy.features.map(([title, body], i) => (
            <li key={title} data-ro-reveal data-ro-reveal-delay={i * 85}><strong>{title}</strong><p>{body}</p></li>
          ))}</ul>
        </div>
      </section>

      <section id="focus" className="ro-band" aria-labelledby="us-focus">
        <div className="ro-wrap">
          <Heading id="us-focus" label="AREAS WE ASSESS" intro="같은 부위가 아파도 필요한 검사는 다릅니다. 통증의 시작 시점, 불편한 동작과 진찰 소견을 바탕으로 검사 부위를 정합니다. 진료실에서 화면을 환자와 함께 봅니다.">인대·힘줄·관절 주변 조직을<br/><em>실시간으로 확인합니다.</em></Heading>
          <div data-ro-reveal><Table caption="부위별 초음파 평가 범위" data={copy.areas}/></div>
          <p className="care-note">검사 범위는 증상과 진찰 소견, 해당 조직을 초음파로 관찰할 수 있는지에 따라 달라집니다.</p>
        </div>
      </section>

      <section id="keyword-guide" className="ro-band us-dark us-guide-scene" aria-labelledby="us-guide">
        <div className="journey-backdrop" aria-hidden="true">
          <img src={imageRoot + 'process.webp'} alt="" width="1080" height="720" loading="lazy" decoding="async"/>
        </div>
        <div className="ro-wrap us-guide">
          <Heading id="us-guide" label="TENDONS, LIGAMENTS & JOINTS" intro="증상과 현재 기능을 함께 살펴 필요한 검사를 선택하고, 관찰한 결과를 진료 계획에 반영합니다.">근골격계 초음파로 살피는<br/><em>힘줄·인대와 관절 주변</em></Heading>
          <Rows items={copy.guide}/>
        </div>
      </section>

      <section id="assessment" className="ro-band" aria-labelledby="us-assessment">
        <div className="ro-wrap">
          <Heading id="us-assessment" label="THE DANAUN ASSESSMENT">검사의 시작은,<br/><em>환자의 증상과 진찰입니다.</em></Heading>
          <div className="us-split">
            <Photo name="assessment" alt="어깨에 초음파 탐촉자를 대고 화면을 확인하는 검사 예시"/>
            <Rows items={copy.assessment}/>
          </div>
          <div className="care-links"><Link href="/diagnosis">정밀 진단의 원칙</Link><Link href="/diagnosis/movement">움직임·자세 평가</Link></div>
        </div>
      </section>

      <section id="dynamic" className="ro-band care-paper" aria-labelledby="us-dynamic">
        <div className="ro-wrap">
          <Heading id="us-dynamic" label="DYNAMIC ULTRASOUND" intro="힘줄 등 연부조직이 움직이는 모습을 실시간으로 관찰하고, 진찰에서 불편했던 자세나 동작과 비교합니다.">필요한 경우,<br/><em>움직이는 동안의 조직도 살핍니다.</em></Heading>
          <div className="us-split us-reverse">
            <Photo name="dynamic" alt="손목에 초음파 탐촉자를 대고 손가락 움직임을 살피는 검사 예시" direction="right"/>
            <Rows items={copy.dynamic}/>
          </div>
          <p className="care-note us-centered">근력, 관절 가동범위와 실제 동작 수행은 진찰과 기능 평가를 함께 고려합니다.</p>
        </div>
      </section>

      <section id="process" className="ro-process ro-band" aria-labelledby="us-process">
        <div className="ro-wrap">
          <Heading id="us-process" label="YOUR EXAM">진찰부터 결과 설명까지,<br/><em>이렇게 진행합니다.</em></Heading>
          <Photo name="process" alt="무릎 앞쪽에 초음파 탐촉자를 대어 관찰하는 검사 예시"/>
          <ol className="ro-process-steps ro-process-sequence" data-ro-reveal>{copy.process.map(([title, body], i) => (
            <li key={title}><span className="ro-point" aria-hidden="true"/><small>0{i + 1}</small><h3>{title}</h3><p>{body}</p></li>
          ))}</ol>
          <p className="care-note us-centered">탐촉자로 누르거나 움직일 때 불편하면 바로 알려주세요. 피부 위에서 진행하는 진단 초음파는 탐촉자를 사용합니다. 주사 등 시술이 필요하면 별도로 설명하고 동의를 받습니다.</p>
        </div>
      </section>

      <section id="limits" className="ro-band us-dark" aria-labelledby="us-limits">
        <div className="ro-wrap us-guide">
          <Heading id="us-limits" label="READING THE RESULTS">영상의 변화와 통증의 원인은<br/><em>같지 않을 수 있습니다.</em></Heading>
          <Rows items={copy.limits}/>
        </div>
      </section>

      <section id="comparison" className="ro-band care-paper" aria-labelledby="us-comparison">
        <div className="ro-wrap">
          <Heading id="us-comparison" label="IMAGING OPTIONS" intro="기존 MRI나 X-ray가 있다면 현재 증상과 함께 검토합니다. 어떤 영상이 도움이 되는지는 확인하려는 구조와 의심하는 문제에 따라 달라집니다.">확인하려는 문제에 맞춰<br/><em>필요한 검사를 선택합니다.</em></Heading>
          <div data-ro-reveal><Table caption="초음파·X-ray·MRI의 역할" data={copy.comparison}/></div>
        </div>
      </section>

      <section id="guided-injection" className="ro-band" aria-labelledby="us-guided">
        <div className="ro-wrap">
          <Heading id="us-guided" label="DIAGNOSIS & TREATMENT" intro="유도 주사는 치료가 필요할 때 영상으로 시술 위치와 주변 구조를 확인하는 방법입니다. 시술 여부는 검사 이후 별도로 상의합니다.">초음파 진단과 유도 주사,<br/><em>목적을 구분합니다.</em></Heading>
          <div data-ro-reveal><Table caption="초음파 진단과 초음파 유도 주사 비교" data={copy.injection}/></div>
          <div className="care-safety us-safety" data-ro-reveal><p>주사 시술에는 부위와 약제에 따라 통증, 멍, 출혈, 감염, 알레르기 반응이나 주변 조직 손상 등의 위험이 있을 수 있습니다. 현재 복용약과 과거 반응을 확인한 뒤 시술별 주의사항을 설명합니다.</p></div>
          <div className="care-links"><Link href="/regen/injection">맞춤 주사치료 선택 과정</Link><Link href="/regen">주사치료 안내</Link></div>
        </div>
      </section>

      <section id="next-step" className="ro-band care-paper" aria-labelledby="us-next">
        <div className="ro-wrap">
          <Heading id="us-next" label="CONNECTED CARE" intro="검사 소견을 현재 증상과 움직임에 연결해 다음 단계를 정합니다. 재평가 때는 처음 불편했던 활동과 일상 기능이 어떻게 달라졌는지 확인합니다.">결과를 설명하고,<br/><em>필요한 치료와 재활로 연결합니다.</em></Heading>
          <div className="care-treatment-grid">{copy.nextSteps.map(([title, body], i) => (
            <article key={title} data-ro-reveal data-ro-reveal-delay={i * 85}><span aria-hidden="true">0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>
          ))}</div>
          <p className="care-note us-centered">초음파 재검 여부는 증상과 움직임, 확인할 조직에 따라 결정합니다.</p>
          <div className="care-links"><Link href="/centers/sports">스포츠손상 센터</Link><Link href="/centers/osteoarthritis">퇴행성 관절염 센터</Link></div>
        </div>
      </section>

      <section id="prepare" className="ro-band" aria-labelledby="us-prepare">
        <div className="ro-wrap care-narrow">
          <Heading id="us-prepare" label="BEFORE YOUR VISIT">이전 검사와<br/><em>불편한 동작을 함께 알려주세요.</em></Heading>
          <div className="care-location us-visit" data-ro-reveal>
            <ul className="care-prompt-list">{copy.preparation.map(item => <li key={item}>{item}</li>)}</ul>
            <p>일반적인 근골격계 진단 초음파에는 특별한 금식이 필요하지 않은 경우가 많습니다. 별도 안내를 받았다면 그에 따르고, 처방약 변경은 의료진과 상의하세요.</p>
            <p>검사 시간과 비용은 평가 부위, 검사 범위와 동반 진료에 따라 달라집니다. 실제 항목과 비용은 진료·접수 시 확인해 주세요.</p>
            <h3>동천동·수지에서 근골격계 초음파를 찾는 분께</h3>
            <p>수지 초음파 검사를 알아보고 계시다면 먼저 확인할 부위를 살펴보세요. 이 진료는 힘줄·인대·근육 등 근골격계 평가를 안내합니다. 인근 역 정형외과·동천동 정형외과를 검색해 찾아오신 경우에도 다나은재활의학과의원에서는 재활의학과 전문의가 증상과 진찰 소견을 살펴 필요한 검사를 안내합니다.</p>
            <address><strong>다나은재활의학과의원</strong><br/>주소 준비 중</address>
            <div className="care-links"><Link href="/visit">진료시간·오시는 길</Link><Link href="/about/doctor">샘플 의료진 소개</Link></div>
          </div>
        </div>
      </section>

      <section id="faq" className="ro-faq ro-faq-expanded ro-band" aria-labelledby="ro-faq-title">
        <div className="ro-wrap ro-faq-grid">
          <div className="ro-faq-heading"><p className="ro-label" lang="en">QUESTIONS & ANSWERS</p><h2 id="ro-faq-title" aria-label="초음파 진단 자주 묻는 질문">FAQ</h2><p>검사 범위와 결과, 다음 진료에 대해 자주 묻는 질문</p></div>
          <div className="ro-faq-groups"><ol className="ro-faq-group">{copy.faqs.map(([question, answer], i) => (
            <li className="ro-faq-answer" key={question}><span className="ro-faq-number" aria-hidden="true">0{i + 1}</span><div><h3>{question}</h3><p>{answer}</p></div></li>
          ))}</ol></div>
        </div>
      </section>

      <section id="references" className="ro-band care-paper care-sources" aria-labelledby="us-references">
        <div className="ro-wrap care-narrow">
          <Heading id="us-references" label="REFERENCES" intro="근골격계 초음파의 역할과 한계를 설명하는 병원과 전문학회 자료입니다.">검사에 대한 정보와 <em>근거를 확인하세요.</em></Heading>
          <ul>{copy.sources.map(([id, title, url], i) => (
            <li id={'us-source-' + id} key={id}><span aria-hidden="true">0{i + 1}</span><a href={url} target="_blank" rel="noreferrer">{title} ↗</a></li>
          ))}</ul>
          <div className="care-links"><Link href="/diagnosis">정밀 진단 소개</Link><Link href="/diagnosis/movement">움직임·자세 평가</Link><Link href="/diagnosis/alignment">체형 분석</Link></div>
          <p className="care-note">검사 여부와 범위, 결과의 해석과 치료 계획은 진찰 후 결정합니다.</p>
          <ResearchReferenceLink path="/diagnosis/ultrasound"/>
        </div>
      </section>
    </main>
    <HomeFooter/>
    <div className="mobile-actions"><a href="/visit">전화 상담</a><a href={booking} target="_blank" rel="noreferrer">예약 안내 ↗</a><a href="/visit">오시는 길</a></div>
  </div>;
}
