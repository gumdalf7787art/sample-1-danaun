import {researchPath, researchStudies} from '../data/research-studies';
import './research-studies.css';

function ResearchContext({study}) {
  return <dl className="study-context">
    <div><dt>비교군</dt><dd>{study.comparison}</dd></div>
    <div><dt>해석 범위</dt><dd>{study.scope}</dd></div>
  </dl>;
}

export function FeaturedStudies({records}) {
  return <div id="featured-studies" className="research-featured">
    {researchStudies.map(study => <StudyExplainer key={study.slug} study={study}
      record={records.find(record => record.doi === study.doi)} embedded/>)}
  </div>;
}

export function StudyExplainer({study, record, embedded = false}) {
  const titleId = study.slug + '-study-title';
  const stageId = stage => embedded ? study.slug + '-' + stage : 'study-' + stage;

  return <article className="study-explainer" id={study.slug} aria-labelledby={titleId}>
    <section className="ro-band study-intro">
      <div className="ro-wrap study-wrap">
        <p className="study-publication">외부 연구 해설 · {study.publication}</p>
        <h2 id={titleId}>{study.treatment} · <em>{study.studyName}</em></h2>
        <h3>{study.title}</h3>
        <p>{study.questionIntro}</p>
      </div>
    </section>
    <section className="ro-band study-method" aria-labelledby={stageId('method')}>
      <div className="ro-wrap study-wrap">
        <div className="ro-heading">
          <h3 id={stageId('method')}>누구를 어떻게 <em>비교했나요?</em></h3>
          <p>{study.studyName} 무작위시험</p>
        </div>
        <ul className="study-groups" aria-label="연구에서 비교한 주사">
          {study.groups.map(([label, name]) => <li key={name}>
            <span>{label}</span><strong>{name}</strong>
          </li>)}
        </ul>
        <dl className="study-method-grid">
          {study.method.map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}
        </dl>
      </div>
    </section>
    <section className="ro-band study-findings" id={stageId('findings')} aria-labelledby={stageId('findings-title')}>
      <div className="ro-wrap study-wrap">
        <div className="ro-heading"><h3 id={stageId('findings-title')}>{study.findingsTitle}</h3></div>
        <div className="study-results-grid">
          <div className="study-result">
            <h4>12개월 주요 결과</h4><p>{study.summary}</p>
            <dl className="study-outcomes">
              {study.results.map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}
            </dl>
          </div>
          <ResearchContext study={study}/>
        </div>
      </div>
    </section>
    <section className="ro-band study-interpretation" aria-labelledby={stageId('interpretation')}>
      <div className="ro-wrap study-wrap">
        <h3 id={stageId('interpretation')}>이 결과를 <em>어떻게 읽을까요?</em></h3>
        <p className="study-reading">{study.reading}</p>
      </div>
    </section>
    <section className="ro-band study-source" id={stageId('source')} aria-labelledby={stageId('source-title')}>
      <div className="ro-wrap study-wrap">
        <h3 id={stageId('source-title')}>원문과 <em>인용 정보</em></h3>
        <p className="study-citation">{study.citation}</p>
        <div className="study-source-links">
          <a className="ro-link" href={study.original} target="_blank" rel="noreferrer">학술지 원문 보기 <span aria-hidden="true">↗</span></a>
          {record?.pdf && <a className="ro-link" href={record.pdf.file} download>원본 PDF 다운로드 <span aria-hidden="true">↓</span></a>}
        </div>
        {record?.pdf && <p className="study-license">{record.pdf.credit} · <a href={record.pdf.license.href}>{record.pdf.license.name}</a></p>}
        {record?.citations.length > 0 && <div className="study-related">
          <h4>이 논문을 인용한 리셋 페이지</h4>
          <ul>{record.citations.map(({href, name}) => <li key={href}><a href={href}>{name} ↗</a></li>)}</ul>
        </div>}
        {!embedded && <a className="ro-link" href={researchPath + '#reading-guide'}>전체 근거 자료 보기 <span aria-hidden="true">↗</span></a>}
      </div>
    </section>
  </article>;
}
