'use client';

import {useState} from 'react';
import {feeGroups} from '../data/fees';
import './fee-directory.css';

const categories = [
  { label: '전체' },
  { label: '검사·상담', groups: ['초음파', '기타'] },
  { label: '시술·도수치료', groups: ['수술 및 시술', '도수 치료'] },
  { label: '주사', groups: ['비급여 주사'] },
  { label: '위고비·마운자로', groups: ['위고비', '마운자로'] },
  { label: '보조기·드레싱', groups: ['보조기', '드레싱'] },
  { label: '서류·증명서', groups: ['각종 서류'] },
];

const normalize = (text) => text.normalize('NFKC').toLowerCase().replace(/\s+/gu, '');

export default function FeeDirectory() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(0);
  const terms = query.trim().split(/\s+/u).filter(Boolean).map(normalize);
  const categoryGroups = categories[category].groups;
  const results = feeGroups
    .filter(([group]) => !categoryGroups || categoryGroups.includes(group))
    .map(([group, rows]) => [group, rows.filter(([name]) => (
      terms.every(term => normalize(group + name).includes(term))
    ))])
    .filter(([, rows]) => rows.length > 0);
  const resultCount = results.reduce((count, [, rows]) => count + rows.length, 0);
  const filtered = terms.length > 0 || category !== 0;

  function resetFilters() {
    setQuery('');
    setCategory(0);
  }

  return (
    <div className="fee-directory">
      <div className="fee-controls">
        <label htmlFor="fee-query">비급여 항목 검색</label>
        <div className="fee-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4.5 4.5" strokeLinecap="round"/>
          </svg>
          <input id="fee-query" type="search" value={query} onChange={event => setQuery(event.target.value)}
            placeholder="초음파, 도수치료, 진단서 등으로 검색" autoComplete="off"/>
        </div>
        <div className="fee-categories" role="group" aria-label="비급여 항목 카테고리">
          {categories.map(({label}, index) => (
            <button key={label} type="button" aria-pressed={category === index} onClick={() => setCategory(index)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="fee-results-meta">
        <p role="status">{filtered ? '검색 결과' : '전체 항목'} <strong>{resultCount}개</strong></p>
        <button type="button" onClick={resetFilters} disabled={!query && category === 0}>초기화</button>
      </div>
      {resultCount === 0 ? (
        <div className="fee-no-results">일치하는 항목이 없습니다. 검색어를 바꾸거나 ‘전체’를 선택해 주세요.</div>
      ) : (
        <div className="fee-tables">
          {results.map(([group, rows]) => (
            <table key={group} className="fee-table" role="table" aria-label={group}>
              <caption>{group}</caption>
              <thead role="rowgroup">
                <tr role="row">
                  <th scope="col" role="columnheader">항목</th>
                  <th scope="col" role="columnheader">금액</th>
                  <th scope="col" role="columnheader">비고</th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                {rows.map(([name, price, note]) => (
                  <tr key={name} role="row">
                    <th scope="row" role="rowheader">{name}</th>
                    <td role="cell" className="fee-amount">{price}</td>
                    <td role="cell" className={note ? 'fee-note' : 'fee-note fee-note-empty'}>
                      {note && <span className="fee-mobile-note" aria-hidden="true">비고</span>}
                      {note || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      )}
    </div>
  );
}
