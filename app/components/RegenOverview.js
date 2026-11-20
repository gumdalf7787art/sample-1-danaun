import ResetBrandMeaning from './ResetBrandMeaning';
import ResearchReferenceLink from './ResearchReferenceLink';
import {researchSources} from '../data/research';
import SiteHeader from './SiteHeader';
import HomeFooter from './HomeFooter';
import {RegenTabs} from './RegenPage';
import {booking} from './DetailShell';
import RegenOverviewMotion from './RegenOverviewMotion';
import RegenConsentMarquee from './RegenConsentMarquee';
import RecoveryBeam from './RecoveryBeam';

const options = [
  {
    name: '리젠 주사',
    feature: '진단에 맞춘 주사치료',
    description: '진찰과 필요한 초음파 평가로 통증에 관여하는 인대·힘줄 등 조직을 살핍니다. 진단과 조직 상태에 따라 주사치료가 필요한지 검토하고, 선택한 성분과 목적을 설명합니다.',
    image: 'regen-injection-lumbar.webp',
    href: '/regen/injection',
  },
  {
    name: 'PRP',
    feature: '혈소판이 풍부한 혈장',
    description: '자신의 혈액을 채취해 혈소판이 풍부한 혈장 성분을 분리해 활용합니다. 제조 방법에 따라 성분 구성이 달라질 수 있으며, 질환과 부위별로 적용 조건을 확인합니다.',
    image: 'regen-photo-02.webp',
    href: '/regen/prp-prf#prp',
  },
  {
    name: 'PRF',
    feature: '혈소판과 피브린',
    description: '자신의 혈액에서 얻는 혈소판과 피브린 관련 제제입니다. PRP와는 제조 방법과 제제의 특성이 다르며, 근골격계 적용 범위와 실제 시행 여부는 별도로 확인합니다.',
    image: 'regen-prf-mesh.webp',
    href: '/regen/prp-prf#prf',
  },
  {
    name: '무릎 SVF',
    feature: '자가지방에서 분리한 세포 성분',
    description: '자신의 지방 조직에서 여러 종류의 세포가 포함된 성분을 분리해 무릎 관절에 활용하는 방법입니다. 관절염의 단계와 이전 치료 반응, 건강 상태를 살펴 적용 여부를 판단합니다.',
    image: 'regen-photo-04.webp',
    href: '/regen/knee-svf',
  },
];

const careStandards = [
  {
    title: '원인 평가',
    description: '통증에 관여하는 조직과 움직임을 살핍니다.',
    icon: <><circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4.5 4.5"/></>,
  },
  {
    title: '성분 설명',
    description: '주사를 고려할 때 성분과 사용 목적을 설명합니다.',
    icon: <><path d="M7 3.5h7l4 4v13H6v-17h1Zm7 0v4h4"/><path d="M9 12h6m-6 4h6"/></>,
  },
  {
    title: '맞춤 치료',
    description: '진찰 결과와 환자 상태에 맞춰 치료 방법을 함께 선택합니다.',
    icon: <><path d="M5 6h14M5 12h14M5 18h14"/><path d="M10 4v4m5 2v4m-6 2v4" strokeWidth="2.5"/></>,
  },
  {
    title: '회복 관리',
    description: '치료 후 변화를 다시 확인하고 필요한 재활을 계획합니다.',
    icon: <><path d="M4 5v14h16"/><path d="M7 15c3 0 3-5 6-5 2 0 2 1 3 1 2 0 2-4 4-4"/><circle cx="20" cy="7" r="1"/></>,
  },
];

