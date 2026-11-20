import ResearchReferenceLink from './ResearchReferenceLink';
import SiteHeader from './SiteHeader';
import HomeFooter from './HomeFooter';
import {booking} from './DetailShell';
import {RegenTabs} from './RegenPage';
import RegenOverviewMotion from './RegenOverviewMotion';
import {comparison, faqGroups, followUp, guidelines, prfPrinciples, references} from '../data/regen-prp-prf';

const referenceMap = Object.fromEntries(references.map(([id, , links]) => [id, links[0][0]]));
const approach = [
  ['원인을 살핍니다', '증상의 시작과 이전 치료, 진찰 결과를 확인하고 필요한 검사를 고릅니다.'],
  ['선택의 이유를 설명합니다', '기대할 수 있는 변화와 한계, 다른 선택지를 함께 설명합니다.'],
  ['회복 목표를 함께 정합니다', '계단, 걷기, 물건 잡기처럼 환자에게 중요한 활동을 확인합니다.'],
  ['치료 후 다시 확인합니다', '통증과 움직임, 시술 후 불편을 확인하고 계획을 조정합니다.'],
];
const rehab = [
  ['연결성', '불편한 부위와 주변 관절·근육이 함께 움직이는 방식과 일상의 부담을 살핍니다.'],
  ['움직임', '걷기, 계단, 팔 들기, 운동처럼 돌아가고 싶은 활동을 회복 목표로 삼습니다.'],
  ['안정성', '근력과 움직임 조절을 살피고 현재 상태에 필요한 운동을 안내합니다.'],
  ['회복', '통증과 기능, 시술 후 불편을 다시 확인하고 치료와 재활 계획을 조정합니다.'],
];
const process = [
  ['적용 여부 평가','진단과 진행 정도, 이전 치료 반응, 복용약과 건강 상태를 확인합니다.'],
  ['설명과 치료 결정','제제와 목적, 기대와 한계, 주의사항과 예상 비용을 설명하고 함께 결정합니다.'],
  ['채혈과 제제 준비','선택한 방법에 맞춰 본인의 혈액을 채취하고 제제를 준비합니다.'],
  ['적용과 시술 후 안내','확인된 부위와 방법에 따라 적용하고 운동·약물·다음 진료를 안내합니다.'],
  ['재평가와 재활','통증, 동작과 활동량, 시술 후 불편을 확인하고 필요한 재활과 다음 계획을 논의합니다.'],
];

function Cite({ids}) {
  return <span className="rp-citations">{ids.map(id => (
    <a href={'#ref-' + id} key={id} aria-label={'참고문헌 ' + id + ' ' + referenceMap[id]}>{id}</a>
  ))}</span>;
}

function Answer({text}) {
  return text.split(/(\[R\d+(?:, R\d+)*\])/g).map((part, index) => {
    const ids = part.match(/R\d+/g);
    return part.startsWith('[R') ? <Cite key={index} ids={ids}/> : part;
  });
}

