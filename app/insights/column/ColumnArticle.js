import {Fragment} from 'react';
import ColumnVideo from './ColumnVideo';
import {Photo, Source} from './ColumnElements';
import KneeColumn, {kneeColumn} from './KneeColumn';
import {columnPath, columnSampleSlug, insightPostPath} from '../../data/insight-post-path.mjs';
import './column-article.css';

function Lines({lines, fallback}) {
  return lines ? lines.map((line, i) => (
    <Fragment key={line}>{i > 0 && <br />}{line}</Fragment>
  )) : fallback;
}

function Cards({title, items}) {
  if (!items.length) return null;
  return (
    <section className="column-recommendations">
      <h2>{title}</h2>
      <ul className="column-related">
        {items.map(item => (
          <li key={item.slug}>
            <a href={insightPostPath(item)} className={item.cover?.src ? undefined : 'column-card-text'}>
              {item.cover?.src && <img src={item.cover.src} alt="" width="480" height="300" loading="lazy" />}
              <div>
                <small>{item.category === 'exercise' ? '홈운동 라이브러리' : '건강칼럼'}</small>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <span>글 읽기 ↗</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ArticleSections({post, editorial}) {
  const {quote, checklist, midpointPhoto, callout} = editorial;
  return post.sections.map((section, index) => {
    const citation = post.sources?.[section.source];
    return (
      <Fragment key={section.id}>
        <section className="column-section" id={section.id}>
          <span className="column-number">{String(index + 1).padStart(2, '0')}</span>
          <h2>{section.title}</h2>
          {section.emphasis ? (
            <p>
              <strong>{section.emphasis}</strong> {section.explanation}
              {citation && <> <Source href={citation.url}>{citation.title}</Source></>}
            </p>
          ) : section.paragraphs?.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
          {section.bullets?.length > 0 && <ul>{section.bullets.map((item, i) => <li key={i}>{item}</li>)}</ul>}
          {section.table && (
            <div className="column-table" role="region" aria-label={section.title + ' 표'} tabIndex={0}>
              <table>
                <thead><tr>{section.table.headers.map((header, i) => <th scope="col" key={i}>{header}</th>)}</tr></thead>
                <tbody>{section.table.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
          )}
        </section>
        {index === 0 && quote && <blockquote className="column-quote"><p><strong>{quote}</strong></p></blockquote>}
        {index === 1 && checklist && (
          <aside className="column-callout">
            <h3>{checklist.title}</h3>
            <ul>{checklist.items.map(([label, text]) => <li key={label}><strong>{label}</strong><span>{text}</span></li>)}</ul>
          </aside>
        )}
        {index === 2 && midpointPhoto && <Photo {...midpointPhoto} />}
        {index === 4 && callout && (
          <aside className="column-callout column-alert">
            <span className="column-eyebrow">{callout.label}</span>
            <h3>{callout.title}</h3>
            <p>{callout.text}</p>
          </aside>
        )}
      </Fragment>
    );
  });
}

export default function ColumnArticle({post, related, other, listQuery}) {
  const sample = post.slug === columnSampleSlug && !post.id;
  const editorial = sample ? kneeColumn : post.editorial || {};
  const sources = sample ? editorial.sources : post.sources;
  const video = editorial.video || (post.youtubeId && {id: post.youtubeId, title: post.title});
  const cover = post.cover;
  return (
    <article className="column-article" aria-labelledby="column-title">
      <div className="column-heading column-wide">
        <nav className="column-breadcrumb" aria-label="현재 위치">
          <a href="/insights">다나은 인사이트</a><span aria-hidden="true">／</span><a href={columnPath + listQuery}>건강칼럼</a>
        </nav>
        <p className="column-eyebrow">RESET JOURNAL{editorial.topic && ' · ' + editorial.topic}</p>
        <h1 id="column-title"><Lines lines={editorial.titleLines} fallback={post.title} /></h1>
        <p className="column-summary"><Lines lines={editorial.summaryLines} fallback={post.summary} /></p>
        <div className="column-meta">
          <span>{post.author}</span>
          <time dateTime={post.publishedAt}>{post.publishedAt?.slice(0, 10)}</time>
          <span>건강칼럼</span>
          {post.updatedAt?.slice(0, 10) > post.publishedAt?.slice(0, 10) &&
            <time dateTime={post.updatedAt}>수정 {post.updatedAt.slice(0, 10)}</time>}
          {post.reviewedBy && <span>의학 검토 {post.reviewedBy}{post.reviewedAt && ' · ' + post.reviewedAt}</span>}
        </div>
      </div>
      <div className="column-reading">
        {cover?.src && <Photo first {...cover} caption={editorial.coverCaption || cover.caption} />}
        {sample ? <KneeColumn /> : <ArticleSections post={post} editorial={editorial} />}
        {!sample && post.relatedLinks?.length > 0 && (
          <section className="column-references" aria-label="관련 진료 안내">
            <h2>관련 진료 안내</h2>
            <ul>{post.relatedLinks.map(link => <li key={link.href}><a href={link.href}>{link.label} ↗</a></li>)}</ul>
          </section>
        )}
        {post.faqs?.length > 0 && (
          <section className="column-section">
            <h2>함께 알아볼 질문</h2>
            <dl className="column-faq">{post.faqs.map(([question, answer], i) => (
              <div key={i}><dt><strong>{question}</strong></dt><dd>{answer}</dd></div>
            ))}</dl>
          </section>
        )}
        {video && (
          <section className="column-video" aria-labelledby="column-video-title">
            <p className="column-eyebrow">관련 영상</p>
            <h2 id="column-video-title">{video.title}</h2>
            {video.description && <p className="column-note">{video.description}</p>}
            <ColumnVideo id={video.id} title={video.title} />
            <Source href={'https://www.youtube.com/watch?v=' + video.id}>유튜브에서 영상 보기</Source>
            {post.transcript && <details><summary>영상 내용 읽기</summary><p className="column-transcript">{post.transcript}</p></details>}
          </section>
        )}
        <p className="column-note">개인의 진단과 운동·치료 계획은 진료를 통해 확인합니다.</p>
        {sources?.length > 0 && (
          <section className="column-references" id="references" aria-labelledby="column-references-title">
            <h2 id="column-references-title">참고 자료</h2>
            <ul>{sources.map(source => <li key={source.url}><Source href={source.url}>{source.title}</Source></li>)}</ul>
          </section>
        )}
      </div>
      <div className="column-wide column-footer">
        <Cards title="관련 주제, 함께 읽을 글" items={related} />
        <Cards title="다른 주제의 건강 이야기" items={other} />
        <a className="column-back" href={columnPath + listQuery}>← 건강칼럼 목록으로</a>
      </div>
    </article>
  );
}
