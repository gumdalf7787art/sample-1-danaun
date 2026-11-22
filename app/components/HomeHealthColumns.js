import {insightPostPath} from '../data/insight-post-path.mjs';
const previewColumns = [
  {
    slug: 'preview-knee',
    topic: '무릎 통증',
    title: '계단을 오르내릴 때 무릎이 아프다면',
    summary: '무릎 통증을 평가할 때 어떤 점을 살펴보는지 알아봅니다.',
    cover: {src: '/images/center-care-2.webp'},
  },
  {
    slug: 'preview-ultrasound',
    topic: '정밀 진단',
    title: '근골격 초음파로 무엇을 살펴볼까요?',
    summary: '진찰과 초음파 검사가 어떻게 함께 쓰이는지 소개합니다.',
    cover: {src: '/images/diagnosis-assessment-1.webp'},
  },
  {
    slug: 'preview-rehab',
    topic: '운동 재활',
    title: '치료 후 재활은 어떻게 이어질까요?',
    summary: '재평가 결과를 바탕으로 운동 계획을 세우는 과정을 살펴봅니다.',
    cover: {src: '/images/diagnosis-assessment-2.webp'},
  },
  {
    slug: 'preview-sports',
    topic: '스포츠손상',
    title: '운동 중 다친 발목, 무엇을 확인할까요?',
    summary: '발목을 다친 뒤 진찰에서 확인하는 움직임과 불편을 살펴봅니다.',
    cover: {src: '/images/center-care-1.webp'},
  },
];

export default function HomeHealthColumns({posts}) {
  const preview = posts.length === 0;
  const columns = preview ? previewColumns : posts;
  return (
    <section className="home-health-columns" id="insights" aria-labelledby="home-health-columns-title">
      <div className="section">
        <div className="section-top home-media-heading">
          <div>
            <p className="eyebrow">DANAUN INSIGHTS</p>
            <h2 id="home-health-columns-title">건강 칼럼</h2>
          </div>
          <p className="section-intro">몸과 치료를 이해하는 데 도움이 되는 글을 만나보세요.</p>
        </div>
        {preview && <p className="home-column-preview">칼럼 배치 예시</p>}
        <ul className="home-column-list">
          {columns.map(post => {
            const Row = preview ? 'div' : 'a';
            return (
              <li key={post.slug}>
                <Row className="home-column-card" href={preview ? undefined : insightPostPath(post)}>
                  <div className="home-column-thumb">
                    {post.cover?.src && (
                      <img src={post.cover.src} alt={post.cover.alt || ''} width="320" height="180" loading="lazy" />
                    )}
                    {(post.topic || !post.cover?.src) && (
                      <span className="home-column-topic">{post.topic || '건강 칼럼'}</span>
                    )}
                  </div>
                  <div className="home-column-copy">
                    <h3>{post.title}</h3>
                    <p>{post.summary}</p>
                  </div>
                  {!preview && (
                    <time className="home-column-date" dateTime={post.publishedAt}>{post.publishedAt.slice(0, 10)}</time>
                  )}
                </Row>
              </li>
            );
          })}
        </ul>
        <div className="home-column-footer">
          <a className="underline-link home-column-archive" href="/insights/column">
            건강 칼럼 전체 보기 <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
