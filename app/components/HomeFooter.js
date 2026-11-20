import PolicyLinks from './PolicyLinks';

export default function HomeFooter() {
  return <footer className="home-footer" aria-label="병원 정보">
    <div className="home-footer-inner">
      <div className="home-footer-top">
        <a href="/" aria-label="리셋재활의학과의원 홈" className="home-footer-brand"><img src="/images/reset-clinic-logo.png" alt="리셋재활의학과의원" width="260" height="70" loading="lazy"/></a>
        <PolicyLinks/>
      </div>
      <div className="home-footer-info">
        <div><p className="home-footer-name">리셋재활의학과의원</p><dl><div><dt>대표원장</dt><dd>이고은</dd></div><div><dt>사업자등록번호</dt><dd>184-96-00669</dd></div></dl><address>경기 용인시 수지구 손곡로 95 송란아트프라자 2층</address><a className="home-footer-phone" href="tel:0312632520">전화 031.263.2520 ↗</a></div>
        <p className="home-footer-message">RESET YOUR MOVEMENT.<br/>RECONNECT YOUR LIFE.</p>
      </div>
      <div className="home-footer-bottom"><p>의료 콘텐츠 · 의료진 검토 완료<br/>© RESET REHAB CLINIC. ALL RIGHTS RESERVED.</p><a href="#" aria-label="페이지 맨 위로">맨 위로 <span aria-hidden="true">↑</span></a></div>
    </div>
  </footer>;
}
