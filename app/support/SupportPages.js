import {clinicHours} from '../data/clinic-hours';
import {booking} from '../components/DetailShell';
import HomeConsultation from '../components/HomeConsultation';
import {aftercare, aftercareSteps, faqGroups, firstVisitSteps, notices} from '../data/support-content';
import {supportHome} from '../data/support';

const phone = '/visit';

function TextLinks({items}) {
  return <div className="support-links">
    {items.map(([label, href]) => {
      const external = href.startsWith('https://');
      return <a className="ro-link" key={href} href={href}
        target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
        {label}<span aria-hidden="true">↗</span>
      </a>;
    })}
  </div>;
}

export function Notices() {
  const posts = [...notices].sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.date.localeCompare(a.date));
  return <section className="ro-band support-paper" aria-labelledby="notice-board-title">
    <div className="ro-wrap support-narrow">
      <div className="ro-heading"><h2 id="notice-board-title">병원 <em>공지 목록</em></h2></div>
      <div className="support-board">
        <div className="support-board-head" aria-hidden="true"><span>번호</span><span>제목</span><span>게시일</span></div>
        {posts.length ? <ul aria-label="공지사항 목록">
          {posts.map((post, index) => <li key={post.id}><a href={supportHome + '/' + post.id}>
            <span className={post.pinned ? 'support-pinned' : 'support-number'}>{post.pinned ? '공지' : posts.length - index}</span>
            <strong>{post.sample && <span className="support-sample-badge">예시</span>}{post.title}</strong><time dateTime={post.date}>{post.date.replaceAll('-', '.')}</time>
          </a></li>)}
        </ul> : <p className="support-empty">등록된 공지사항이 없습니다.</p>}
      </div>
    </div>
  </section>;
}

export function NoticeArticle({notice}) {
  const others = notices.filter(post => post.id !== notice.id)
    .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) || b.date.localeCompare(a.date));
  return <div className="notice-detail">
    <article className="notice-sheet" aria-labelledby="notice-title">
      <nav className="notice-breadcrumb" aria-label="현재 위치">
        <a href={supportHome}>공지사항</a>
      </nav>
      <div className="notice-heading">
        <h1 id="notice-title">{notice.title}</h1>
        <div className="notice-meta"><span>다나은재활의학과의원</span><time dateTime={notice.date}>게시일 {notice.date.replaceAll('-', '.')}</time></div>
      </div>
      <div className="notice-body">
        {notice.sample && <p className="support-sample-note">게시판 화면 확인용 예시 글입니다.</p>}
        {notice.paragraphs.map(text => <p key={text}>{text}</p>)}
        {notice.id === 'clinic-hours' && <>
          <section className="notice-hours" aria-labelledby="notice-hours-title">
            <h2 id="notice-hours-title">진료시간과 정기 휴진일</h2>
            <dl>{clinicHours.map(([day, time]) => <div key={day}><dt>{day}</dt><dd>{time}</dd></div>)}</dl>
            <p>토요일은 점심시간 없이 진료합니다.</p>
          </section>
          <aside className="notice-reminder">
            <h2>방문 전에 확인해 주세요</h2>
            <p>당일 접수 가능 여부와 임시 진료 일정은 방문 전에 전화로 확인해 주세요. 예약을 변경하실 때에도 병원으로 연락해 주시면 안내해 드립니다.</p>
            <a href={phone} aria-label="병원에 전화하기 연락처 준비 중">연락처 준비 중 <span aria-hidden="true">↗</span></a>
          </aside>
        </>}
        <TextLinks items={notice.links || []}/>
      </div>
      <div className="notice-signoff">다나은재활의학과의원</div>
    </article>
    <section className="notice-more" aria-labelledby="notice-more-title">
      <div className="notice-more-heading"><h2 id="notice-more-title">다른 공지사항</h2><a href={supportHome}>전체 목록 보기 ↗</a></div>
      <ul>{others.map(post => <li key={post.id}>
        <a href={supportHome + '/' + post.id}>
          <span className="notice-more-label">{post.sample ? '예시' : post.pinned ? '공지' : '안내'}</span>
          <span className="notice-more-name">{post.title}</span>
          <time dateTime={post.date}>{post.date.replaceAll('-', '.')}</time>
          <span className="notice-more-arrow" aria-hidden="true">↗</span>
        </a>
      </li>)}</ul>
      <a className="notice-back" href={supportHome}>← 공지사항 목록으로</a>
    </section>
  </div>;
}

