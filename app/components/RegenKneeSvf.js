import ResearchReferenceLink from './ResearchReferenceLink';
import SiteHeader from './SiteHeader';
import HomeFooter from './HomeFooter';
import {booking} from './DetailShell';
import {RegenTabs} from './RegenPage';
import RegenOverviewMotion from './RegenOverviewMotion';
import {
  assessment, comparison, kneeSvfFaq, procedure, rehabilitation, risks, referenceNames, sources, studies,
} from '../data/knee-svf';

const number = index => String(index + 1).padStart(2, '0');

function Heading({label, children, description}) {
  return (
    <div className="ro-heading" data-ro-reveal>
      <p className="ro-label" lang="en">{label}</p>
      <h2>{children}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Link({href, children, arrow = '↗'}) {
  return <a className="ro-link" href={href}>{children}<span aria-hidden="true">{arrow}</span></a>;
}

function Citation({id}) {
  return <span className="rp-citations"><a href={'#svf-ref-' + id} aria-label={'참고 자료 ' + id}>[{id}]</a></span>;
}

function Rows({items}) {
  return (
    <ol className="ro-evaluation-list rp-rows">
      {items.map(([title, body], index) => (
        <li key={title} data-ro-reveal data-ro-reveal-delay={index * 90}>
          <span aria-hidden="true">{number(index)}</span>
          <div><h3>{title}</h3><p>{body}</p></div>
        </li>
      ))}
    </ol>
  );
}

const faqGroups = [
  ['정의와 대상', kneeSvfFaq.slice(0, 6), 0],
  ['효과와 시술 과정', kneeSvfFaq.slice(6, 12), 6],
  ['회복·비용과 진료 안내', kneeSvfFaq.slice(12), 12],
];

export default function RegenKneeSvf() {
  return (
    <div className="regen-overview regen-prp-prf knee-svf">
      <a className="skip" href="#main">본문 바로가기</a>
      <SiteHeader/>
      <main id="main">
        <RegenOverviewMotion visibleOnly/>
        <section className="ro-hero svf-hero" id="regen-main" aria-labelledby="svf-title">
          <picture className="ro-hero-image">
            <img src="/images/home-knee-svf-diagram.webp" alt="" fetchPriority="high"/>
          </picture>
          <div className="ro-hero-content">
            <p className="ro-label rp-hero-label" lang="en">RESET REGEN · KNEE SVF</p>
            <p className="ro-hero-sub">자가지방유래 기질혈관분획 관절강내 주사</p>
            <h1 id="svf-title"><em>무릎 SVF</em></h1>
            <div className="ri-hero-summary">
              <p className="ri-hero-lead">무릎의 상태를 먼저 살피고,<br/>SVF가 필요한 선택인지 판단합니다.</p>
              <p>증상과 이전 치료를 살피고, 시술 대상과 부담을 안내합니다.</p>
            </div>
            <div className="ro-hero-links">
              <Link href="#eligibility" arrow="↓">대상과 평가 과정 보기</Link>
              <Link href="/support/booking">무릎 통증 진료·예약 안내</Link>
            </div>
          </div>
        </section>
        <RegenTabs active="knee-svf"/>

        <section className="ro-intro ro-concept ro-band" id="what-is-svf">
          <div className="ro-wrap">
            <span id="understand" className="rp-anchor"/>
            <div className="ro-concept-definition">
              <h2 data-ro-title>내 지방에서 분리한 세포 분획을<br/><span>무릎 관절 안에</span></h2>
              <p>무릎 SVF는 본인의 지방조직에서 여러 종류의 세포가 포함된 성분을 분리해 무릎 관절 안에 주사하는 시술입니다. 이 성분을 기질혈관분획(SVF)이라고 합니다. 세포를 따로 배양한 줄기세포 치료제와 구분합니다.</p>
              <p>국내에서 평가한 기술은 해당 대상의 무릎 통증을 줄이고 관절 기능을 개선하는 데 목적이 있습니다. <Citation id="K1"/></p>
            </div>
            <div className="ro-concept-approach" data-ro-reveal>
              <h3>걷고, 계단을 오르는 일상까지.<br/><em className="ro-concept-highlight" data-ro-highlight>내 무릎에 맞는 치료부터.</em></h3>
            </div>
          </div>
        </section>

        <section className="ro-personal ro-personal-parallax ro-band" id="eligibility">
          <div className="journey-backdrop" aria-hidden="true">
            <img src="/images/regen-knee-ultrasound-1120.webp" alt="" loading="lazy" decoding="async"/>
          </div>
          <div className="ro-wrap ro-personal-layout">
            <div className="ro-personal-copy" data-ro-reveal>
              <span id="content-0" className="rp-anchor"/>
              <p className="ro-label" lang="en">ELIGIBILITY</p>
              <h2>어떤 무릎 상태에서<br/><em>검토하나요?</em></h2>
              <div className="svf-target-summary">
                <p className="ro-label">국내 신의료기술 고시 대상</p>
                <h3>무릎 골관절염 KL 2~3등급</h3>
                <p>KL은 X-ray에서 보이는 관절염 변화를 나누는 등급입니다. 의학적으로 같은 수준의 관절염으로 판단되는 경우도 포함합니다. <Citation id="K2"/> <Citation id="K3"/></p>
              </div>
              <p>기존 비수술 치료 후에도 불편이 남는지, 진찰과 영상 소견, 걷기나 계단 이용의 어려움을 함께 살펴 적합성을 판단합니다.</p>
              <p className="svf-scope">이 페이지는 무릎 관절 안에 투여하는 SVF를 안내합니다.</p>
            </div>
            <ol className="ro-personal-steps">
              {['통증이 무릎 골관절염과 관련되는지', '영상 소견과 걷기·계단 이용 등 생활 기능', '이전에 받은 치료와 그 반응', '지방 채취와 주사를 고려할 때의 건강 상태', '다른 치료나 수술적 평가가 필요한지'].map((item, index) => (
                <li key={item} data-ro-reveal><span aria-hidden="true">{number(index)}</span><h3>{item}</h3></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="ro-band ro-precision" id="reset-assessment">
          <div className="ro-wrap">
            <Heading label="PRECISION FIRST">시술보다 먼저,<br/><em>현재의 무릎을 평가합니다.</em></Heading>
            <div className="ro-split rp-split rp-aligned-split">
              <figure className="rp-photo svf-assessment-photo" data-ro-reveal="left">
                <img src="/images/svf-patellar-ultrasound-side-1120.webp" srcSet="/images/svf-patellar-ultrasound-side-640.webp 640w, /images/svf-patellar-ultrasound-side-1120.webp 1120w" sizes="(max-width: 760px) 90vw, 48vw" alt="슬개골 앞쪽에 탐촉자를 대고 무릎을 초음파로 살피는 예시" width="1120" height="747" loading="lazy" decoding="async"/>
              </figure>
              <Rows items={assessment}/>
            </div>
            <div className="svf-links"><Link href="/diagnosis">정밀 진단 소개</Link></div>
          </div>
        </section>

        <section className="ro-band rp-band" id="options">
          <div className="ro-wrap">
            <Heading label="TREATMENT OPTIONS" description="원료와 준비 과정이 다릅니다. 대상과 근거, 시술 부담을 함께 살펴 선택합니다.">PRP와 SVF,<br/><em>무엇이 다를까요?</em></Heading>
            <div className="rp-table-wrap svf-comparison" data-ro-reveal>
              <table className="rp-table" role="table">
                <caption>PRP와 무릎 SVF 비교</caption>
                <thead role="rowgroup"><tr role="row"><th scope="col">구분</th><th scope="col">PRP</th><th scope="col">SVF</th></tr></thead>
                <tbody role="rowgroup">{comparison.map(([label, prp, svf]) => (
                  <tr role="row" key={label}><th role="rowheader" scope="row">{label}</th><td role="cell"><span aria-hidden="true">PRP</span>{prp}</td><td role="cell"><span aria-hidden="true">SVF</span>{svf}</td></tr>
                ))}</tbody>
              </table>
            </div>
            <div className="rp-narrow rp-copy svf-copy svf-followup" data-ro-reveal>
              <h3>다른 선택지도 함께 검토합니다.</h3>
              <p>무릎 관절염의 상태에 따라 활동·체중 관리, 운동과 약물, 주사치료, 수술적 평가를 고려할 수 있습니다. 원료나 세포 수만으로 어느 치료가 더 효과적인지 판단하기는 어렵습니다.</p>
            </div>
            <div className="svf-links"><Link href="/regen/prp-prf">PRP·PRF 안내</Link><Link href="/centers/osteoarthritis">퇴행성 관절염 센터</Link></div>
          </div>
        </section>

        <section className="ro-band ro-process" id="procedure">
          <div className="ro-wrap">
            <span id="content-1" className="rp-anchor"/>
            <Heading label="THE PROCEDURE" description="평가는 시술 전에 진행될 수 있습니다. 실제 시행 가능 여부와 시술 방법은 환자 상태와 시행 조건에 따라 안내합니다.">
              평가부터 시술 후 확인까지,<br/><em>어떻게 진행되나요?</em>
            </Heading>
            <ol className="ro-process-steps ro-process-sequence" data-ro-reveal>
              {procedure.map(([title, body], index) => (
                <li key={title}><span className="ro-point" aria-hidden="true"/><small aria-hidden="true">{number(index)}</small><h3>{title}</h3><p>{body}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="ro-band rp-band" id="evidence">
          <div className="ro-wrap">
            <Heading label="EVIDENCE & LIMITS" description="통증과 기능의 변화, 연골 등 구조의 변화, 장기적인 경과를 나누어 살핍니다.">
              SVF 치료에 대한<br/><em>심층적인 연구</em>
            </Heading>
            <div className="svf-evidence-summary">
              <article data-ro-reveal>
                <h3>통증·기능에서 보고된 변화</h3>
                <p>일부 연구에서는 통증과 무릎 기능이 좋아졌다고 보고했습니다. 다른 무작위 비교 연구에서는 주요 통증 지표에서 비교군보다 우월한 결과를 확인하지 못했습니다. <Citation id="R2"/> <Citation id="R1"/> <Citation id="R3"/></p>
              </article>
              <article data-ro-reveal>
                <h3>연골 구조와 장기 효과에서 남은 질문</h3>
                <p>연골이 새로 생긴다고 판단할 근거는 부족합니다. 연구마다 대상과 제제 준비 방법이 달라 효과가 얼마나 오래 지속되는지, 수술을 피할 수 있는지는 확인하기 어렵습니다. <Citation id="R1"/> <Citation id="R3"/></p>
              </article>
            </div>
            <div className="rp-evidence-studies">
              {studies.map(([id, journal, title, body], index) => (
                <article key={id} data-ro-reveal data-ro-reveal-delay={index * 100}>
                  <p className="ro-label">{journal}</p><h3>{title}</h3><p>{body}</p>
                  <Link href={sources[id]}>연구 원문 보기</Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ro-band svf-risks" id="risks">
          <div className="ro-wrap">
            <Heading label="SAFETY & CONSIDERATIONS" description="자가조직을 사용해도 지방 채취, 마취, 무릎 주사 과정 각각에 위험과 부담이 있습니다.">
              치료 과정과<br/><em>체크사항을 확인하세요.</em>
            </Heading>
            <div className="svf-risk-layout">
              <Rows items={risks}/>
              <div className="svf-safety svf-risk-notices" data-ro-reveal>
                <article><h3>미리 알려주실 내용</h3><p>감염이 의심되거나 출혈이 잘 멎지 않는 경우, 복용 중인 약이나 약물 알레르기가 있다면 미리 알려주세요. 약은 임의로 중단하지 말고 의료진과 확인하세요.</p></article>
                <article><h3>시술 후 바로 연락해야 할 때</h3><p>채취 부위나 무릎의 통증·부종이 심해지거나 열감·붉어짐·발열이 생기면 의료기관에 바로 연락하고 진료받으세요. 호흡곤란이나 의식 저하가 있으면 즉시 응급진료를 받으세요.</p></article>
              </div>
            </div>
          </div>
        </section>

        <section className="ro-band" id="rehabilitation">
          <div className="ro-wrap">
            <span id="aftercare" className="rp-anchor"/>
            <Heading label="AFTERCARE & REHABILITATION" description="현재 가능한 움직임과 활동 수준에 맞춰 운동과 생활 관리 방향을 살핍니다.">
              치료 이후의 움직임과<br/><em>경과도 함께 살핍니다.</em>
            </Heading>
            <div className="ro-split rp-split rp-aligned-split">
              <Rows items={rehabilitation}/>
              <figure className="rp-photo" data-ro-reveal="right">
                <img src="/images/hero-recovery.webp" alt="움직임을 살피는 재활 평가 예시" loading="lazy" decoding="async"/>
              </figure>
            </div>
            <p className="rp-note">재평가 시점과 항목은 개인별로 정합니다. 회복에 필요한 기간과 진료 횟수는 상태와 경과에 따라 달라집니다.</p>
          </div>
        </section>

        <section className="ro-band" id="local-care">
          <div className="ro-wrap">
            <Heading label="LOCAL CARE">동천역 인근에서<br/><em>무릎 진료를 찾고 계신가요?</em></Heading>
            <div className="rp-narrow rp-copy svf-copy" data-ro-reveal>
              <p>무릎 통증으로 동천역 정형외과나 동천동 정형외과를 찾고 계시다면, 진료과와 함께 어떤 평가와 치료를 제공하는지 살펴보세요. 리셋재활의학과의원은 재활의학과 전문의가 무릎 통증과 생활 기능을 평가하고 치료·재활 방향을 상담하는 곳입니다.</p>
              <p>수술적 평가 또는 추가 진료가 필요한 경우에는 필요한 이유와 다음 진료 방향을 안내합니다.</p>
              <p>경기 용인시 수지구 손곡로 95, 송란아트프라자 2층</p>
              <Link href="/visit#location">위치·진료시간 보기</Link>
            </div>
          </div>
        </section>

        <section className="ro-band ro-faq ro-faq-expanded" id="faq" aria-labelledby="ro-faq-title">
          <span id="regen-faq" className="rp-anchor"/>
          <div className="ro-wrap ro-faq-grid">
            <div className="ro-faq-heading"><p className="ro-label" lang="en">QUESTIONS &amp; ANSWERS</p><h2 id="ro-faq-title">FAQ</h2><p>무릎 SVF에 대해<br/>자주 묻는 질문</p><span>RESET REGEN · 18가지 질문</span></div>
            <div className="ro-faq-groups">
              {faqGroups.map(([label, items, start]) => (
                <section className="ro-faq-group" key={label}>
                  <h3>{label}</h3>
                  {items.map(([question, answer], index) => (
                    <article className="ro-faq-answer" key={question}>
                      <span className="ro-faq-number" aria-hidden="true">{number(start + index)}</span>
                      <div><h4>{question}</h4><p>{answer}</p></div>
                    </article>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="ro-band rp-band" id="references">
          <div className="ro-wrap">
            <Heading label="REFERENCES" description="국내 평가 자료는 적용 대상과 방법을, 임상 연구는 관찰된 효과와 한계를 살피는 데 참고합니다.">
              무릎 SVF의<br/><em>근거를 함께 확인하세요.</em>
            </Heading>
            <ul className="rp-references">
              {Object.entries(referenceNames).map(([id, label]) => (
                <li id={'svf-ref-' + id} key={id}><span>{id}</span><a href={sources[id]}>{label} ↗</a></li>
              ))}
            </ul>
            <ResearchReferenceLink path="/regen/knee-svf"/>
            <div className="svf-links"><Link href="/regen/principles">주사 성분 설명 원칙</Link><Link href="/about/doctor">원장 소개</Link></div>
            <p className="rp-note">자료 확인 2026.11.15 · 의료진 검토 완료</p>
          </div>
        </section>
      </main>
      <HomeFooter/>
    </div>
  );
}
