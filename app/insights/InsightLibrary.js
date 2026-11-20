import BroadcastStrip from '../about/doctor/BroadcastStrip';
import YouTubeShowcase from '../components/YouTubeShowcase';
import {broadcasts} from '../about/doctor/broadcasts';
import {getLatestVideos, getLiveVideos} from '../../lib/youtube.mjs';
import {getPublishedPosts} from '../../lib/insights/public.mjs';
import {filterPosts} from '../data/insights.mjs';
import {insightSections} from '../data/insight-sections.mjs';
import {researchCards} from '../data/research';
import {getResearchLibrary} from '../data/research-library';
import InsightResearch from './InsightResearch';
import {FeaturedStudies} from './ResearchStudies';
import {researchStudies, researchStudyPath} from '../data/research-studies';
import InsightShell from './InsightShell';
import ExerciseVideos from './ExerciseVideos';
import {columnListQuery, columnPath, insightPostPath} from '../data/insight-post-path.mjs';
import '../about/doctor/profile.css';

const pressNotice = 'https://www.resetclinic.co.kr/shop_contents/myboard_list.htm?myboard_code=myboard3&category_idx=33901';
const press = [
  [272766, 'JTBC골프 12월호'],
  [272742, '채널A 방송 관련 어깨 재활 보도'],
  [272736, '산전·산후 필라테스'],
  [272735, '통증의 근본 원인'],
  [272734, '아티스트 클리닉'],
  [272733, '음악교육신문 인터뷰'],
];
const pressUrl = id => 'https://www.resetclinic.co.kr/shop_contents/myboard_read.htm?myboard_code=myboard3&category_idx=33901&idx=' + id;

function Search({path, q}) {
  return <form action={path} method="get" className="ins-search" role="search">
    <label htmlFor="ins-query">제목·주제로 검색</label>
    <div><input id="ins-query" name="q" type="search" defaultValue={q} maxLength={200} placeholder="검색어를 입력해 주세요"/>
      <button type="submit">검색</button></div>
  </form>;
}

function PanelTitle({title, label, href}) {
  return <div className="ins-panel-heading">
    <div>{label && <p className="ro-label" lang="en">{label}</p>}<h2>{title}</h2></div>
    {href && <a className="ro-link" href={href}>전체 보기 <span aria-hidden="true">↗</span></a>}
  </div>;
}

function PostCards({posts, listQuery = '', columns = false}) {
  return <ul className={columns ? 'ins-card-grid ins-column-grid' : 'ins-card-grid'} role="list">{posts.map(post => {
    const path = insightPostPath(post);
    return <li key={post.slug}>
    <a className="ins-post-card" href={path + (path.startsWith(columnPath + '/') ? listQuery : '')}>
      {post.cover?.src ? <img src={post.cover.src} alt={post.cover.alt || ''} width="480" height="270" loading="lazy" decoding="async"/>
        : <span className="ins-card-cover" aria-hidden="true"/>}
      <div><p className="ins-topic">{post.tags?.[0]}</p><h3>{post.title}</h3><p>{post.summary}</p>
        {post.publishedAt && <time dateTime={post.publishedAt}>{post.publishedAt.slice(0,10)}</time>}</div>
    </a>
  </li>})}</ul>;
}

function QuestionBoard({posts, offset, listQuery}) {
  return <div className="ins-board">
    <div className="ins-board-head" aria-hidden="true"><span>순번</span><span>질문</span><span>게시일</span><span>조회수</span></div>
    <ul role="list">{posts.map((post, index) => <li key={post.slug}><a href={insightPostPath(post) + listQuery}>
      <span className="ins-board-number">{offset + index + 1}</span>
      <span className="ins-board-question">
        <strong>{post.title}</strong>
        {post.sections?.some(section =>
          section.paragraphs?.some(text => text.trim()) ||
          section.bullets?.some(text => text.trim()) ||
          section.table?.rows?.some(row => row.some(cell => cell.trim()))
        ) && <span className="ins-board-reply"><span aria-hidden="true">↳</span> 답변완료</span>}
      </span>
      <time dateTime={post.publishedAt}>{post.publishedAt?.slice(0,10)}</time>
      <span className="ins-board-views">
        <span className="ins-board-views-label">조회수</span>
        {Number.isSafeInteger(post.viewCount) && post.viewCount >= 0
          ? post.viewCount.toLocaleString('ko-KR')
          : <span aria-label="조회수 미집계" title="조회수 미집계">—</span>}
      </span>
    </a></li>)}</ul>
  </div>;
}

