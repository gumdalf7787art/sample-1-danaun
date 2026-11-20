import {clinicHours as hours} from '../data/clinic-hours';
import AboutDetail from '../components/AboutDetail';
import {pageMeta} from '../data/seo';

const path = '/visit';
const title = '진료시간 · 오시는 길';
const description = '용인 수지구 손곡로 95 송란아트프라자 2층. 진료시간과 정기 휴진, 대중교통, 주차 안내를 확인하세요.';
const phone = 'tel:0312632520';
const directions = 'https://map.kakao.com/link/to/1181072255';
const source = 'https://www.resetclinic.co.kr/page/page2';



const parking = [
  ['동천역 2번 출구에서 조달청 품질관리단 앞 삼거리까지 직진합니다.',
    '동천역 2번 출구 오른쪽 도로에 직진 경로가 파란색으로 표시된 모습'],
  ['삼거리에서 신봉동·성복동 방면으로 우회전합니다.',
    '조달청 품질관리단 앞 삼거리에서 오른쪽으로 진행할 방향이 표시된 모습'],
  ['손곡로 95 송란아트프라자 방면으로 좌회전한 뒤 건물을 끼고 우회전합니다.',
    '송란아트프라자로 들어가는 교차로와 건물 모퉁이가 표시된 모습'],
  ['우회전한 방향에 건물 주차장 입구가 있습니다.',
    '송란아트프라자 측면의 주차장 입구가 빨간색으로 표시된 모습'],
];

export const metadata = pageMeta(path, title + ' · 예약 안내 | 리셋재활의학과의원', description);

export default function Visit() {
  return (
    <AboutDetail path={path} title={title} label="VISIT RESET" summary={description}
      image="/images/clinic-tour-entrance.webp" imagePosition="center 45%">
      <section className="ro-band ro-intro" id="hours">
        <div className="ro-wrap ro-split">
          <div data-ro-reveal>
            <h2>진료시간과 <em>휴진일</em></h2>
            <p>토요일은 점심시간 없이 진료합니다. 당일 접수나 임시 일정은 방문 전 확인해 주세요.</p>
            <a className="about-hours-phone" href={phone}>
              <span>진료시간 문의</span>
              <strong>031-263-2520</strong>
            </a>
          </div>
          <dl className="about-hours" data-ro-reveal>
            {hours.map(([day, time]) => <div key={day}><dt>{day}</dt><dd>{time}</dd></div>)}
          </dl>
        </div>
      </section>
      <section className="ro-band" id="location">
        <div className="ro-wrap">
          <div className="ro-heading" data-ro-reveal><h2>수지 동천으로 <em>오시는 길</em></h2></div>
          <div className="about-location-grid">
            <iframe className="about-map" title="리셋재활의학과의원 카카오맵" src="/maps/clinic-location.html" loading="lazy"/>
            <div className="about-address" data-ro-reveal>
              <h3>리셋재활의학과의원</h3>
              <address>경기 용인시 수지구 손곡로 95<br/>송란아트프라자 2층 (203·204·206·207호)</address>
              <p>지번 주소 · 경기 용인시 수지구 동천동 948</p>
              <a className="ro-link" href={directions} target="_blank" rel="noreferrer">카카오맵 길찾기 <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="about-three-grid about-route-cards">
            <article className="about-card" data-ro-reveal>
              <h3>지하철</h3><p>신분당선 동천역 2번 출구에서 손곡초등학교 부근 송란아트프라자 방향으로 오세요.</p>
            </article>
            <article className="about-card" data-ro-reveal>
              <h3>버스</h3><p>송란아트프라자 정류장(56077)에서 내리세요. 기존 병원 안내 노선은 14-1번과 17번이며, 운행 정보는 방문 전에 확인해 주세요.</p>
              <a className="ro-link" href="https://www.gbis.go.kr/gbis2014/schBus.action?mapTabCd=2" target="_blank" rel="noreferrer">경기버스정보 <span aria-hidden="true">↗</span></a>
            </article>
            <article className="about-card" data-ro-reveal>
              <h3>자동차</h3><p>내비게이션에서 ‘리셋재활의학과의원’ 또는 ‘손곡로 95’를 검색하세요.</p>
              <a className="ro-link" href="#parking">주차장 진입 안내 <span aria-hidden="true">↓</span></a>
            </article>
          </div>
        </div>
      </section>
      <section className="ro-band about-dark" id="parking" aria-labelledby="parking-title">
        <div className="ro-wrap">
          <div className="ro-heading" data-ro-reveal>
            <h2 id="parking-title">송란아트프라자 <em>주차장 입구</em></h2>
            <p>동천역 방면에서 오실 때의 진입 안내입니다. 주차 이용 조건은 병원에 전화로 확인해 주세요.</p>
            <a className="ro-link" href={phone}>주차 문의 <span aria-hidden="true">↗</span></a>
          </div>
          <ol className="about-parking" role="list">
            {parking.map(([step, alt], index) => (
              <li key={step}>
                <img src={'/images/clinic-parking-step-' + (index + 1) + '.webp'}
                  alt={alt} width="868" height="386"
                  loading="lazy" decoding="async"/>
                <p><span aria-hidden="true">0{index + 1}</span>{step}</p>
              </li>
            ))}
          </ol>
          <div className="about-source">
            <a href={source} target="_blank" rel="noreferrer">사진 출처 · 기존 병원 홈페이지 주차 안내 ↗</a>
          </div>
        </div>
      </section>
      <nav className="ro-wrap about-related-navigation" aria-label="공지 및 상담 바로가기">
        <a className="ro-link" id="booking" href="/support/booking">상담신청 및 예약 <span aria-hidden="true">↗</span></a>
        <a className="ro-link" id="first-visit" href="/support/first-visit">처음 오시는 분 <span aria-hidden="true">↗</span></a>
        <a className="ro-link" id="visit-faq-title" href="/support/faq">자주 묻는 질문 <span aria-hidden="true">↗</span></a>
      </nav>
    </AboutDetail>
  );
}
