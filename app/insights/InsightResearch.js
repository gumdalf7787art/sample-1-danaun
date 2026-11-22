'use client';

import {useState} from 'react';
import {researchGroups, researchTypes} from '../data/research-library-options';

function normalize(value) {
  return value.normalize('NFKC').toLowerCase().replace(/[·•–—/-]/g, ' ').replace(/\s+/g, ' ').trim();
}

function ResearchRecord({record}) {
  const {anchors, citations, doi, links, pdf, studyPath, title, type, year} = record;
  return <li className="research-record">
    <div>
      {anchors.map(anchor => <span key={anchor} id={anchor}/>)}
      <p className="research-type">{type}{year && <> <span aria-hidden="true">·</span> {year}</>}</p>
      <h3>{title}</h3>
      {doi && <p className="research-doi">DOI {doi}</p>}
      <div className="research-citations">
        <span>인용 페이지</span>
        <ul aria-label={title + ' 인용 페이지'}>
          {citations.map(citation => <li key={citation.href}><a href={citation.href}>{citation.name}</a></li>)}
        </ul>
      </div>
    </div>
    <div className="research-access">
      {studyPath && <a className="ro-link" href={studyPath}>연구 해설 읽기 <span aria-hidden="true">↗</span></a>}
      {pdf && <a className="research-download" href={pdf.file} download>{pdf.label || 'PDF 다운로드'} <span aria-hidden="true">↓</span></a>}
      {links.map(({url, label}) => <a className="ro-link" key={url} href={url} target="_blank" rel="noreferrer">
        {label}<span aria-hidden="true">↗</span>
      </a>)}
      {pdf && <p className="research-license">{pdf.credit} · <a href={pdf.license.href} target="_blank" rel="noreferrer">{pdf.license.name}</a> · 원본 PDF</p>}
    </div>
  </li>;
}

export default function InsightResearch({records, initialPage = ''}) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const groups = researchGroups.filter(([key]) => records.some(record => record.citations.some(citation => citation.group === key)));
  const pages = new Map();
  for (const {citations} of records) {
    for (const {href, group, name} of citations) pages.set(href.split('#')[0], {group, name});
  }
  const [group, setGroup] = useState(() => pages.has(initialPage) ? initialPage : '');

  function changeGroup(value) {
    setGroup(value);
    const url = new URL(window.location.href);
    if (pages.has(value)) url.searchParams.set('page', value);
    else url.searchParams.delete('page');
    window.history.replaceState(null, '', url);
  }

  const types = researchTypes.filter(option => records.some(record => record.type === option));
  const terms = normalize(query).split(' ').filter(Boolean);
  const results = records.filter(record => {
    if (group && !record.citations.some(citation => citation.group === group || citation.href.split('#')[0] === group)) return false;
    if (type && type !== record.type) return false;
    const searchable = normalize([record.title, record.type, record.year, record.doi, ...record.names,
      ...record.citations.map(citation => citation.name)].join(' '));
    const compact = searchable.replaceAll(' ', '');
    return terms.every(term => searchable.includes(term) || compact.includes(term));
  });

  return <section className="ro-band ins-research research-library" id="research-summary" aria-labelledby="research-title">
    <div className="ro-wrap">
      <div className="ro-heading">
        <h2 id="research-title">다나은이 참고하는 <em>연구와 원문 자료</em></h2>
        <p>재생치료, 치료센터, 정밀 진단에서 인용한 논문과 지침을 찾아보세요. 각 자료에서 인용한 페이지로 바로 이동할 수 있습니다.</p>
      </div>
      <form className="research-controls" id="reading-guide" role="search" onSubmit={event => event.preventDefault()}>
        <div>
          <label htmlFor="research-query">자료 검색</label>
          <input id="research-query" type="search" value={query} onChange={event => setQuery(event.target.value)}
            placeholder="예: 초음파, PRP, Schreiber" maxLength={180}/>
        </div>
        <div>
          <label htmlFor="research-group">인용 분야·페이지</label>
          <select id="research-group" value={group} onChange={event => changeGroup(event.target.value)}>
            <option value="">전체 분야</option>
            {groups.map(([key, label]) => <optgroup key={key} label={label}>
              <option value={key}>{label} 전체</option>
              {[...pages].filter(([, page]) => page.group === key).map(([path, page]) =>
                <option key={path} value={path}>{page.name}</option>)}
            </optgroup>)}
          </select>
        </div>
        <div>
          <label htmlFor="research-type">자료 유형</label>
          <select id="research-type" value={type} onChange={event => setType(event.target.value)}>
            <option value="">전체 유형</option>
            {types.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
      </form>
      <div id="sources">
        <span id="treatment-evidence"/><span id="mechanisms"/>
        <div className="research-results">
          <p role="status">전체 {records.length}건 중 <strong>{results.length}건</strong></p>
          {(query || group || type) && <button type="button" onClick={() => {
            setQuery('');
            changeGroup('');
            setType('');
          }}>검색·필터 초기화</button>}
        </div>
        {results.length > 0 ? <ul className="research-list" aria-label="근거 자료 목록">
          {results.map(record => <ResearchRecord key={record.id} record={record}/>)}
        </ul> : <p className="research-empty">검색 결과가 없습니다. 다른 검색어나 필터를 선택해 주세요.</p>}
      </div>
      <aside className="research-note" id="decision">
        <span id="research-faq"/>
        <h3>원문을 읽을 때</h3>
        <p>연구 대상과 비교 방법, 관찰 기간을 함께 살펴보세요. 국외 지침과 국내 고시·평가 자료는 적용 범위가 다를 수 있습니다.</p>
      </aside>
    </div>
  </section>;
}
