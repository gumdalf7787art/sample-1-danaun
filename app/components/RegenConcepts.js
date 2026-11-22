export function FibrinDiagram(){return <figure className="science-diagram"><svg viewBox="0 0 440 200" role="img" aria-label="혈소판과 피브린 그물망의 관계를 단순화한 개념도"><g fill="none" stroke="#15B4A2" opacity=".55">{Array.from({length:9},(_,i)=><path key={i} d={`M ${30+i*48} 12 Q ${380-i*34} 100 ${30+i*48} 188 M 15 ${15+i*21} Q 220 ${180-i*18} 425 ${15+i*21}`}/>)}</g>{[[75,65],[165,140],[270,50],[350,130],[222,95]].map(([x,y])=><g key={x}><circle cx={x} cy={y} r="14" fill="#15B4A2" opacity=".13"/><circle cx={x} cy={y} r="6" fill="#15B4A2"/></g>)}</svg><figcaption><span>● 혈소판</span><span>─ 피브린 구조</span><small>실제 크기·구조와 다른 개념도입니다. 현미경 사진이나 치료 결과가 아닙니다.</small></figcaption></figure>}
export function SvfDiagram(){return <figure className="science-diagram svf-diagram"><div className="svf-flow">{[['01','자가지방','채취한 지방 조직'],['02','분리','여러 세포의 분획'],['03','무릎','관절강내 적용']].map(([n,t,d])=><div key={n}><span>{n}</span><strong>{t}</strong><small>{d}</small></div>)}</div><figcaption><small>원료와 적용 부위를 보여주는 개념도입니다. 실제 처리 장비·시술 방법은 별도로 확인합니다.</small></figcaption></figure>}
export default function RegenConcepts() {
  return (
    <section className="regen-principles" id="regen-science" aria-labelledby="regen-science-title">
      <div className="section regen-comparison">
       <div className="regen-comparison-content">
        <div className="regen-principles-intro">
          <p className="eyebrow">DANAUN REGEN</p>
          <h2 id="regen-science-title" className="center-title-line">PRF와 무릎 SVF, <em>무엇이 다를까요?</em></h2>
          <p className="section-intro">어떤 성분을 사용하는지, 무엇을 확인해야 하는지 설명합니다.</p>
        </div>

        <article className="regen-principle-row" aria-labelledby="home-prf-title">
          <figure className="regen-principle-visual">
            <div className="regen-principle-image">
              <img src="/images/home-prf-diagram.webp" width="1200" height="800" loading="lazy" alt="브론즈색 피브린 그물망 사이에 민트색 혈소판이 놓인 개념도" />
            </div>
          </figure>
          <div className="regen-principle-copy">
            <div className="regen-principle-heading">
              <p>자가혈액 유래</p>
              <h3 id="home-prf-title">PRF</h3>
            </div>
            <p>내 혈액에서 얻는 혈소판과 피브린 관련 제제입니다. 피브린 그물망의 구조와 혈소판에서 나오는 신호물질을 살펴봅니다.</p>
            <a className="underline-link" href="/regen/prp-prf#prf">PRF 원리와 PRP와의 차이 보기 <span aria-hidden="true">↗</span></a>
          </div>
        </article>

        <article className="regen-principle-row" aria-labelledby="home-svf-title">
          <figure className="regen-principle-visual">
            <div className="regen-principle-image">
              <img src="/images/home-knee-svf-diagram.webp" width="1200" height="800" loading="lazy" alt="자가지방에서 분리한 여러 세포 성분을 표현한 개념도" />
            </div>
          </figure>
          <div className="regen-principle-copy">
            <div className="regen-principle-heading">
              <p>자가지방 유래 · 무릎 관절</p>
              <h3 id="home-svf-title">무릎 SVF</h3>
            </div>
            <p>SVF(자가지방유래 기질혈관분획)는 내 지방 조직에서 분리한 여러 세포 성분을 말합니다. 무릎 관절에 적용할지는 관절염의 단계와 이전 치료 등을 살펴 판단합니다.</p>
            <a className="underline-link" href="/regen/knee-svf">무릎 SVF 대상과 과정 보기 <span aria-hidden="true">↗</span></a>
          </div>
        </article>

        <div className="regen-principles-research">
          <p>연구에서 확인한 점과 아직 확인 중인 점</p>
          <a className="underline-link" href="/insights/research">근거·연구 보기 <span aria-hidden="true">↗</span></a>
        </div>
       </div>
       <figure className="regen-comparison-photo">
        <img src="/images/knee-injection-closeup-960.webp" srcSet="/images/knee-injection-closeup-480.webp 480w, /images/knee-injection-closeup-960.webp 960w" sizes="(max-width: 760px) calc(100vw - 48px), 30vw" width="960" height="1280" decoding="async" loading="lazy" alt="장갑을 낀 의료진이 무릎 앞쪽 슬개골 주변에 주사를 놓는 모습" />
       </figure>
      </div>
    </section>
  );
}
