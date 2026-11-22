import SiteHeader from '../components/SiteHeader';
import HomeFooter from '../components/HomeFooter';
import RegenOverviewMotion from '../components/RegenOverviewMotion';
import {PageData} from '../components/StructuredData';
import {insightSections} from '../data/insight-sections.mjs';
import '../regen-overview.css';
import './insight-library.css';

export default function InsightShell({section, article, heroLinks = [], showHero = true, children}) {
  const title = article?.title || section?.name || '다나은 인사이트';
  const sectionPath = section ? '/insights/' + section.id : '/insights';
  const path = article?.path || sectionPath;
  const label = section?.en || 'RESET INSIGHTS';
  const summary = article?.summary || section?.description || '건강 정보와 운동, 방송 자료부터 치료의 근거까지 한곳에서 살펴보세요.';
  const parent = article ? {name: section.name, path: sectionPath} : section ? {name:'다나은 인사이트', path:'/insights'} : undefined;
  return (
    <div className="regen-overview ins-library">
      <PageData path={path} name={title} breadcrumbParent={parent} article={article?.post} citation={article?.citation}/>
      <a className="skip" href="#main">본문 바로가기</a>
      <SiteHeader/>
      <main id="main">
        <RegenOverviewMotion visibleOnly/>
        {showHero && <section className="ro-hero" aria-labelledby="ins-hero-title">
          <picture className="ro-hero-image"><img src="/images/danaun-space.png" alt="" fetchPriority="high"/></picture>
          <div className="ro-hero-content">
            <p className="ro-label" lang="en">{label}</p>
            <p className="ro-hero-sub">{parent ? <a href={parent.path}>{parent.name}</a> : '다나은재활의학과의원'}</p>
            <h1 id="ins-hero-title"><em>{title}</em></h1>
            <p>{summary}</p>
            {heroLinks.length > 0 && <div className="ro-hero-links">
              {heroLinks.map(({href, label}) => <a className="ro-link" key={href} href={href}>
                {label}<span aria-hidden="true">↓</span>
              </a>)}
            </div>}
          </div>
        </section>}
        <nav className="regen-tabs ins-tabs" aria-label="다나은 인사이트 메뉴">
          {insightSections.map(({id, name}) => <a key={id} href={'/insights/' + id}
            aria-current={id === section?.id ? 'page' : undefined}>{name}</a>)}
        </nav>
        {children}
      </main>
      <HomeFooter/>
    </div>
  );
}
