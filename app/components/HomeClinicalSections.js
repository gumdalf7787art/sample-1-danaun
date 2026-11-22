import {doctorClinicalCareer, doctorTraining} from '../data/doctor-profile';

const assessmentItems = [
  ['인대·힘줄', '증상과 관련된 조직의 상태를 필요한 평가로 살펴봅니다.'],
  ['근육 기능', '힘과 조절 능력이 일상 동작에 어떤 영향을 주는지 확인합니다.'],
  ['근막·신경 주변 조직', '통증과 움직임에 관련될 수 있는 주변 조직을 함께 살펴봅니다.'],
  ['움직임', '걷기·계단·팔 들기 등 불편한 동작을 확인합니다.'],
  ['치료 설계', '평가 결과에 따라 필요한 치료와 재활, 생활 관리의 순서를 정합니다.'],
];

const recoveryNotes = [
  ['회복에는 시간이 걸립니다.', '진통 효과가 빠른 주사도 있지만, 재생 치료는 몸의 회복 과정을 기다리는 치료입니다. 간격을 두고 여러 번 나누어 진행할 수 있고, 첫 시술 후 바로 달라지지 않을 수 있습니다. 기다려야 하는 치료라는 것을 시작하기 전에 먼저 말씀드립니다.'],
  ['통증이 줄었다고, 다 나은 것은 아닙니다.', '통증의 변화와 손상 조직·기능의 변화는 다를 수 있습니다. 그래서 불편했던 동작과 생활 기능을 함께 다시 확인합니다.'],
  ['염증은 회복 과정의 일부이기도 합니다.', '염증의 원인과 정도, 회복 단계를 구분해 필요한 치료를 검토합니다. 모든 염증을 그대로 두거나 같은 방식으로 억제해야 하는 것은 아닙니다.'],
];

export function HomeAssessment() {
  return (
    <section id="home-assessment" className="section home-assessment" aria-labelledby="home-assessment-title">
      <div className="section-top">
        <h2 id="home-assessment-title">리셋은 <em>무엇을 살피나요?</em></h2>
      </div>
      <div className="home-assessment-grid">
        <img
          className="home-assessment-photo"
          src="/images/regen-ultrasound-focus-1120.webp"
          srcSet="/images/regen-ultrasound-focus-640.webp 640w, /images/regen-ultrasound-focus-1120.webp 1120w"
          sizes="(max-width: 640px) 100vw, (max-width: 1240px) 46vw, 540px"
          width="1120" height="747" loading="lazy" decoding="async"
          alt="무릎에 초음파 탐촉자를 대고 상태를 확인하는 진료 예시"
        />
        <div>
          <ul className="home-assessment-list" role="list">
            {assessmentItems.map(([title, description]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ul>
          <a className="underline-link" href="/regen#precision">정밀 평가 자세히 보기 <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}

export function HomeRecoveryNotes() {
  return (
    <div className="journey-expectations">
      {recoveryNotes.map(([title, description]) => (
        <article key={title}>
          <h3>{title}</h3>
          <p>{description}</p>
        </article>
      ))}
    </div>
  );
}

export function HomeDoctorProfile() {
  return (
    <section id="home-doctor" className="home-doctor" aria-labelledby="home-doctor-title">
      <div className="section home-doctor-grid">
        <div className="home-doctor-portrait">
          <img
            src="/images/danaun-doctor.png"
            alt="샘플 의료진"
            width="780" height="1280" loading="lazy" decoding="async"
          />
        </div>
        <div className="home-doctor-copy">
          <h2 id="home-doctor-title">샘플 의료진</h2>
          <p className="home-doctor-specialty">재활의학과 전문의</p>
          <h3>진료 방향</h3>
          <p>통증이 시작된 상황과 일상에서 불편한 동작을 함께 살핍니다. 진찰과 평가를 바탕으로 치료 선택지를 설명하고, 치료 후 통증과 움직임의 변화를 다시 확인합니다.</p>
          <h3>주요 임상 경력</h3>
          <ul>
            {[doctorTraining, ...doctorClinicalCareer].map(item => <li key={item}>{item}</li>)}
          </ul>
          <a className="underline-link" href="/about/doctor#profile">원장 소개 자세히 보기 <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}
