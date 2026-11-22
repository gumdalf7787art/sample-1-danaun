import '../support/board-detail.css';
import {insightPostPath} from '../data/insight-post-path.mjs';

const questionsPath = '/insights/questions';

export default function QuestionDetail({post, otherQuestions, listQuery}) {
  const listHref = questionsPath + listQuery;
  const questionParagraphs = post.questionBody?.split(/\n\s*\n/).filter(Boolean) || [];
  return <div className="notice-detail question-detail">
    <article className="notice-sheet" aria-labelledby="question-title">
      <nav className="notice-breadcrumb" aria-label="현재 위치"><a href={listHref}>묻고 답하기</a></nav>
      <div className="notice-heading question-heading">
        <span className="question-label">질문</span>
        <h1 id="question-title">{post.title}</h1>
        <div className="notice-meta">
          {post.author && <span>답변 작성 {post.author}</span>}
          {post.publishedAt && <time dateTime={post.publishedAt}>게시일 {post.publishedAt.slice(0, 10).replaceAll('-', '.')}</time>}
          {post.reviewedBy && <span>의학 검토 {post.reviewedBy}{post.reviewedAt && ' · ' + post.reviewedAt}</span>}
        </div>
      </div>
      {questionParagraphs.length > 0 && (
        <div className="question-body">
          {questionParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
        </div>
      )}
      <section className="question-answer" aria-labelledby="question-answer-title">
        <h2 id="question-answer-title" className="question-label">답변</h2>
        {post.sections.map(section => <section className="question-section" id={section.id} key={section.id}>
          <h3>{section.title}</h3>
          {section.paragraphs?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          {section.bullets?.length > 0 && <ul>{section.bullets.map((item, index) => <li key={index}>{item}</li>)}</ul>}
          {section.table && <div className="question-table" tabIndex={0} role="region" aria-label={section.title + ' 표'}>
            <table>
              <thead><tr>{section.table.headers.map((cell, index) => <th key={index} scope="col">{cell}</th>)}</tr></thead>
              <tbody>{section.table.rows.map((row, index) => <tr key={index}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>}
        </section>)}
        {post.faqs?.length > 0 && <dl>{post.faqs.map(([question, answer], index) =>
          <div key={index}><dt>{question}</dt><dd>{answer}</dd></div>)}</dl>}
        {post.sources?.length > 0 && <ul>{post.sources.map(source =>
          <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} ↗</a></li>)}</ul>}
        {post.relatedLinks?.length > 0 && <ul>{post.relatedLinks.map(link =>
          <li key={link.href}><a href={link.href}>{link.label} ↗</a></li>)}</ul>}
      </section>
    </article>
    {otherQuestions.length > 0 && <section className="notice-more" aria-labelledby="question-more-title">
      <div className="notice-more-heading"><h2 id="question-more-title">다른 질문</h2><a href={listHref}>전체 목록 보기 ↗</a></div>
      <ul>{otherQuestions.map(question => <li key={question.slug}>
        <a href={insightPostPath(question) + listQuery}>
          <span className="notice-more-name">{question.title}</span>
          {question.publishedAt && <time dateTime={question.publishedAt}>{question.publishedAt.slice(0, 10).replaceAll('-', '.')}</time>}
          <span className="notice-more-arrow" aria-hidden="true">↗</span>
        </a>
      </li>)}</ul>
      <a className="notice-back" href={listHref}>← 묻고 답하기 목록으로</a>
    </section>}
  </div>;
}