function Empty({search}) {
  return <p className="ins-empty">{search ? '검색 조건에 맞는 콘텐츠가 없습니다.' : '등록된 콘텐츠가 없습니다.'}</p>;
}

function PostsPanel({section, params, posts}) {
  const path = '/insights/' + section.id;
  const q = typeof params.q === 'string' ? params.q.slice(0,200).trim() : '';
  const matches = filterPosts(posts, {category: section.id, q}).filter(post =>
    section.id !== 'exercise' || /^[a-zA-Z0-9_-]{11}$/.test(post.youtubeId || ''));
  const pageCount = Math.max(1, Math.ceil(matches.length / 12));
  const requestedVideo = section.id === 'exercise' ? matches.findIndex(post => post.slug === params.video) : -1;
  const current = requestedVideo >= 0 ? Math.floor(requestedVideo / 12) + 1
    : Math.max(1, Math.min(pageCount, Number.parseInt(params.page, 10) || 1));
  const offset = (current - 1) * 12;
  const pageItems = matches.slice(offset, offset + 12);
  const href = (page) => {
    const query = new URLSearchParams({...(q ? {q} : {}), ...(page > 1 ? {page:String(page)} : {})});
    return path + (query.size ? '?' + query : '');
  };
  return <>
    <Search path={path} q={q}/>
    <div className="ins-result"><span>{q ? '검색 결과' : '등록된 글'} {matches.length}개</span>{q && <a href={path}>초기화</a>}</div>
    {pageItems.length ? section.id === 'questions' ? <QuestionBoard posts={pageItems} offset={offset} listQuery={columnListQuery({q, page: String(current)})}/> : section.id === 'exercise' ? <ExerciseVideos posts={pageItems} initialSlug={params.video}/>
      : <PostCards posts={pageItems} columns={section.id === 'column'} listQuery={section.id === 'column' ? columnListQuery({q, page:String(current)}) : ''}/>
      : <Empty search={q}/>}
    {pageCount > 1 && <nav className="ins-filter ins-pagination" aria-label="페이지">
      {Array.from({length:pageCount}, (_, index) => index + 1).map(page => <a key={page} href={href(page)}
        aria-current={page === current ? 'page' : undefined}>{page}</a>)}
    </nav>}
  </>;
}

async function TvPanel({posts}) {
  const feed = await getLiveVideos();
  const articles = filterPosts(posts, {category:'tv'});
  return <>
    {feed.videos.length > 0 && <YouTubeShowcase feed={feed} archive expanded/>}
    {articles.length > 0 && <section className="ins-press"><PanelTitle title="영상으로 읽는 건강 정보"/><PostCards posts={articles}/></section>}
    {!feed.videos.length && !articles.length && <Empty/>}
  </>;
}

function MediaPanel({params}) {
  const view = ['broadcast', 'press'].includes(params.type) ? params.type : '';
  return <>
    <nav className="ins-filter" aria-label="방송과 언론보도">
      {[['','전체'],['broadcast','방송'],['press','언론 기사']].map(([id, label]) => <a key={id}
        href={'/insights/media' + (id ? '?type=' + id : '')} aria-current={id === view ? 'page' : undefined}>{label}</a>)}
    </nav>
    {view !== 'press' && <BroadcastStrip archive/>}
    {view !== 'broadcast' && <section className="ins-press">
      <h3>언론 기사</h3>
      <ul className="ins-press-list" role="list">{press.map(([id, title]) => <li key={id}>
        <a href={pressUrl(id)} target="_blank" rel="noreferrer">{title}<span aria-hidden="true">↗</span></a>
      </li>)}</ul>
      <a className="ro-link" href={pressNotice} target="_blank" rel="noreferrer">기존 홈페이지 언론보도 목록 <span aria-hidden="true">↗</span></a>
    </section>}
  </>;
}

