'use client';

import {useEffect, useRef, useState} from 'react';
import {resetPrinciples as principles} from '../data/about';

export default function ResetPrinciples({pointsOnly = false}) {
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const titleId = pointsOnly ? 'pd-lenses-title' : 'reset-principles-title';

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {threshold: .12});
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={pointsOnly ? 'clinical-perspectives' : 'reset-principles'}
      className={['reset-principles', pointsOnly && 'ro-band pd-lenses', visible && 'principle-visible', paused && 'motion-paused'].filter(Boolean).join(' ')}
      aria-labelledby={titleId}
    >
      <div className="principles-waves" aria-hidden="true"><span/><span/><span/></div>
      <div className={pointsOnly ? 'ro-wrap pd-lenses-inner' : 'principles-inner'}>
        {pointsOnly ? (
          <div className="ro-heading"><h2 id={titleId} data-ro-title>리셋의 <em>4가지 포인트</em></h2></div>
        ) : (
          <div className="principles-heading">
            <div>
              <p className="eyebrow">OUR DIRECTION · RESET 4원칙</p>
              <h2 id={titleId}>통증은 참는 것이 아니라<br/><em>읽는 것입니다.</em></h2>
            </div>
            <div>
              <p className="principles-intro">같은 무릎 통증도 시작된 곳은 사람마다 다릅니다.<br/>리셋은 통증의 원인을 보고, 치료하고, 다시 봅니다.</p>
              <ol className="direction-steps"><li>원인을 봅니다</li><li>치료하고, 움직임을 바꿉니다</li><li>시간이 지난 뒤 다시 봅니다</li></ol>
            </div>
          </div>
        )}
        <div className="principles-diagram">
          {!pointsOnly && (
            <div className="principles-diagnosis">
              <span>PRECISION ASSESSMENT</span><h3>정밀 초음파 진단</h3><p>진찰과 움직임 평가를 함께</p><i aria-hidden="true"/>
            </div>
          )}
          <div className="principles-grid">
            {principles.map(([en, title, lead, description], index) => (
              <article className={`principle-item principle-${index}`} key={en} style={{'--principle-delay': `${index * 3}s`}}>
                <span className="principle-rule" aria-hidden="true"/>
                <span className="principle-number" aria-hidden="true">0{index + 1}</span>
                <div className="principle-text">
                  <p className="principle-label">{en}</p>
                  <h3>{title}</h3>
                  <p className="principle-lead">{lead}</p>
                  <p className="principle-description">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        {!pointsOnly && (
          <div className="principles-closing">
            <div><p>통증의 변화와 함께, <strong>움직임의 회복도 확인합니다.</strong></p><span>네 가지 관점을 바탕으로 나에게 필요한 치료와 재활을 함께 설계합니다.</span></div>
            <a href="/about/principles">리셋 4원칙 자세히 보기 <span aria-hidden="true">↗</span></a>
          </div>
        )}
        <div className="principles-caption">
          {!pointsOnly && <small>연결성 · 움직임 · 안정성 · 회복</small>}
          <button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? '움직임 재생' : '움직임 멈춤'}</button>
        </div>
      </div>
    </section>
  );
}
