import PolicyLinks from './PolicyLinks';

export default function HomeFooter() {
  return <footer className="home-footer" aria-label="병원 정보">
    <div className="home-footer-inner">
      <div className="home-footer-top">
        <a href="/" aria-label="다나은재활의학과의원 홈" className="home-footer-brand"><img src="/images/danaun-wordmark.svg" alt="다나은재활의학과의원" width="260" height="70" loading="lazy"/></a>
        <PolicyLinks/>
      </div>
      <div className="home-footer-info">
        <div><p className="home-footer-name">다나은재활의학과의원</p><dl><div><dt>안내</dt><dd>홈페이지 샘플</dd></div></dl><address>주소 준비 중</address><a className="home-footer-phone" href="/visit">전화 연락처 준비 중 ↗</a></div>
        <p className="home-footer-message">MOVE WITH CONFIDENCE.<br/>RETURN TO DAILY LIFE.</p>
      </div>
      <div className="home-footer-bottom"><p>다나은재활의학과의원 홈페이지 샘플<br/>© DANAUN REHAB CLINIC. ALL RIGHTS RESERVED.</p><a href="#" aria-label="페이지 맨 위로">맨 위로 <span aria-hidden="true">↑</span></a></div>
    </div>
  </footer>;
}