export async function InsightLanding({query = ""} = {}) {
  const posts = await getPublishedPosts();
  if (query) {
    const matches = filterPosts(posts, {q:query});
    return <InsightShell>
      <section className="ro-band"><div className="ro-wrap">
        <Search path="/insights" q={query}/>
        <div className="ins-result"><span>검색 결과 {matches.length}개</span><a href="/insights">초기화</a></div>
        {matches.length ? <PostCards posts={matches}/> : <Empty search/>}
      </div></section>
    </InsightShell>;
  }
  const columns = posts.filter(post => post.category === 'column').slice(0, 2);
  const previews = {
    questions: posts.filter(post => post.category === 'questions').slice(0, 2).map(post => [post.title, '/insights/' + post.slug]),
    exercise: posts.filter(post => post.category === 'exercise').slice(0, 2).map(post => [post.title, '/insights/' + post.slug]),
    media: broadcasts.slice(0,2).map(({title}) => [title, '/insights/media']),
    research: researchCards.map(({id, name}) => [name, '/insights/research#' + id]),
  };
  return <InsightShell>
    <section className="ro-band"><div className="ro-wrap ins-featured">
      <div><PanelTitle title="닥터고은 TV" label="DOCTOR GOEUN TV" href="/insights/tv"/>
        <YouTubeShowcase feed={getLatestVideos()} archive/></div>
      <div><PanelTitle title="건강칼럼" label="HEALTH JOURNAL" href="/insights/column"/>
        <PostCards posts={columns}/></div>
    </div></section>
    <section className="ro-band ins-more"><div className="ro-wrap">
      <div className="ins-more-grid">{insightSections.slice(2).map(({id, name, description}) => (
        <section className="ins-preview-links" key={id}>
          <PanelTitle title={name} href={'/insights/' + id}/>
          <p>{description}</p>
          <ul role="list">{previews[id].map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}</ul>
        </section>
      ))}</div>
    </div></section>
  </InsightShell>;
}

export async function InsightCategory({section, params}) {
  if (section.id === 'research') {
    const records = getResearchLibrary(await getPublishedPosts()).map(record => {
      const study = researchStudies.find(item => item.doi === record.doi);
      return study ? {...record, studyPath: researchStudyPath(study.slug)} : record;
    });
    const requestedPage = typeof params.page === 'string' ? params.page : '';
    const page = records.some(record => record.citations.some(citation => citation.href.split('#')[0] === requestedPage))
      ? requestedPage : '';
    const heroLinks = page ? [] : [
      {href:'#restore', label:'PRP 연구'},
      {href:'#miles', label:'무릎 SVF 연구'},
      {href:'#reading-guide', label:'전체 자료 검색'},
    ];
    return <InsightShell section={section} heroLinks={heroLinks}>
      {!page && <FeaturedStudies records={records}/>}
      <InsightResearch key={page} records={records} initialPage={page}/>
    </InsightShell>;
  }
  const posts = section.id === 'media' ? [] : await getPublishedPosts();
  return <InsightShell section={section}>
    <section className="ro-band ins-content" aria-label={section.name + ' 목록'}>
      <div className="ro-wrap">
        {section.id === 'tv' ? <TvPanel posts={posts}/> : section.id === 'media' ? <MediaPanel params={params}/>
          : <PostsPanel section={section} params={params} posts={posts}/>}
      </div>
    </section>
  </InsightShell>;
}