const steps = [
 ['진료와 평가','통증의 원인과 조직 상태, 기능을 확인합니다.'],
 ['치료 방법 선택','성분과 목적, 대안과 주의점을 설명한 뒤 치료를 결정합니다.'],
 ['정기 재평가','통증과 기능의 변화, 추가 치료 필요성을 확인합니다.'],
 ['운동치료·생활 관리','오래 쓰는 관절을 위해 재활과 생활 관리를 함께 설계합니다.'],
];
const faqGroups = [
 {title:'RESET REGEN의 이해', items:[
  ['RESET REGEN은 어떤 치료인가요?', '한 종류의 주사나 모든 사람에게 같은 치료를 제공하는 상품이 아닙니다. 조직 상태와 움직임을 평가해 주사치료의 필요성을 검토하고, 치료 이후의 재평가와 재활까지 연결하는 진료 방향입니다.'],
  ['리젠 주사·PRP·PRF·무릎 SVF는 어떻게 다른가요?', '리젠 주사는 진단에 맞춰 검토하는 주사치료 프로그램의 이름입니다. PRP와 PRF는 자신의 혈액에서, SVF는 지방 조직에서 얻는 성분을 활용합니다. 원료와 준비 방법, 적용 대상과 시술 부담이 달라 같은 치료로 볼 수 없습니다.'],
  ['재생치료를 받으면 손상된 조직이 원래대로 돌아오나요?', '손상된 조직이 원래 상태로 돌아온다고 보장할 수는 없습니다. 통증과 기능의 개선, 조직의 구조적 회복은 구분해야 합니다. 기대할 수 있는 변화와 한계를 설명하고 실제 경과를 확인합니다.'],
  ['통증이 있는 사람이라면 누구나 받을 수 있나요?', '통증이 있다는 이유만으로 주사치료가 필요한 것은 아닙니다. 원인과 손상 정도, 건강 상태와 이전 치료 반응을 살펴 운동·생활 관리, 약물·물리치료 등 다른 선택지도 함께 검토합니다.']
 ]},
 {title:'리젠 주사', items:[
  ['리젠 주사에는 어떤 성분이 들어가나요?', '리젠 주사는 하나의 고정된 약제명이 아닙니다. 진단과 조직 상태에 따라 검토하는 성분이 달라지므로, 시술 전에 실제 제품과 성분, 적용 부위와 목적을 설명합니다. 여러 성분을 일괄 혼합한다는 뜻도 아닙니다.'],
  ['리젠 주사에는 스테로이드가 들어가나요?', '리셋은 환자에게 설명되지 않은 스테로이드를 사용하지 않습니다. 스테로이드가 무조건 제외된다는 뜻은 아니며, 필요한 경우 사용 목적과 이득·위험, 다른 선택지를 설명한 뒤 함께 결정합니다.'],
  ['일반적인 통증 주사와 리젠 주사는 무엇이 다른가요?', '주사의 이름만으로 성분이나 효과를 구분할 수는 없습니다. 실제 성분과 시술 방법, 통증·염증 조절 등 치료 목적을 확인해야 합니다. 리셋은 주사 선택뿐 아니라 치료 후 기능 평가와 재활 계획도 함께 살핍니다.']
 ]},
 {title:'PRP · PRF', items:[
  ['PRP는 내 혈액을 이용하는 치료인가요?', '네. 자신의 혈액을 채취한 뒤 혈소판이 풍부한 혈장을 분리해 활용합니다. 준비 방법에 따라 성분 구성이 달라질 수 있으며, 자가혈을 사용한다고 모든 질환에 적합하거나 효과가 보장되는 것은 아닙니다.'],
  ['PRP는 어떤 경우에 치료 선택지로 검토하나요?', '무릎 관절염 등 질환과 적용 부위별로 근거와 적용 조건을 확인해 검토합니다. 같은 통증이라도 진단과 진행 정도, 기존 치료 반응에 따라 판단이 달라지므로, 진료에서 실제 시행 가능 여부를 확인합니다.'],
  ['PRF는 PRP와 무엇이 다른가요?', '두 제제 모두 자가혈액을 이용하지만 준비 방법과 피브린 구조 등 제제의 특성이 다릅니다. PRF라는 이름만으로 PRP보다 효과가 좋거나 오래간다고 판단할 수 없으며, 적용 목적과 근거를 각각 확인해야 합니다.'],
  ['PRF는 어떤 경우에 검토하고, 효과는 어떻게 판단하나요?', '적용 부위와 목적, 제조 방법에 맞는 근거를 확인한 뒤 검토합니다. 원리 설명과 병원의 실제 시행 여부는 구분하며, 근골격계 적용은 별도 확인이 필요합니다. 치료를 시행하는 경우 통증과 기능의 변화를 재평가합니다.']
 ]},
 {title:'무릎 SVF', items:[
  ['무릎 SVF는 어떤 성분을 이용하나요?', '자신의 지방 조직에서 분리한 여러 종류의 세포가 포함된 기질혈관분획을 이용합니다. 단일한 줄기세포나 배양·증식한 세포치료제와는 구분됩니다. 지방을 채취하는 과정이 필요하므로 채취와 주사 각각의 부담을 설명합니다.'],
  ['무릎 관절염이면 누구나 SVF를 받을 수 있나요?', '모든 무릎 관절염 환자에게 적합한 것은 아닙니다. 영상과 진찰로 관절염의 단계, 이전 치료 반응, 감염·출혈 위험과 전신 상태를 확인합니다. 실제 적용 조건과 시술 방법을 확인하고 다른 치료와 비교해 결정합니다.'],
  ['무릎 SVF를 받으면 수술을 피할 수 있나요?', '수술을 피하거나 연골이 재생된다고 보장할 수 없습니다. 통증과 기능의 변화는 개인마다 다르며, 진행된 관절염 등에서는 수술 상담이 더 적합할 수 있습니다. 필요한 경우 전문기관 상담을 안내합니다.']
 ]},
 {title:'치료 전후와 안전성', items:[
  ['어떤 치료가 나에게 맞는지는 어떻게 결정하나요?', '증상과 불편한 동작, 진찰 소견과 필요한 영상검사를 함께 살핍니다. 기존 치료 반응, 건강 상태와 회복하고 싶은 활동을 확인하고, 주사를 받지 않는 선택을 포함해 가능한 방법을 설명한 뒤 함께 결정합니다.'],
  ['복용 중인 약이나 질환이 있으면 미리 알려야 하나요?', '네. 복용약과 영양제, 기저질환, 감염·발열 여부와 과거 주사·약물 알레르기를 알려주세요. 특히 출혈이나 치료 반응에 영향을 줄 수 있는 약은 확인이 필요합니다. 약은 임의로 중단하지 말고 의료진과 상의하세요.'],
  ['내 혈액이나 지방을 사용하면 부작용이 없나요?', '자가 성분을 사용해도 위험이 없어지는 것은 아닙니다. 채혈·지방 채취·주사 과정에서 통증, 멍, 출혈이나 감염 등이 생길 수 있습니다. 추가 약제나 마취가 필요한 경우에는 그에 따른 주의점도 확인합니다.'],
  ['효과는 언제 확인하고, 몇 번 받아야 하나요?', '진단과 시술 방법, 개인의 상태에 따라 횟수와 간격이 달라집니다. 첫 시술 직후 달라지지 않을 수 있으며, 미리 정한 횟수가 효과를 보장하지 않습니다. 통증과 일상 기능을 다시 확인해 계속할지, 변경하거나 중단할지 판단합니다.'],
  ['치료 후 통증이 생기면 어떻게 해야 하나요?', '시술 후 불편감이 생길 수 있지만, 모든 통증을 정상 반응으로 넘기지는 않습니다. 통증·붓기가 심해지거나 열감·발적·발열이 있으면 병원에 연락하거나 진료받으세요. 호흡곤란 등 심한 전신 증상은 즉시 응급 진료가 필요합니다.'],
  ['주사치료 후에도 운동과 재활이 필요한가요?', '필요한 경우 주사치료 이후에도 근력과 움직임, 일상 기능을 관리합니다. 운동 재개 시점과 강도는 시술 부위와 회복 경과에 맞춰 안내합니다. 무리한 운동을 바로 시작하기보다 상태를 확인하며 활동량을 단계적으로 조절합니다.']
 ]},
];

