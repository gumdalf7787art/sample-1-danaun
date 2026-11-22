const defaultStages = [
  {title:'진료와 평가', detail:'원인과 조직 상태 확인', position:'top'},
  {title:'치료 방법 선택', detail:'성분과 목적을 함께 검토', position:'right'},
  {title:'정기 재평가', detail:'통증과 기능의 변화 확인', position:'bottom'},
  {title:'운동치료·생활 관리', detail:'일상 속 회복까지 연결', position:'left'},
];

export default function RecoveryBeam({
 stages = defaultStages,
 caption = "환자를 중심으로 연결되는 회복의 과정",
 centerTitle = "환자",
 centerDetail = "회복의 중심",
 label = "환자를 중심으로 진료와 평가, 치료 방법 선택, 정기 재평가, 운동치료와 생활 관리가 연결됩니다.",
} = {}){
 return <div className="recovery-beam" data-ro-reveal>
  <p className="recovery-beam-caption">{caption}</p>
  <div className="recovery-beam-map" role="group" aria-label={label}>
   <svg className="recovery-beam-lines" viewBox="0 0 500 500" aria-hidden="true">
    <defs><linearGradient id="recovery-orbit-gradient" gradientUnits="userSpaceOnUse" x1="105" y1="185" x2="250" y2="90"><stop offset="0" stopColor="#d4b18b" stopOpacity="0"/><stop offset=".45" stopColor="#d4b18b"/><stop offset=".8" stopColor="#82dccb"/><stop offset="1" stopColor="#e8fff7"/></linearGradient></defs>
    <circle className="recovery-beam-track" cx="250" cy="250" r="160"/>
    <g className="recovery-beam-orbit">
     <path className="recovery-beam-light" d="M105.23 181.88 A160 160 0 0 1 250 90" stroke="url(#recovery-orbit-gradient)"/>
     <circle cx="250" cy="90" r="2.5" fill="#e8fff7"/>
    </g>
   </svg>
   <div className="recovery-beam-patient"><svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="10" r="5"/><path d="M6 28v-3a10 10 0 0 1 20 0v3"/></svg><strong>{centerTitle}</strong><span>{centerDetail}</span></div>
   <ol className="recovery-beam-stages">{stages.map((s,i)=><li key={s.position} className={`recovery-beam-node recovery-beam-${s.position}`} style={{'--beam-delay':`${i*2-8}s`}}><small>0{i+1}</small><h3>{s.title}</h3><p>{s.detail}</p></li>)}</ol>
  </div>
 </div>;
}
