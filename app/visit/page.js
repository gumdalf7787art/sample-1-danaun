import {clinicHours as hours} from '../data/clinic-hours';
import AboutDetail from '../components/AboutDetail';
import {pageMeta} from '../data/seo';

const path = '/visit';
const title = '진료시간 · 오시는 길';
const description = '주소 준비 중. 진료시간과 정기 휴진, 대중교통, 주차 안내를 확인하세요.';
const phone = '/visit';
const directions = '/visit#location';
export const metadata = pageMeta(path, title + ' · 예약 안내 | 다나은재활의학과의원', description);

export default function Visit() {
  return (
    <AboutDetail path={path} title={title} label="VISIT DANAUN" summary={description}
      image="/images/danaun-space.png" imagePosition="center 45%">
      <section className="ro-band ro-intro" id="hours">
        <div className="ro-wrap ro-split">
          <div data-ro-reveal>
            <h2>진료시간과 <em>휴진일</em></h2>
            <p>아래 진료시간은 화면 구성 예시입니다.</p>
            <a className="about-hours-phone" href={phone}>
              <span>진료시간 문의</span>
              <strong>연락처 준비 중</strong>
            </a>
          </div>
          <dl className="about-hours" data-ro-reveal>
            {hours.map(([day, time]) => <div key={day}><dt>{day}</dt><dd>{time}</dd></div>)}
          </dl>
        </div>
      </section>
      <section className="ro-band" id="location">
        <div className="ro-wrap">
          <div className="ro-heading" data-ro-reveal><h2><em>오시는 길</em></h2></div>
          <div className="about-location-grid">
            <iframe className="about-map" title="다나은재활의학과의원 카카오맵" src="/maps/clinic-location.html" loading="lazy"/>
            <div className="about-address" data-ro-reveal>
              <h3>다나은재활의학과의원</h3>
              <address>주소 준비 중</address>
              <a className="ro-link" href={directions}>위치 안내 <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="about-three-grid about-route-cards">
            <article className="about-card" data-ro-reveal>
              <h3>지하철</h3><p>실제 위치 확정 후 안내합니다.</p>
            </article>
            <article className="about-card" data-ro-reveal>
              <h3>버스</h3><p>실제 위치 확정 후 안내합니다.</p>
              </article>
            <article className="about-card" data-ro-reveal>
              <h3>자동차</h3><p>실제 위치 확정 후 안내합니다.</p>
              <a className="ro-link" href="#parking">주차장 진입 안내 <span aria-hidden="true">↓</span></a>
            </article>
          </div>
        </div>
      </section>
      <section className="ro-band about-dark" id="parking" aria-labelledby="parking-title">
        <div className="ro-wrap">
          <div className="ro-heading" data-ro-reveal>
            <h2 id="parking-title"><em>주차 안내</em></h2>
            <p>개원 전 홈페이지 샘플입니다.</p>
          </div>
          <p>주차 위치와 이용 조건은 추후 안내합니다.</p>
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
