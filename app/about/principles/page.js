import AboutDetail from '../../components/AboutDetail';
import RecoveryBeam from '../../components/RecoveryBeam';
import ResetBrandMeaning from '../../components/ResetBrandMeaning';
import ResetPrinciples from '../../components/ResetPrinciples';
import {pageMeta} from '../../data/seo';
import './principles.css';

const path = '/about/principles';
const title = '다나은 4원칙';
const summary = '통증의 원인을 살피고, 다시 하고 싶은 일상을 함께 생각합니다.';
const description = '다나은재활의학과의원의 원인 평가·성분 설명·맞춤 치료·회복 관리와 DANAUN REGEN, 센터별 대표 프로그램을 소개합니다.';

export const metadata = pageMeta(path, title + ' | 다나은재활의학과의원', description);

const careStandards = [
  {
    name: '원인 평가',
    question: '왜 이 동작에서 아플까요?',
    detail: '통증이 시작된 상황과 불편한 동작을 듣고, 진찰과 필요한 초음파·움직임 평가를 통해 관련 조직과 기능을 살핍니다.',
    takeaway: '인대·힘줄, 근육 기능, 근막·신경 주변 조직, 움직임, 치료 설계',
    link: ['다나은의 평가 5항목 보기', '/#home-assessment'],
    icon: 'M16 10.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Zm-1 4.5 4.5 4.5',
  },
  {
    name: '성분 설명',
    question: '무엇을 왜 사용하나요?',
    detail: '주사를 검토할 때는 성분과 사용 목적, 대안과 주의점을 먼저 설명합니다. 환자에게 설명되지 않은 스테로이드 사용 여부를 사전에 설명합니다.',
    takeaway: '무엇을 맞는지, 알고 맞으셔야 합니다.',
    link: ['주사 성분 설명 원칙 보기', '/regen/principles'],
    icon: 'M6 3.5h8l4 4v13H6v-17Zm8 0v4h4M9 12h6m-6 4h6',
  },
  {
    name: '맞춤 치료',
    question: '같은 무릎 통증인데 왜 계획이 다른가요?',
    detail: '진찰 결과와 현재 기능, 이전 치료 반응, 다시 하고 싶은 활동을 바탕으로 운동과 생활 관리, 필요한 치료의 순서를 함께 정합니다.',
    icon: 'M5 6h5m3 0h6M5 12h9m3 0h2M5 18h3m3 0h8M10 4v4m7 2v4m-6 2v4',
  },
  {
    name: '회복 관리',
    question: '치료 후에는 무엇을 다시 확인하나요?',
    detail: '통증의 변화와 함께 걷기나 계단 오르기처럼 처음 어려웠던 동작을 다시 살핍니다. 경과를 바탕으로 재활 강도와 다음 계획을 조정합니다.',
    icon: 'M4 5v14h16M7 15l4-4 3 2 5-6m-4 0h4v4',
  },
];

const principleStages = [
  {title: careStandards[0].name, detail: '통증의 원인과 기능 평가', position: 'top'},
  {title: careStandards[1].name, detail: '성분과 목적 설명', position: 'right'},
  {title: careStandards[2].name, detail: '상태에 맞는 방법 선택', position: 'bottom'},
  {title: careStandards[3].name, detail: '치료 후 경과와 재활', position: 'left'},
];

const programs = [
  {
    name: '리셋 리커버리', duration: '8주', center: '스포츠손상 센터',
    detail: '손상 평가부터 1:1 운동치료와 복귀 테스트까지 이어집니다. 재생주사는 필요한 경우 검토합니다.',
    href: '/centers/sports#sports-recovery-program-title', image: 'center-care-1.webp',
  },
  {
    name: '리셋 조인트', duration: '12주', center: '퇴행성 관절염 센터',
    detail: '무릎 관절염 평가와 근력 운동치료, 12주 재평가를 연결합니다. PRP는 대상 기준을 충족할 때 검토합니다.',
    href: '/centers/osteoarthritis#oa-joint-program', image: 'center-care-2.webp',
  },
  {
    name: '리셋 케어', center: '유방암 재활 센터',
    detail: '수술 후 어깨 움직임과 부종, 근력·체력 회복을 함께 살핍니다. 치료 중에는 종양 주치의와 협진하며 급여·산정특례 적용 범위를 확인합니다.',
    href: '/centers/breast-cancer-rehab#br-reset-care', image: 'center-care-4.webp',
  },
  {
    name: '리셋 에이징', center: '항노화·피부·두피 센터',
    detail: '피부결·탄력과 두피·모발 고민을 살피고, 진찰 결과에 맞춰 필요한 관리 방법을 검토합니다.',
    href: '/centers/healthy-aging#ha-aging-program', image: 'center-care-6.webp',
  },
];