function Band({id, legacy, label, title, tone = '', backdrop, children}) {
  return (
    <section id={id} className={'ro-band rp-band ' + tone} aria-labelledby={id + '-title'}>
      {backdrop && <div className="journey-backdrop" aria-hidden="true">
        <img src={backdrop} alt="" loading="lazy" decoding="async"/>
      </div>}
      <div className="ro-wrap">
        {legacy && <span id={legacy} className="rp-anchor" aria-hidden="true"/>}
        <div className="ro-heading" data-ro-reveal>
          {label && <p className="ro-label" lang="en">{label}</p>}
          <h2 id={id + '-title'}>{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Rows({items}) {
  return <ol className="ro-evaluation-list rp-rows">
    {items.map(([name, body], index) => <li key={name} data-ro-reveal data-ro-reveal-delay={index * 100}>
      <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      <div><h3>{name}</h3><p>{body}</p></div>
    </li>)}
  </ol>;
}

function Table({caption, data}) {
  const [headers, ...rows] = data;
  return <div className="rp-table-wrap">
    <table className="rp-table">
      <caption>{caption}</caption>
      <thead><tr>{headers.map(label => <th key={label} scope="col">{label}</th>)}</tr></thead>
      <tbody>{rows.map(([label, ...cells]) => <tr key={label}>
        <th scope="row">{label}</th>
        {cells.map((cell, index) => <td key={index}>{cell}</td>)}
      </tr>)}</tbody>
    </table>
  </div>;
}

function Photo({name, alt, direction = 'left'}) {
  return <figure className="rp-photo" data-ro-reveal={direction} data-ro-reveal-delay={0}>
    <img src={'/images/' + name} alt={alt} loading="lazy" decoding="async"/>
  </figure>;
}

export default function RegenPrpPrf() {
  return (
    <div className="regen-overview regen-prp-prf">
      <a className="skip" href="#regen-main">본문 바로가기</a>
      <SiteHeader/>
      <main id="regen-main">
        <RegenOverviewMotion/>
        <section id="top" className="ro-hero" aria-labelledby="rp-title">
          <picture className="ro-hero-image">
            <source media="(max-width:640px)" srcSet="/images/hero-regen-fibrin-mobile.webp"/>
            <img src="/images/hero-regen-fibrin.webp" alt="" fetchPriority="high"/>
          </picture>
          <div className="ro-hero-content">
            <p className="ro-label rp-hero-label" lang="en">AUTOLOGOUS BLOOD-DERIVED PREPARATIONS</p>
            <p className="ro-hero-sub">RESET REGEN · 자가혈액 유래 제제</p>
            <h1 id="rp-title"><em>PRP·PRF</em></h1>
            <p>내 혈액에서 시작하는 치료, 나의 움직임까지 생각합니다.<br/>통증의 원인과 조직 상태를 평가하고, 제제의 특성과 적용 조건을 설명한 뒤 회복 계획을 함께 세웁니다.</p>
            <div className="ro-hero-links">
              <a className="ro-link" href="#process">리셋의 치료 과정 <span aria-hidden="true">↓</span></a>
              <a className="ro-link" href="#comparison">PRP·PRF 차이 <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>
        <RegenTabs active="prp-prf"/>
        <section id="summary" className="ro-band rp-summary" aria-labelledby="summary-title">
          <span id="understand" className="rp-anchor" aria-hidden="true"/>
          <div className="ro-wrap">
            <div className="rp-summary-layout">
              <div className="rp-summary-copy">
                <div data-ro-reveal>
                  <p className="ro-label" lang="en">RESET REGEN</p>
                  <h2 id="summary-title">같은 자가혈액에서 출발하지만,<br/><em>제제의 특성은 다릅니다.</em></h2>
                </div>
                <article className="rp-summary-row" data-ro-reveal data-ro-reveal-delay={0}>
                  <img src="/images/regen-photo-02.webp" alt="" width="120" height="120" loading="lazy" decoding="async"/>
                  <div>
                    <p className="rp-summary-label">혈소판 풍부 혈장</p>
                    <h3>PRP</h3>
                    <p>PRP(Platelet-Rich Plasma)는 본인의 혈액에서 분리한 혈소판 풍부 혈장입니다. 준비 방법에 따라 혈소판·백혈구의 양과 최종 부피가 달라질 수 있습니다. <Cite ids={['R1','R3']}/></p>
                    <a className="ro-link" href="#prp">PRP 준비 과정 보기 <span aria-hidden="true">↓</span></a>
                  </div>
                </article>
                <article className="rp-summary-row" data-ro-reveal data-ro-reveal-delay={120}>
                  <img src="/images/home-prf-diagram.webp" alt="" width="120" height="120" loading="lazy" decoding="async"/>
                  <div>
                    <p className="rp-summary-label">혈소판 풍부 피브린</p>
                    <h3>PRF</h3>
                    <p>PRF(Platelet-Rich Fibrin)는 혈소판 등 혈액 성분과 피브린 구조를 활용하는 자가혈액 유래 제제입니다. 고형 PRF와 주입형 i-PRF를 구분합니다. <Cite ids={['R2','R5']}/></p>
                    <a className="ro-link" href="#prf">PRF와 i-PRF 알아보기 <span aria-hidden="true">↓</span></a>
                  </div>
                </article>
              </div>
              <figure className="rp-summary-photo" data-ro-reveal="right" data-ro-reveal-delay={0}>
                <img src="/images/knee-injection-closeup-960.webp"
                  srcSet="/images/knee-injection-closeup-480.webp 480w, /images/knee-injection-closeup-960.webp 960w"
                  sizes="(max-width: 760px) calc(100vw - 44px), 30vw"
                  width="960" height="1280" loading="lazy" decoding="async"
                  alt="장갑을 낀 의료진이 무릎 주변에 주사를 놓는 장면"/>
              </figure>
            </div>
            <div className="rp-summary-answer" data-ro-reveal>
              <h3>어느 쪽이 더 좋은가요?</h3>
              <p>질환과 적용 부위, 제조 방식과 평가할 결과를 함께 봅니다. 성장인자 방출 양상만으로 어느 쪽의 임상 효과가 우수하다고 판단할 수 없습니다. <Cite ids={['R4']}/></p>
              <a className="ro-link" href="#comparison">PRP·PRF 비교표 보기 <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>

        <Band id="reset-approach" label="THE RESET APPROACH" title={<>지금의 상태를 살피고,<br/><em>돌아가고 싶은 일상을 함께 봅니다.</em></>}>
          <div className="ro-split rp-split rp-aligned-split">
            <Photo name="regen-ultrasound-focus-1120.webp" alt="무릎 주변 조직을 초음파로 살피는 장면"/>
            <Rows items={approach}/>
          </div>
        </Band>

        <Band id="blood-components" tone="rp-dark rp-blood-scene" backdrop="/images/hero-regen-fibrin.webp" label="BLOOD COMPONENTS" title={<>혈장·혈소판·피브린은 <em>어떤 역할을 하나요?</em></>}>
          <div className="rp-blood" role="group" aria-label="혈액 성분과 피브린의 개념도">
            {[
              ['plasma','혈장','혈구가 떠 있는 액체 부분으로 단백질과 여러 물질을 포함합니다.'],
              ['platelets','혈소판','지혈에 관여하며 성장인자 등 다양한 신호물질을 포함합니다.'],
              ['fibrin','피브린','혈액이 굳는 과정에서 형성되는 단백질 그물입니다.'],
            ].map(([kind,name,body],index)=><article key={kind} data-ro-reveal data-ro-reveal-delay={index*110}>
              <div className={'rp-blood-symbol rp-'+kind} aria-hidden="true"/><h3>{name}</h3><p>{body}</p>
            </article>)}
          </div>
          <p className="rp-note">성분의 역할과 임상 효과는 각각 확인해야 합니다. 개념도는 실제 크기·농도·비율을 나타내지 않습니다. <Cite ids={['R1','R2']}/></p>
        </Band>

        <Band id="prp" legacy="content-0" label="PLATELET-RICH PLASMA" title="PRP는 어떻게 준비하나요?">
          <div className="ro-split rp-split">
            <Photo name="regen-photo-02.webp" alt="분리된 혈액 성분을 담은 시험관"/>
            <div className="rp-copy" data-ro-reveal>
              <p>본인의 혈액을 채취하고 원심분리 등의 과정으로 혈소판이 풍부한 혈장 성분을 얻습니다. 준비한 제제는 진단과 적용 조건에 맞춰 사용합니다. <Cite ids={['R1']}/></p>
              <ol className="rp-sequence"><li>자가혈액 채취</li><li>분리·준비</li><li>제제 확인</li><li>적용 부위에 사용</li></ol>
              <h3>같은 PRP라도 구성이 달라질 수 있습니다.</h3>
              <p>혈소판 농도와 총량, 백혈구 포함 정도, 주입 부피와 준비 방법을 함께 확인합니다. LP-PRP는 백혈구가 적은 제제, LR-PRP는 상대적으로 많이 포함된 제제입니다. 혈소판 총량은 농도와 부피를 함께 고려한 값입니다. <Cite ids={['R3']}/></p>
            </div>
          </div>
        </Band>

        <Band id="prf" legacy="content-1" tone="ro-intro rp-prf" label="PLATELET-RICH FIBRIN"
          title={<>PRF는 <em>무엇에 주목하는 치료</em>일까요?</>}>
          <div className="rp-prf-intro" data-ro-reveal>
            <p>PRF(Platelet-Rich Fibrin)는 본인의 혈액에서 얻는 혈소판과 피브린을 활용하는 제제입니다. 연구에서는 피브린 그물망과 그 안에서 조직 회복에 관여하는 신호물질이 어떻게 방출되는지 살펴봅니다. <Cite ids={['R2', 'R16']}/></p>
            <dl className="rp-forms">
              <div><dt>고형 PRF</dt><dd>피브린 응고물이나 막 형태로 준비합니다. <Cite ids={['R2']}/></dd></div>
              <div><dt>주입형 i-PRF</dt><dd>응고되기 전 액상 상태로 다루는 형태입니다. 준비·사용 시점에 따라 상태가 변합니다. <Cite ids={['R5']}/></dd></div>
            </dl>
          </div>
          <div className="rp-prf-layout">
            <ul className="rp-prf-cards">
              {prfPrinciples.map(({title, evidence, description, sources}) => (
                <li key={title} data-ro-reveal>
                  <span className="rp-prf-evidence">{evidence}</span>
                  <h3>{title}</h3>
                  <p>{description} <Cite ids={sources}/></p>
                </li>
              ))}
            </ul>
            <figure className="rp-prf-figure rp-prf-diagram">
              <img src="/images/home-prf-diagram.webp" width="1200" height="800" loading="lazy" decoding="async"
                alt="브론즈색 피브린 섬유 사이에 민트색 혈소판이 놓인 개념도"/>
              <figcaption>
                <strong>피브린 그물망 개념도</strong>
                <span className="rp-prf-legend"><span>피브린 그물망</span><span>혈소판</span></span>
                <p>피브린 그물망과 혈소판의 관계를 단순화했습니다. 실제 크기·구조와 다릅니다.</p>
              </figcaption>
            </figure>
            <figure className="rp-prf-figure rp-prf-sem">
              <img src="/images/prf-a-prf-sem-figure-2.jpg" width="695" height="523" loading="lazy" decoding="async"
                alt="고형 A-PRF 막에서 서로 얽힌 피브린 섬유를 보여주는 5,000배 주사전자현미경 사진"/>
              <figcaption>
                <strong>주사전자현미경(SEM) · 5,000배</strong>
                <p>실험실에서 준비한 고형 A-PRF 막의 피브린 그물망입니다. 환자에게 주입한 뒤의 모습이나 치료 결과를 보여주는 사진은 아닙니다.</p>
                <p className="rp-prf-credit">
                  <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12584014/#Fig2">Gottumukkala et al. (2025), Figure 2</a>
                  {' · '}<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
                </p>
              </figcaption>
            </figure>
          </div>
          <div className="rp-prf-next">
            <p>실험실에서 본 구조와 방출 특성은 PRF를 이해하는 단서입니다. 통증과 일상 기능의 변화는 질환별 환자 연구에서 확인합니다.</p>
            <div>
              <a className="ro-link" href="#comparison">PRP·PRF 비교표 보기 <span aria-hidden="true">↓</span></a>
              <a className="ro-link" href="#evidence">질환별 연구 보기 <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </Band>

        <Band id="comparison" title="PRP와 PRF는 무엇이 다른가요?">
          <Table caption="PRP·PRF 준비 특성과 임상 판단 기준" data={comparison}/>
          <p className="rp-note">대표 개념을 비교한 표입니다. 제제와 장비에 따라 제조 조건이 달라집니다. <Cite ids={['R1','R2','R3','R5']}/></p>
        </Band>

        <Band id="personalized-care" tone="ro-intro" label="EVERYDAY MOVEMENT" title={<>같은 진단명이어도,<br/><em>생활의 불편은 다를 수 있습니다.</em></>}>
          <p className="rp-intro">이전 치료 반응과 관절 상태, 실제로 어려운 동작을 살피고 치료 후에도 처음 정한 생활 목표를 다시 확인합니다.</p>
          <div className="rp-two">
            <article data-ro-reveal="left" data-ro-reveal-delay={0}><img src="/images/regen-pain-640.webp" alt="" loading="lazy"/><h3>계단이 불편할 때</h3><p>내려갈 때 더 불편한지, 난간이 필요한지 구체적으로 듣습니다. 경과를 볼 때도 같은 동작을 확인합니다.</p></article>
            <article data-ro-reveal="right" data-ro-reveal-delay={0}><img src="/images/hero-recovery-mobile.webp" alt="" loading="lazy"/><h3>운동에 돌아가고 싶을 때</h3><p>운동 강도, 증상이 생기는 시점과 운동 후 반응을 확인하고 복귀 계획을 함께 논의합니다.</p></article>
          </div>
        </Band>

        <Band id="evidence" label="CLINICAL EVIDENCE" title={<>치료의 근거는 <em>질환별로 확인합니다.</em></>}>
          <p className="rp-intro">대상 질환, 제조 방식과 비교 치료, 관찰 기간이 다르면 결과도 달라집니다.</p>
          <div className="rp-copy rp-evidence-copy">
            <h3>무릎 골관절염과 PRP</h3>
            <p>일부 지침은 보존치료 후 증상이 남는 환자에서 PRP를 고려하도록 안내합니다. 권고를 내리기에 근거가 부족하다고 평가한 지침도 있습니다. 통증과 기능의 결과를 연골 재생의 근거로 해석할 수는 없습니다. <Cite ids={['R3','R6','R7','R8','R9']}/></p>
          </div>
          <Table caption="무릎 골관절염 PRP 해외 지침과 합의 비교" data={guidelines}/>
          <p className="rp-note">해외 지침의 권고와 국내 적용 조건은 별도로 확인합니다. <Cite ids={['R3','R6','R7','R8','R9']}/></p>
          <div className="rp-evidence-studies">
            <article data-ro-reveal><h3>RESTORE · 무릎 골관절염</h3><p>KL 2~3등급 환자 288명에서 백혈구가 적은 PRP와 생리식염수를 비교했습니다. 12개월 통증과 MRI 연골 부피 변화에서 통계적으로 유의한 군 간 차이가 없었습니다. 해당 제제와 연구 조건에 대한 결과입니다. <Cite ids={['R10']}/></p></article>
            <article data-ro-reveal><h3>팔꿈치 상과염과 힘줄 질환</h3><p>팔꿈치 상과염의 적용 판단은 다른 힘줄 질환과 구분합니다. 만성 중간부 아킬레스건병증 환자 240명의 PRP와 모의 주사 비교에서는 6개월 기능 결과의 유의한 이득이 확인되지 않았습니다. <Cite ids={['R1','R11','R12']}/></p></article>
            <article data-ro-reveal><h3>PRF·i-PRF 임상 연구</h3><p>문헌고찰의 턱관절, 치과·피부 및 기초실험 결과를 무릎 연골의 임상 근거로 옮길 수 없습니다. 무릎 관절염 환자 100명의 4군 비교 연구에는 위약군이 없었고, 소규모 단일기관 조사와 탈락의 한계가 있어 우월성이나 장기 효과를 확정하기 어렵습니다. <Cite ids={['R4','R13']}/></p></article>
          </div>
          <h3 className="rp-subtitle">원리와 실제 치료 결과를 함께 봅니다.</h3>
          <Rows items={[
            ['어떤 연구인가요?', '세포·동물실험과 환자를 대상으로 한 임상시험은 확인하는 내용이 다릅니다.'],
            ['무엇과 비교했나요?', '치료 전후 변화는 다른 치료나 위약보다 더 개선됐다는 의미와 다릅니다.'],
            ['무엇이 좋아졌나요?', '통증, 움직임, 영상에서 확인한 구조 변화는 각각 구분해 해석합니다.'],
          ]}/>
          <div className="ro-center rp-evidence-link"><a className="ro-link" href="/insights/research">근거·연구 더 보기 ↗</a></div>
        </Band>

        <Band id="korea" tone="ro-intro" title="국내 적용 조건은 어떻게 확인하나요?">
          <div className="rp-copy rp-narrow" data-ro-reveal>
            <p>질환과 목적, 시행 방법과 제제에 따라 적용 조건이 달라집니다. 2024년 국내 무릎 PRP 평가보고서 요약은 1년 이상 기존 약물과 관절강내 주사에 반응하지 않은 KL 2~3등급 무릎 골관절염에서 통증과 기능 개선 목적으로 평가한 내용을 담고 있습니다. 진료 시점의 기준은 별도로 확인합니다. <Cite ids={['R14']}/></p>
            <p>PRF·i-PRF는 형태와 부위에 따라 국내 적용 근거와 병원 시행 범위를 확인해야 합니다. 의료기술 평가, 건강보험 적용과 실손보험 보장은 각각 확인합니다.</p>
          </div>
        </Band>

        <Band id="shared-decision" label="INFORMED CHOICE" title={<>이 치료를 왜 고려하는지,<br/><em>내 상태에 맞춰 설명합니다.</em></>}>
          <div className="ro-split rp-split rp-aligned-split">
            <Rows items={[
              ['왜 이 치료를 고려하나요?', '진단과 진행 정도, 이전 치료 반응이 연구 대상과 어떻게 다른지 확인합니다.'],
              ['어떤 변화를 기대하나요?', '지금 불편한 생활 동작을 기준으로 치료 목표를 함께 정합니다.'],
              ['다른 선택지는 무엇인가요?', '현재 상태에서 고려할 수 있는 대안과 주의사항을 설명합니다.'],
              ['무엇을 다시 평가하나요?', '경과를 확인할 시점과 반응이 부족할 때의 선택지를 논의합니다.'],
            ]}/>
            <Photo name="doctor-consultation.webp" direction="right" alt="진료실에서 의료진이 환자에게 검사 자료를 설명하는 장면"/>
          </div>
          <div className="ro-center"><a className="ro-link" href="/regen/principles">주사 성분 설명 원칙 ↗</a></div>
        </Band>

        <Band id="process" label="CARE PROCESS" tone="ro-process" title={<>리셋에서의 진료,<br/><em>평가부터 경과 확인까지.</em></>}>
          <p className="rp-intro">혈액 유래 제제를 이용하는 치료의 일반적인 흐름입니다.</p>
          <ol className="ro-process-steps ro-process-sequence rp-process" data-ro-reveal>
            {process.map(([name,body],index)=><li key={name} style={{'--ro-step-delay':index*1.6+'s'}}><span className="ro-point" aria-hidden="true"/><small aria-hidden="true">0{index+1}</small><h3>{name}</h3><p>{body}</p></li>)}
          </ol>
          <p className="rp-note">횟수와 간격은 치료 종류와 상태에 따라 달라집니다. <Cite ids={['R1','R3']}/></p>
        </Band>

        <Band id="rehabilitation" label="RESET 4 PRINCIPLES" tone="rp-dark" title={<>치료 이후의 움직임까지,<br/><em>리셋의 네 가지 관점으로.</em></>}>
          <div className="ro-split rp-split rp-aligned-split">
            <Photo name="hero-recovery.webp" alt="움직임과 재활을 살피는 장면"/>
            <Rows items={rehab}/>
          </div>
          <p className="rp-note">재활 시작 시점과 내용은 진단·시술 방법·경과에 맞춰 정합니다.</p>
        </Band>

        <Band id="follow-up" label="FOLLOW-UP" title={<>처음 불편했던 그 동작,<br/><em>치료 후 다시 살펴봅니다.</em></>}>
          <Table caption="재평가 때 함께 확인하는 내용" data={followUp}/>
          <p className="rp-note">변화가 충분하지 않다면 추가 치료와 다른 선택지를 다시 논의합니다.</p>
        </Band>

        <Band id="safety" legacy="aftercare" tone="ro-intro" title="치료 전후에 무엇을 확인하나요?">
          <Rows items={[
            ['치료 전 알려주세요', '복용약과 영양제, 알레르기, 동반 질환과 최근 감염이나 발열을 알려주세요. 약은 임의로 중단하지 말고 처방 의료진과 상의하세요.'],
            ['가능한 불편과 위험', '채혈이나 주사 부위의 통증·멍·붓기, 출혈·감염 또는 주변 조직의 손상이 생길 수 있습니다.'],
            ['치료 후 관리', '시술 부위와 방법에 따른 안내를 따라 활동량을 조절하고, 통증과 움직임 변화를 다음 진료 때 알려주세요.'],
            ['연락이 필요한 증상', '통증이나 붓기가 심해지거나 열감·붉어짐·발열, 지속되는 출혈이 있으면 신속히 진료받으세요. 호흡곤란 등 심한 전신 증상은 즉시 응급 도움을 요청하세요.'],
          ]}/>
        </Band>

        <section id="faq" className="ro-faq ro-faq-expanded ro-band" aria-labelledby="ro-faq-title">
          <span id="regen-faq" className="rp-anchor" aria-hidden="true"/>
          <div className="ro-wrap ro-faq-grid">
            <div className="ro-faq-heading"><p className="ro-label">QUESTIONS &amp; ANSWERS</p><h2 id="ro-faq-title">FAQ</h2><p>PRP·PRF에 대해 궁금한 점</p><span>26가지 질문</span></div>
            <div className="ro-faq-groups">
              {faqGroups.map(({title,items},groupIndex)=><section className="ro-faq-group" key={title}>
                <h3>{title}</h3>
                {items.map(([question, answer],index)=><article className="ro-faq-answer" key={question}>
                  <span className="ro-faq-number" aria-hidden="true">{String((groupIndex ? 6 : 0)+index+1).padStart(2,'0')}</span>
                  <div><h4>{question}</h4><p><Answer text={answer}/></p></div>
                </article>)}
              </section>)}
            </div>
          </div>
        </section>

        <Band id="references" label="REFERENCES" title="참고문헌과 검토 정보">
          <p className="rp-intro">자료 확인 2026.11.14 · 의료진 검토 완료</p>
          <ol className="rp-references">
            {references.map(([id, prefix, links])=><li key={id} id={'ref-' + id}>
              <span>{id}</span><div>{prefix} {links.map(([label,url])=><a key={url} href={url} target="_blank" rel="noreferrer">{label} ↗</a>)}</div>
            </li>)}
          </ol>
          <ResearchReferenceLink path="/regen/prp-prf"/>
        </Band>
      </main>
      <HomeFooter/>
      <div className="mobile-actions"><a href="tel:0312632520">전화 상담</a><a href={booking} target="_blank" rel="noreferrer">네이버 예약 ↗</a><a href="/visit">오시는 길</a></div>
    </div>
  );
}
