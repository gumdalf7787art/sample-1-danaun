import {HomeQuestions} from './HomeTrust';
import HomeConsultation from './HomeConsultation';
import HomeVisit from './HomeVisit';
import {HomeAssessment, HomeDoctorProfile, HomeRecoveryNotes} from './HomeClinicalSections';
import HomeScrollMotion from './HomeScrollMotion';
import JourneyBackdrop from './JourneyBackdrop';
import RegenHero from './RegenHero';
import RegenConcepts from './RegenConcepts';
import ResetPrinciples from './ResetPrinciples';
import SiteHeader from './SiteHeader';
import HomeFooter from './HomeFooter';
import {centers as centerPages} from '../data/centers';

const booking='/support/booking';
const therapies=[['01','리젠 주사','REGEN INJECTION','상태에 맞춰 검토하는 주사치료 프로그램','인대·힘줄 등 통증에 관여하는 조직을 평가하고, 진단과 상태에 따라 치료 방법을 검토합니다.'],['02','PRP','PLATELET-RICH PLASMA','내 혈액에서 얻는 혈소판 풍부 혈장','자가혈액에서 혈소판이 풍부한 혈장을 분리해 활용하는 치료입니다. 대상과 적용 조건은 진료를 통해 확인합니다.'],['03','PRF','PLATELET-RICH FIBRIN','혈소판과 피브린 성분에 대한 이해','자가혈액의 혈소판과 피브린 성분을 활용하는 접근입니다. 적용 부위와 제조 방법에 대한 확인이 필요한 항목으로, 이번 화면은 구성 검토용입니다.'],['04','무릎 SVF','STROMAL VASCULAR FRACTION','자가지방유래 기질혈관분획','무릎 관절에 적용하는 세포 기반 치료에 관한 안내 영역입니다. 실제 적용 기준과 시행 방법은 의료진 확인 후 상세 안내합니다.']];
const centerLinkLabels = {
  'breast-cancer-rehab': '유방암 수술 후 재활 안내',
  posture: '척추측만증·체형 교정 상담',
};
const centers=[['SPORTS INJURY','스포츠손상','움직임과 일상으로 돌아가는 과정','발목 인대 손상, 어깨 회전근개, 테니스·골프엘보 등 운동 중 발생하는 손상을 평가합니다.','M20 58l14-14 13 3 10-19m-24 16-8-17m22 20 12 15m-27-35 17-7m8 8 10 1'],['JOINT CARE','퇴행성 관절염','오래 쓸 관절을 위한 단계별 진료','무릎·어깨·고관절 등의 상태를 살피고, 관절 기능과 일상 동작을 함께 평가합니다.','M32 12l5 22-9 11 4 24m20-57-5 22 9 11-4 24M33 34q9 8 18 0M30 46q12-6 24 0'],['SPINE CARE','척추 재생','목과 허리, 통증의 원인부터','목·허리 통증을 진찰과 영상, 움직임 평가로 살펴보고 치료 방향을 정합니다.','M42 10c-23 16 23 38 0 60M30 18l15 5m-15 5 15 5m-12 5 15 5m-10 5 15 5m-17 5 14 5'],['BREAST CANCER REHAB','유방암 재활','수술 후 일상을 위한 세심한 관리','수술 후 어깨 운동 제한과 팔의 불편감 등 일상 복귀를 위한 재활을 안내합니다.','M29 65l25-38c10-20-28-22-18-2l25 40M36 25l9 14 9-12'],['POSTURE & MOVEMENT','척추·체형 교정','몸의 균형과 바른 움직임','척추측만증과 체형 불균형을 평가하고, 정기적인 경과 확인과 운동을 함께 계획합니다.','M42 21v28m-19-18 19 5 19-5M42 49 27 69m15-20 15 20M35 11a7 7 0 1 0 14 0 7 7 0 1 0-14 0'],['HEALTHY AGING','항노화·피부·두피','건강하게 나이 드는 삶을 위해','근력·균형과 함께 피부·두피에 대한 고민을 상담하고 개인의 상태에 맞는 관리 방향을 살핍니다.','M42 68V32m0 13C16 45 16 19 16 19s27 0 26 26m0-8C68 37 68 11 68 11S41 11 42 37']];
const centerSummaries = [
  { principles: '회복 · 안정성', targets: ['무릎 인대, 발목 인대, 테니스엘보', '골프엘보, 슬개건, 러닝부상'], program: ['리셋 리커버리', '1:1 운동치료와 복귀 테스트'] },
  { principles: '회복 · 움직임', targets: ['무릎 · 어깨 관절염', '고관절 · 손가락 관절염'], program: ['리셋 조인트', '근력 운동과 경과 재평가'] },
  { principles: '회복 · 안정성', targets: ['목·허리 디스크 · 척추관협착', '후관절·천장관절 · 척추 인대'], program: ['척추 회복 과정', '원인 평가와 몸통 안정화'] },
  { principles: '움직임 · 회복', targets: ['수술 후 어깨 제한 · 림프부종', '겨드랑이 당김 · 근력 저하·피로'], program: ['리셋 케어', '종양 주치의 협진 고려'] },
  { principles: '연결성 · 안정성', targets: ['청소년·성인 측만증 · 골반 불균형', '거북목 · 라운드숄더'], program: ['전문의 평가 · STOTT 운동', '『골반리셋클리닉』'] },
  { principles: '안정성 · 회복', targets: ['근감소·근력 저하 · 낙상·균형', '피부 탄력·피부결 · 두피·탈모'], program: ['리셋 에이징', '피부·두피와 신체 기능 관리'] },
];
function Arrow({diagonal=false}) {return <span aria-hidden="true">{diagonal?'↗':'↗'}</span>}
export default function Home({media}){
return <><a className="skip" href="#main">본문 바로가기</a><main id="main" className="home-premium"><HomeScrollMotion resetScrollOnVisit/><SiteHeader home/><section className="hero regen-hero-upgrade">
<RegenHero/></section><div className="notice"><span>진료 안내</span> 다나은재활의학과의원 홈페이지 샘플입니다.<a href="/visit">내원 안내 <span>↗</span></a></div>
<section className="section regen regen-editorial" id="regen"><div className="section-top"><div><p className="eyebrow">DANAUN REGEN</p><h2 className="regen-editorial-title"><span className="regen-title-line">나에게 맞는 재생치료,</span><span className="regen-title-line"><em>회복의 시작.</em></span></h2></div><p className="section-intro">치료의 이름보다 중요한 것은 나의 상태입니다.<br/>성분과 목적을 이해하고, 적합한 치료를 함께 선택합니다.</p></div><div className="therapy-grid">{therapies.map(([num,name,en,desc,body])=><a className="therapy" key={num} href={{"01":"/regen/injection","02":"/regen/prp-prf#prp","03":"/regen/prp-prf#prf","04":"/regen/knee-svf"}[num]}><div className="therapy-image"><img src={'/images/'+(num==='01'?'regen-injection-lumbar':num==='03'?'regen-prf-mesh':'regen-photo-'+num)+'-800.webp'} srcSet={'/images/'+(num==='01'?'regen-injection-lumbar':num==='03'?'regen-prf-mesh':'regen-photo-'+num)+'-480.webp 480w, /images/'+(num==='01'?'regen-injection-lumbar':num==='03'?'regen-prf-mesh':'regen-photo-'+num)+'-800.webp 800w'} sizes="(max-width:640px) calc(100vw - 48px), (max-width:1000px) 45vw, 23vw" width="800" height="1000" alt={{'01':'허리에 주사를 놓는 장면을 표현한 실사풍 예시 이미지','02':'혈장과 혈소판을 표현한 PRP 개념 이미지','03':'피브린 망과 혈소판을 표현한 PRF 개념 이미지','04':'무릎 진찰 장면을 표현한 실사풍 개념 이미지'}[num]} loading="lazy" decoding="async"/><span className="therapy-number">{num}</span></div><div className="therapy-body"><p className="micro">{en}</p><h3>{name}</h3><p className="therapy-description">{desc}</p><span className="therapy-more">자세히 알아보기 <Arrow/></span></div></a>)}</div><div className="regen-editorial-note"><p className="footnote">치료의 적용 여부와 방법은 진료 후 결정되며, 개인의 상태에 따라 달라질 수 있습니다.</p></div></section>
<section className="promise consultation-story" id="injection-principles" aria-labelledby="consultation-title">
<div className="consultation-backdrop" aria-hidden="true"><img src="/images/danaun-doctor.png" width="1672" height="941" alt="" loading="lazy"/></div>
<div className="consultation-content">
 <div className="consultation-copy"><p className="eyebrow">THE DANAUN STANDARD</p><h2 id="consultation-title">무엇을 맞는지,<br/><em>알고 맞으셔야 합니다.</em></h2><p className="consultation-lead">치료의 시작은,<br/>충분히 이해하는 시간입니다.</p><p className="consultation-description">어떤 성분을 왜 사용하는지, 기대할 수 있는 변화와<br className="consultation-break"/> 주의할 점은 무엇인지 먼저 설명합니다.<br/>환자의 상태와 질문을 함께 살피며 치료를 선택합니다.</p><p className="consultation-principle">저희 병원은 환자에게 설명되지 않은<br/>스테로이드 사용 여부를 사전에 설명합니다.</p><a href="/regen/principles" className="underline-link">주사 성분 설명 원칙 <Arrow/></a></div>
 <div className="consultation-details">{[['01','성분과 목적','무엇을 사용하는지, 어떤 목적으로 고려하는지 설명합니다.'],['02','기대 효과와 주의점','기대할 수 있는 이득과 한계, 부작용과 대안을 함께 살핍니다.'],['03','치료 후 확인','치료 후 조직의 상태와 움직임을 확인하고 재활 방향을 함께 정합니다.']].map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div>
</div></section>
<ResetPrinciples/>
<HomeAssessment/>
<section className="section centers centers-editorial" id="centers"><div className="section-top"><div><p className="eyebrow">SPECIALIZED CARE</p><h2><span className="center-title-line">당신의 회복을 위한, <em>치료 센터.</em></span></h2></div><p className="section-intro">이런 분들이 찾아오십니다.</p></div><div className="center-grid">{centers.map(([en,name],i)=><a key={en} className="center" href={"/centers/"+centerPages[i].slug}><div className="center-photo"><img src={`/images/center-care-${i+1}-800.webp`} srcSet={`/images/center-care-${i+1}-480.webp 480w, /images/center-care-${i+1}-800.webp 800w`} sizes="(max-width:640px) calc(50vw - 32px), (max-width:1000px) 45vw, 30vw" decoding="async" width="800" height="1000" alt={["발목을 평가하는 스포츠손상 진료 예시","무릎을 살피는 관절 진료 예시","목과 등 상태를 평가하는 척추 진료 예시","팔 움직임을 돕는 여성 재활 진료 예시","서 있는 자세를 살피는 체형 평가 예시","두피 상태를 살피는 진료 예시"][i]} loading="lazy"/></div><div className="center-content"><p className="micro"><span>0{i+1}</span>{en}</p><h3>{name} <span>센터</span></h3><p className="center-principles"><span aria-hidden="true">◇</span> {centerSummaries[i].principles}</p>{[0,1,2,5].includes(i)&&<span className="center-regen-tag">재생치료 검토</span>}<dl className="center-summary"><div><dt>대상</dt><dd>{centerSummaries[i].targets.map(line => <span key={line}>{line}</span>)}</dd></div><div><dt>프로그램</dt><dd>{centerSummaries[i].program.map(line => <span key={line}>{line}</span>)}</dd></div></dl><span className="center-link">{centerLinkLabels[centerPages[i].slug] ?? '진료 자세히 보기'} <Arrow/></span></div></a>)}</div><p className="center-expectations">치료의 결과는 사람마다 다릅니다. 가능한 것과 어려운 것을 진료 때 솔직하게 말씀드립니다.<br/>재생치료는 평가 결과와 적용 기준에 따라 검토하며, 모든 환자에게 시행하지 않습니다.</p></section>
<RegenConcepts/>
<section className="journey" id="journey" aria-labelledby="journey-title">
  <JourneyBackdrop/>
  <div className="section">
    <div className="journey-intro">
      <h2 id="journey-title">DANAUN REGEN 치료과정</h2>
      <p className="section-intro">평가하고, 설명을 듣고, 치료 후의 변화까지 함께 살핍니다.</p>
    </div>
    <ol className="recovery-flow" role="list">
      {[
        ['평가', '진찰과 필요한 검사를 통해 통증이 시작된 곳과 불편한 움직임을 확인합니다.'],
        ['재생주사', '평가 결과에 따라 필요한 경우 검토합니다. 성분과 목적, 대안을 설명하고 치료를 함께 결정합니다.'],
        ['재평가', '치료 후 통증과 움직임이 어떻게 달라졌는지 다시 살피고, 다음 계획을 조정합니다.'],
        ['재활', '운동과 생활 관리를 통해 일상에 필요한 움직임을 회복할 수 있도록 돕습니다.'],
      ].map(([title, description], index) => (
        <li key={title} className="recovery-step" style={{'--step-index': index}}>
          {index < 3 && <span className="flow-track" aria-hidden="true"><span /></span>}
          <span className="step-dot" aria-hidden="true" />
          <p className="recovery-step-number" aria-hidden="true">0{index + 1}</p>
          <h3>{title}</h3>
          <p className="recovery-step-copy">{description}</p>
        </li>
      ))}
    </ol>
    <HomeRecoveryNotes/>
  </div>
</section>
<HomeDoctorProfile/>
{media}
<HomeQuestions/>
<HomeConsultation/>
<HomeVisit/>
</main><HomeFooter/><div className="mobile-actions"><a href="/visit">전화 상담</a><a href={booking}>예약 안내 ↗</a><a href="/visit">오시는 길</a></div>
</>}