export default function PrinciplesPage() {
  return (
    <AboutDetail path={path} title={title} label="RESET PRINCIPLES" summary={summary}
      image="/images/hero-regen-depth.webp">
      <div className="principles-detail">
        <ResetBrandMeaning/>

        <section className="ro-band pd-standards" id="care-principles" aria-labelledby="pd-standards-title">
          <div className="ro-wrap">
            <div className="ro-heading">
              <h2 id="pd-standards-title" data-ro-title>리셋 <em>4원칙</em></h2>
            </div>
            <div className="pd-standards-layout">
              <ol className="pd-standard-grid" role="list">
                {careStandards.map(({name, question, detail, takeaway, link, icon}, index) => (
                  <li key={name} data-ro-reveal data-ro-reveal-delay={index * 90}>
                    <div className="pd-standard-mark" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d={icon}/>
                      </svg>
                      <span>0{index + 1}</span>
                    </div>
                    <h3>{name}</h3>
                    <p className="pd-question">{question}</p>
                    <p>{detail}</p>
                    {takeaway && <p className="pd-takeaway">{takeaway}</p>}
                    {link && <a className="ro-link" href={link[1]}>{link[0]} <span aria-hidden="true">↗</span></a>}
                  </li>
                ))}
              </ol>
              <RecoveryBeam
                stages={principleStages}
                caption="환자를 중심으로 이어지는 다나은 4원칙"
                label="환자를 중심으로 원인 평가, 성분 설명, 맞춤 치료, 회복 관리가 이어집니다."
              />
            </div>
          </div>
        </section>

        <ResetPrinciples pointsOnly/>

        <section className="ro-band about-dark pd-regen" id="reset-regen" aria-labelledby="pd-regen-title">
          <div className="ro-wrap ro-split">
            <div data-ro-reveal>
              <p className="ro-label">다나은의 특화 진료 · DANAUN REGEN</p>
              <h2 id="pd-regen-title">통증 치료를 넘어,<br/><em>조직의 회복을 설계합니다.</em></h2>
              <p>DANAUN REGEN은 다나은재활의학과의원의 맞춤형 조직 회복 프로그램입니다. 진찰과 필요한 초음파 평가를 바탕으로 통증에 관여하는 조직을 살피고, 환자에게 적합한 치료와 재활을 함께 설계합니다.</p>
              <ol className="pd-regen-flow" role="list">
                <li>평가</li><li>설명과 선택</li><li>재활과 경과 확인</li>
              </ol>
              <a className="ro-link" href="/regen">재생치료 소개 보기 <span aria-hidden="true">↗</span></a>
            </div>
            <img data-ro-reveal src="/images/regen-ultrasound-focus-1120.webp"
              srcSet="/images/regen-ultrasound-focus-640.webp 640w, /images/regen-ultrasound-focus-1120.webp 1120w"
              sizes="(max-width:640px) calc(100vw - 44px), (max-width:1272px) 44vw, 530px"
              width="1120" height="747" loading="lazy" decoding="async"
              alt="무릎에 초음파 탐촉자를 대고 조직 상태를 살피는 모습"/>
          </div>
        </section>

        <section className="ro-band pd-programs" id="center-programs" aria-labelledby="pd-programs-title">
          <div className="ro-wrap">
            <div className="ro-heading">
              <p className="ro-label">센터별 대표 프로그램</p>
              <h2 id="pd-programs-title" data-ro-title>상태와 목표에 따라,<br/><em>회복의 계획도 달라집니다.</em></h2>
            </div>
            <ul className="pd-program-grid" role="list">
              {programs.map(({name, duration, center, detail, href, image}, index) => (
                <li key={name} data-ro-reveal data-ro-reveal-delay={index * 90}>
                  <a className="pd-program-card" href={href}>
                    <img src={'/images/' + image} alt="" width="600" height="400" loading="lazy" decoding="async"/>
                    <div className="pd-program-copy">
                      <p className="pd-center-name">{center}</p>
                      <h3>{name}{duration && <small>{' '}{duration}</small>}</h3>
                      <p>{detail}</p>
                      <span className="pd-program-action">프로그램 자세히 보기 <span aria-hidden="true">↗</span></span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </AboutDetail>
  );
}
