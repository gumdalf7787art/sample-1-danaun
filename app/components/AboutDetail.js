import SiteHeader from './SiteHeader';
import HomeFooter from './HomeFooter';
import AboutTabs from './AboutTabs';
import RegenOverviewMotion from './RegenOverviewMotion';
import {booking} from './DetailShell';
import {PageData} from './StructuredData';
import '../regen-overview.css';
import '../about-detail.css';

export default function AboutDetail({path, title, label, summary, image, imagePosition, categoryClass = '', parent = {name:'리셋 소개', path:'/about/doctor'}, navigation, showHero = true, children}) {
  return (
    <div className={['regen-overview about-detail', categoryClass].filter(Boolean).join(' ')}>
      <PageData path={path} name={title} breadcrumbParent={parent}/>
      <a className="skip" href="#main">본문 바로가기</a>
      <SiteHeader/>
      <main id="main">
        <RegenOverviewMotion visibleOnly/>
        {showHero && <section className="ro-hero" aria-labelledby="about-title">
          <picture className="ro-hero-image">
            <img src={image} alt="" fetchPriority="high" style={{objectPosition:imagePosition}}/>
          </picture>
          <div className="ro-hero-content">
            <p className="ro-label" lang="en">{label}</p>
            <p className="ro-hero-sub">리셋재활의학과의원 · {parent.name}</p>
            <h1 id="about-title"><em>{title}</em></h1>
            <p>{summary}</p>
          </div>
        </section>}
        {navigation || <AboutTabs active={path}/>}
        {children}
      </main>
      <HomeFooter/>
      <div className="mobile-actions">
        <a href="tel:0312632520">전화 상담</a>
        <a href={booking} target="_blank" rel="noreferrer">네이버 예약 ↗</a>
        <a href="/visit#location">오시는 길</a>
      </div>
    </div>
  );
}
