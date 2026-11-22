'use client';

function ConsultationForm() {
  return (
    <form className="home-consultation-form" onSubmit={event => event.preventDefault()}>
      <h2 id="home-consultation-title">상담신청</h2>
      <div className="home-consultation-field">
        <label htmlFor="consultation-phone">연락처</label>
        <input id="consultation-phone" type="tel" placeholder="010-0000-0000" maxLength={24} required />
      </div>
      <div className="home-consultation-field">
        <label htmlFor="consultation-message">상담내용</label>
        <textarea id="consultation-message" rows={3} maxLength={1000} placeholder="상담하고 싶은 내용을 입력해 주세요." required />
      </div>
      <div className="home-consultation-consent">
        <label><input type="checkbox" required /> 개인정보 수집 및 이용에 동의합니다.</label>
        <a href="/privacy">개인정보처리방침 ↗</a>
      </div>
      <div className="home-consultation-actions">
        <button type="submit" disabled>상담신청</button>
        <p>온라인 접수 준비 중</p>
      </div>
    </form>
  );
}

export default function HomeConsultation() {
  return (
    <section className="home-consultation" id="consultation" aria-labelledby="home-consultation-title">
      <div className="home-consultation-photo" aria-hidden="true">
        <img src="/images/consultation-soft.webp" alt="" loading="lazy" decoding="async" fetchPriority="low"/>
      </div>
      <div className="home-consultation-inner">
        <ConsultationForm/>
        <div className="consultation-visit-links"><p>평가부터, 편안하게 시작하세요.</p><div><a href="/support/booking" target="_blank" rel="noreferrer">예약 안내 ↗</a><a href="/visit">전화 상담 ↗</a></div><div className="consultation-review-links"><a href="/visit#location" target="_blank" rel="noreferrer">네이버 플레이스·리뷰 확인 ↗</a><a href="/visit#location" target="_blank" rel="noreferrer">구글 지도·리뷰 확인 ↗</a></div><small>리뷰는 각 지도 서비스의 병원 페이지에서 확인하실 수 있습니다.</small></div>
      </div>
    </section>
  );
}
