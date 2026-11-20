'use client';

import {useState} from 'react';

const address = '경기 용인시 수지구 손곡로 95 송란아트프라자 2층';
const directions = 'https://map.kakao.com/link/to/1181072255';

export default function HomeVisit() {
  const [copyStatus, setCopyStatus] = useState('');
  async function copyAddress() {
    try { await navigator.clipboard.writeText(address); setCopyStatus('주소를 복사했습니다.'); }
    catch { setCopyStatus('아래 주소를 길게 누르거나 선택해 복사해 주세요.'); }
  }
  return <section className="home-visit" id="visit" aria-labelledby="home-visit-title">
    <div className="section">
      <div className="home-visit-heading"><p>VISIT RESET</p><h2 id="home-visit-title">진료시간과 <em>오시는 길.</em></h2></div>
      <div className="home-visit-grid">
        <div className="home-visit-info">
          <h3>진료시간</h3>
          <dl>
            <div><dt>월 · 화 · 목 · 금</dt><dd>09:00 — 18:30</dd></div>
            <div><dt>토요일</dt><dd>08:00 — 13:00</dd></div>
            <div><dt>점심시간</dt><dd>13:00 — 14:00</dd></div>
            <div className="home-visit-closed"><dt>휴진</dt><dd>수요일 · 일요일 · 공휴일</dd></div>
          </dl>
          <p className="home-visit-note">토요일은 점심시간 없이 진료합니다.<br/>당일 접수와 주차 이용은 전화로 문의해 주세요.</p>
          <a className="home-visit-phone" href="tel:0312632520">031.263.2520 <span>↗</span></a>
          <div className="home-visit-links"><a href="tel:0312632520">전화 문의 ↗</a><a href="https://booking.naver.com/booking/13/bizes/271483?area=plt" target="_blank" rel="noreferrer">네이버 예약 ↗</a></div>
          <a className="home-visit-detail" href="/visit">오시는 길 자세히 보기 ↗</a>
        </div>
        <div className="home-visit-location">
          <div className="home-visit-map">
            <iframe id="home-visit-kakao-map" title="리셋재활의학과의원 카카오맵" src="/maps/clinic-location.html" loading="lazy"/>
          </div>
          <div className="home-visit-address">
            <h3>리셋재활의학과의원</h3>
            <address>{address}</address>
            <div className="home-visit-links">
              <button type="button" onClick={copyAddress}>주소 복사</button>
              <a href={directions} target="_blank" rel="noreferrer">카카오맵 길찾기 ↗</a>
              <a href="/visit#location">오시는 안내 자세히 보기 <span aria-hidden="true">↗</span></a>
            </div>
            <p className="home-visit-copy-status" role="status">{copyStatus}</p>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