export function Booking() {
  return <>
    <HomeConsultation/>
    <section className="ro-band support-reservation" id="naver-booking" aria-labelledby="support-reservation-title">
      <div className="ro-wrap support-reservation-layout">
        <div data-ro-reveal="left">
          <h2 id="support-reservation-title">네이버 <em>예약</em></h2>
          <p>다나은재활의학과의원 진료 예약 페이지에서 가능한 일정을 확인하고 예약할 수 있습니다.</p>
          <ol className="support-reservation-steps">
            <li>가능한 일정 확인</li>
            <li>날짜와 시간 선택</li>
            <li>예약 내역 확인</li>
          </ol>
        </div>
        <div className="support-reservation-actions" data-ro-reveal="right">
          <a className="support-reservation-button" href={booking} target="_blank" rel="noreferrer">
            네이버에서 진료 예약하기 <span aria-hidden="true">↗</span>
          </a>
          <p>당일 접수 또는 예약 변경은 병원으로 전화해 주세요.</p>
          <TextLinks items={[['전화 상담 연락처 준비 중', phone], ['처음 오시는 분', '/support/first-visit']]}/>
        </div>
      </div>
    </section>
  </>;
}

export function FirstVisit() {
  return <>
    <section className="ro-band ro-intro" aria-labelledby="first-visit-title">
      <div className="ro-wrap">
        <div className="ro-heading" data-ro-reveal><h2 id="first-visit-title">처음 오시는 날, <em>이렇게 준비해 주세요.</em></h2></div>
        <ol className="about-three-grid support-step-cards">
          {firstVisitSteps.map(([title, text], index) => <li className="about-card" key={title} data-ro-reveal data-ro-reveal-delay={index * 100}>
            <span className="support-step-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3><p>{text}</p>
          </li>)}
        </ol>
      </div>
    </section>
    <section className="ro-band" aria-labelledby="first-visit-location">
      <div className="ro-wrap ro-split support-first-visit">
        <img src="/images/danaun-space.png" alt="다나은재활의학과의원 접수 공간" width="780" height="520" loading="lazy" decoding="async" data-ro-reveal="left"/>
        <div data-ro-reveal="right">
          <h2 id="first-visit-location">내원 전 <em>확인하기</em></h2>
          <p>주소 준비 중</p>
          <TextLinks items={[['진료시간과 오시는 길', '/visit#location'], ['주차장 입구', '/visit#parking'], ['상담신청 및 예약', '/support/booking']]}/>
        </div>
      </div>
    </section>
  </>;
}

export function FAQ() {
  return <section className="ro-band support-paper" aria-labelledby="support-faq-title">
    <div className="ro-wrap support-narrow">
      <div className="ro-heading"><h2 id="support-faq-title">방문 전에 <em>많이 묻는 질문</em></h2></div>
      {faqGroups.map((group, index) => <section className="support-faq-group" key={group.title} aria-labelledby={'support-question-group-' + index}>
        <h3 id={'support-question-group-' + index}>{group.title}</h3>
        <dl className="about-questions">
          {group.items.map(({question, answer, links}) => <div key={question}>
            <dt>{question}</dt><dd><p>{answer}</p>{links && <TextLinks items={links}/>}</dd>
          </div>)}
        </dl>
      </section>)}
    </div>
  </section>;
}

export function Aftercare() {
  return <>
    <section className="ro-band support-paper" aria-labelledby="aftercare-start">
      <div className="ro-wrap support-narrow">
        <div className="ro-heading"><h2 id="aftercare-start">받으신 치료를 <em>선택해 주세요.</em></h2>
          <p>진료실에서 받은 개별 안내를 먼저 확인해 주세요.</p>
        </div>
        <div className="support-alert">
          <h3>지금 바로 도움이 필요한 경우</h3>
          <p>숨쉬기 어렵거나 의식이 흐려지면 <a href="tel:119">119에 전화</a>해 주세요. 치료 부위 통증이나 붓기가 뚜렷하게 심해지거나 열이 나면 시술한 의료기관에 바로 연락해 진료를 받으세요.</p>
          <a href={phone}>병원 연락 연락처 준비 중</a>
        </div>
        <nav className="support-treatment-links" aria-label="치료별 주의사항 바로가기">
          {aftercare.map(({id, title}) => <a key={id} href={'#' + id}>{title}<span aria-hidden="true">↓</span></a>)}
        </nav>
      </div>
    </section>
    {aftercare.map(({id, title, intro, items, links}) => <section className="ro-band support-aftercare-section" key={id} id={id} aria-labelledby={id + '-title'}>
      <div className="ro-wrap support-narrow">
        <div className="ro-heading"><h2 id={id + '-title'}>{title}</h2><p>{intro}</p></div>
        <dl className="support-aftercare-steps">
          {items.map((text, index) => <div key={aftercareSteps[index]}>
            <dt>{aftercareSteps[index]}</dt><dd>{text}</dd>
          </div>)}
        </dl>
        <TextLinks items={links}/>
      </div>
    </section>)}
  </>;
}