function Link({href,children,external=false}) {return <a className="ro-link" href={href} {...(external?{target:'_blank',rel:'noreferrer'}:{})}>{children}<span aria-hidden="true">↗</span></a>}
export default function RegenOverview(){
 return <div className="regen-overview"><a className="skip" href="#main">본문 바로가기</a><SiteHeader/><main id="main"><RegenOverviewMotion/>
  <section className="ro-hero" aria-labelledby="ro-title">
   <picture className="ro-hero-image"><source media="(max-width:640px)" srcSet="/images/hero-regen-depth-mobile.webp"/><img src="/images/hero-regen-depth.webp" alt="" fetchPriority="high"/></picture>
   <div className="ro-hero-content">
    <p className="ro-label" lang="en">RESET REGEN</p>
    <p className="ro-hero-sub">리셋재활의학과 맞춤형 조직 회복 프로그램</p>
    <h1 id="ro-title"><em>재생치료 소개</em></h1>
    <p>조직의 상태에 맞는 치료를 선택하고,<br/>치료 이후의 재평가와 재활까지 함께합니다.</p>
   </div>
  </section>
  <RegenTabs active="overview"/>
  <section className="ro-intro ro-concept ro-band" id="understand" aria-labelledby="ro-concept-title">
    <div className="ro-wrap">
      <div className="ro-concept-definition">
        <h2 id="ro-concept-title" data-ro-title><span lang="en">RESET REGEN</span>은 무엇인가요?</h2>
        <p>RESET REGEN은 리셋재활의학과의원의 맞춤형 조직 회복 프로그램입니다.</p><p>정밀한 진찰과 초음파 평가를 바탕으로 통증에 관여하는 조직의 상태를 살피고, 환자에게 적합한 치료와 재활을 함께 설계합니다.</p>
      </div>
      <div className="ro-concept-approach" data-ro-reveal>
        <p className="ro-label" lang="en">THE RESET APPROACH</p>
        <h3>하나의 주사보다,<br/><em className="ro-concept-highlight" data-ro-highlight>나에게 맞는 치료의 과정.</em></h3>
        <ul className="ro-concept-steps" data-ro-standards aria-label="진료의 네 가지 기준">
          {careStandards.map(({title, description, icon}, index) => (
            <li key={title} style={{'--standard-delay': `${index * 140}ms`}}>
              <span className="ro-standard-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
              </span>
              <strong>{title}</strong>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
  <ResetBrandMeaning/>
  <section className="ro-why ro-band" id="why-regen" aria-labelledby="ro-why-title">
    <div className="ro-wrap">
      <div className="ro-heading ro-why-heading"><p className="ro-label">WHY REGEN</p><h2 id="ro-why-title" data-ro-title>왜 조직의 회복까지 생각할까요?</h2><div data-ro-reveal><h3 className="ro-why-statement">통증이 줄었다고,<br/><em>다 나은 것은 아닙니다.</em></h3><p>통증이 사라지는 것과 손상된 조직이 회복되는 것은 다를 수 있습니다.</p><p>리셋은 통증의 변화뿐 아니라 인대·힘줄 등 관련 조직의 상태와 움직임을 함께 살피고,<br className="ro-desktop-break"/> 치료 이후에도 경과를 확인합니다.</p></div></div>
      <div className="ro-comparison ro-comparison-photos">
        {[
          ['pain','01 · PAIN','통증의 변화','현재 느끼는 불편감과 일상생활에서의 통증 변화를 확인합니다.','무릎의 불편감을 살피는 모습을 표현한 예시'],
          ['function','02 · FUNCTION','조직과 기능의 상태','손상 부위의 상태와 근육 기능, 움직임의 변화를 함께 평가합니다.','무릎의 움직임 범위를 평가하는 모습을 표현한 예시'],
        ].map(([image,label,title,body,alt]) => <article key={image} data-ro-reveal={image === "pain" ? "left" : "right"} data-ro-reveal-delay="0">
          <img src={'/images/regen-'+image+'-1120.webp'} srcSet={'/images/regen-'+image+'-640.webp 640w, /images/regen-'+image+'-1120.webp 1120w'} sizes="(max-width:640px) calc(100vw - 44px), (max-width:1272px) 43vw, 548px" width="1120" height="747" alt={alt} loading="lazy" decoding="async"/>
          <div className="ro-comparison-copy"><span>{label}</span><h3>{title}</h3><p>{body}</p></div>
        </article>)}
      </div>
    </div>
  </section>
  <section className="ro-personal ro-personal-parallax ro-band" id="personalized-program" aria-labelledby="ro-personal-title">
    <div className="journey-backdrop" aria-hidden="true"><img src="/images/regen-personal-dna.webp" width="1672" height="941" alt="" loading="lazy" decoding="async"/></div>
    <div className="ro-wrap ro-personal-layout">
      <div className="ro-personal-copy"><p className="ro-label">PERSONALIZED RECOVERY PROGRAM</p><h2 id="ro-personal-title">같은 통증이라도,<br/><em>치료는 달라질 수 있습니다.</em></h2><p>같은 무릎 통증이라도 손상된 조직과 상태가 다르면 치료도 달라집니다.</p><p>RESET REGEN은 초음파 평가와 진찰 결과를 바탕으로 여러 주사치료 중 적합한 방법을 검토하고, 운동치료와 생활 관리를 함께 고려하는 맞춤형 프로그램입니다.</p></div>
      <ol className="ro-personal-steps">
        {[
          ['조직 상태 확인','인대·힘줄·관절과 움직임 평가'],
          ['치료 방법 선택','진단에 맞는 주사치료 검토'],
          ['회복 과정 관리','재평가·운동치료·생활 관리'],
        ].map(([title,body],i)=><li key={title} data-ro-reveal data-ro-reveal-delay={i * 120}><span>0{i+1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}
      </ol>
    </div>
  </section>
  <section className="ro-options ro-wrap ro-band" id="options">
    <div className="ro-heading" data-ro-reveal>
      <p className="ro-label">REGENERATIVE TREATMENT — 4가지 재생 치료</p>
      <h2>회복을 위한<br/><em>다양한 치료 선택지</em></h2>
      <p>환자의 상태와 치료 목적에 따라 적합한 방법을 검토합니다.<br/>모든 환자에게 같은 치료를 적용하지 않습니다.</p>
    </div>
    <div className="ro-option-grid" id="content-0">
      {options.map(({name, feature, description, image, href}, index) => (
        <article className="ro-option" key={name} data-ro-reveal data-ro-reveal-delay={index * 110}>
          <a href={href} aria-label={name + ' 자세히 보기'}>
            <div className="ro-option-image">
              <img src={'/images/' + image} alt="" width="800" height="1000" loading="lazy"/>
            </div>
            <div className="ro-option-copy">
              <h3>{name}</h3>
              <p className="ro-option-feature">{feature}</p>
              <p>{description}</p>
              <span className="ro-option-more">자세히 보기 <span aria-hidden="true">↗</span></span>
            </div>
          </a>
        </article>
      ))}
    </div>
    <p className="ro-note">치료의 적용 여부는 진료 후 결정되며 개인에 따라 달라집니다.</p>
  </section>
  <section className="ro-precision ro-band" id="precision" aria-labelledby="ro-precision-title">
    <div className="ro-wrap">
      <div className="ro-heading" data-ro-reveal><p className="ro-label">PRECISION FIRST · 치료보다 먼저, 정확한 평가</p><h2 id="ro-precision-title">치료보다 먼저,<br/><em>통증이 시작되는 곳을 찾습니다.</em></h2><p>리셋은 통증이 나타나는 부위뿐 아니라 인대·힘줄·근육·근막·신경 주변 조직과 움직임을 함께 살핍니다.<br/>진찰과 초음파, 움직임 평가 결과를 종합하여 치료 방향을 정합니다.</p></div>
      <div className="ro-precision-layout"><figure data-ro-reveal="left" data-ro-reveal-delay="0"><img src="/images/regen-ultrasound-focus-1120.webp" srcSet="/images/regen-ultrasound-focus-640.webp 640w, /images/regen-ultrasound-focus-1120.webp 1120w" sizes="(max-width:640px) calc(100vw - 44px), (max-width:1272px) 47vw, 565px" width="1120" height="747" loading="lazy" decoding="async" alt="무릎에 탐촉자를 대고 초음파로 평가하는 모습과 뒤쪽의 초음파 모니터"/></figure>
        <ol className="ro-evaluation-list">{[['인대·힘줄','손상 부위와 조직 상태'],['근육 기능','근력과 근육의 사용 양상'],['근막·신경 주변','통증에 관여할 수 있는 주변 조직'],['움직임','일상 동작에서 부담이 실리는 부위'],['치료 설계','주사·운동·생활 관리의 조합']].map(([title,body],i)=><li key={title} data-ro-reveal data-ro-reveal-delay={i * 100}><span>0{i+1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol>
      </div><div className="ro-center"><Link href="/diagnosis">정밀 진단 알아보기</Link></div>
    </div>
  </section>
  <section className="ro-process ro-band" id="aftercare" aria-labelledby="ro-aftercare-title"><div className="ro-wrap">
    <div className="ro-heading" data-ro-reveal><p className="ro-label">BEYOND INJECTION · 주사로 끝나지 않는 치료</p><span className="ro-message">RESET MESSAGE 007</span><h2 id="ro-aftercare-title">회복에는 <em>시간이 걸립니다.</em></h2><p>재생 치료는 첫 시술 직후부터 변화를 보장하는 치료가 아닙니다.<br/>치료 간격과 횟수는 환자의 상태에 따라 달라질 수 있으며,<br/>치료 후 경과를 다시 확인하는 과정이 중요합니다.</p></div>
    <ol className="ro-process-steps ro-process-sequence" data-ro-reveal>{steps.map(([title,body],i)=><li key={title}><span className="ro-point" aria-hidden="true"/><small>0{i+1}</small><h3>{title}</h3><p>{body}</p></li>)}</ol>
    <RecoveryBeam/>
  </div></section>
  <section className="ro-principles ro-principles-policy ro-band" id="principles" aria-labelledby="ro-principles-title">
    <img className="ro-consult-image" src="/images/regen-evidence-consultation.webp" width="1672" height="941" loading="lazy" alt=""/>
    <div className="ro-wrap">
      <div className="ro-principles-copy" data-ro-reveal>
        <p className="ro-label">BEFORE YOUR TREATMENT</p>
        <h2 id="ro-principles-title">설명되지 않은<br/><em>스테로이드를 사용하지 않습니다.</em></h2>
        <p className="ro-principles-message">무엇을 맞는지,<br/><em>알고 맞으셔야 합니다.</em></p>
        <p>스테로이드를 포함해 어떤 주사든 성분과 목적, 기대할 수 있는 이득과 주의점을 설명한 뒤 함께 결정합니다.</p>
        <RegenConsentMarquee/>
        <Link href="/regen/principles">주사 성분 설명 원칙</Link>
        <a className="ro-doctor" href="/about/doctor">이고은 대표원장 · 의료진 소개 ↗</a>
      </div>
    </div>
  </section>
  <section className="ro-faq ro-faq-expanded ro-band" id="regen-faq" aria-labelledby="ro-faq-title">
    <div className="ro-wrap ro-faq-grid">
      <div className="ro-faq-heading"><p className="ro-label">QUESTIONS &amp; ANSWERS</p><h2 id="ro-faq-title">FAQ</h2><p>치료를 이해하고,<br/>충분히 알고 선택하도록.</p><span>RESET REGEN · 20가지 질문</span></div>
      <div className="ro-faq-groups">
        {faqGroups.map((group, groupIndex) => <section className="ro-faq-group" key={group.title} aria-labelledby={'ro-faq-group-' + groupIndex}>
          <h3 id={'ro-faq-group-' + groupIndex}>{group.title}</h3>
          {group.items.map(([question, answer], index) => {
            const number = faqGroups.slice(0, groupIndex).reduce((total, entry) => total + entry.items.length, 0) + index + 1;
            return <article className="ro-faq-answer" key={question} id={'regen-question-' + number}>
              <span className="ro-faq-number" aria-hidden="true">{String(number).padStart(2, '0')}</span>
              <div><h4>{question}</h4><p>{answer}</p></div>
            </article>;
          })}
        </section>)}
        <p className="ro-faq-footnote">일반적인 치료 이해를 돕는 안내입니다. 실제 시행 여부와 적용 조건은 진료에서 확인합니다. <a href="/insights/research">근거·연구 살펴보기 ↗</a></p>
      </div>
    </div>
  </section>
  <aside id="references" className="ro-review ro-wrap" aria-label="참고 자료와 검토 안내">
    <p>병원 제공 기획안과 기존 RESET REGEN 자료를 바탕으로 구성한 일반 정보입니다. 실제 시행 여부와 개인별 치료 계획은 진료에서 확인합니다.</p>
    <p>의료진 검토 완료</p>
    <ul className="regen-overview-references">
      {researchSources.map(({id, label, href}) => <li key={id} id={'regen-source-' + id}>
        <a href={href} target="_blank" rel="noreferrer">{label} <span aria-hidden="true">↗</span></a>
      </li>)}
    </ul>
    <ResearchReferenceLink path="/regen"/>
  </aside>
 </main><HomeFooter/><div className="mobile-actions"><a href="tel:0312632520">전화 상담</a><a href={booking} target="_blank" rel="noreferrer">네이버 예약 ↗</a><a href="/visit">오시는 길</a></div></div>
}
