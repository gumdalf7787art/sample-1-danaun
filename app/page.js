import Hero from './Hero';
import Link from 'next/link';
import {symptoms,clinics,notes} from './content';
import {SectionHead,Picture,Process,FAQ,Anatomy,VisitCTA} from './Site';
export default function Home(){return <>
 <Hero/>
 <section className="section container" id="symptoms"><SectionHead tag="LISTEN TO YOUR BODY" title="어떤 순간이 불편하신가요?">작은 불편도 일상의 이야기에서 시작합니다.</SectionHead><div className="symptom-grid">{symptoms.map(s=><Link className="symptom-card" href={`/symptoms/${s.slug}`} key={s.slug}><Anatomy part={s.icon}/><div><h3>{s.label}</h3><p>{s.line}</p><span className="text-link">자세히 살펴보기</span></div></Link>)}</div></section>
 <section className="philosophy section"><div className="container split"><div><p className="eyebrow">THE WAY WE CARE</p><h2>아픈 곳을 넘어,<br/>불편한 일상을 살핍니다.</h2><p className="lead">오래 앉아 일하는 시간,<br/>계단을 오르내리는 순간,<br/>좋아하는 운동을 망설이게 되는 이유까지.</p><p>다나은은 일상 속 불편을 듣는 데서 진료를 시작합니다.<br/>내 몸을 이해하고, 회복의 방향을 함께 찾아갑니다.</p><Link className="text-link" href="/about">다나은의 진료 철학</Link></div><Picture name="doctor" alt="환자의 이야기를 듣는 가상의 남성 의료진"/></div></section>
 <section className="section container"><SectionHead tag="STEP BY STEP" title="처음 오셔도, 차근차근.">충분히 듣고 설명하며, 변화의 과정을 함께 살핍니다.</SectionHead><Process/></section>
 <section className="doctor-feature"><Picture name="doctor" alt="차분하게 상담하는 가상의 남성 원장"/><div><p className="eyebrow">A DOCTOR WHO LISTENS</p><h2>무엇이 불편한지 충분히 듣고,<br/>어떻게 치료할지<br/>알기 쉽게 설명하겠습니다.</h2><p>질문하기 편안한 진료실.<br/>내 몸의 상태를 이해하는 시간부터 시작합니다.</p><Link href="/about/doctor" className="button light">의료진 소개</Link><small>샘플용 가상 의료진 이미지</small></div></section>
 <section className="section container"><SectionHead tag="CARE FOR YOUR EVERYDAY" title="각자의 일상에 맞는 회복.">일하는 하루도, 운동하는 주말도. 돌아가고 싶은 생활을 함께 생각합니다.</SectionHead><div className="clinic-grid">{clinics.map(c=><Link className="clinic-card" key={c.slug} href={`/clinics/${c.slug}`}><Picture name={c.image} alt={c.short}/><div><p className="eyebrow">{c.tag}</p><h3>{c.title}</h3><p>{c.short}</p></div></Link>)}</div></section>
 <section className="treatment-band section"><div className="container"><SectionHead tag="UNDERSTAND YOUR CARE" title="치료의 이유부터 설명합니다.">현재 상태에 맞는 선택지를 알아보고, 기대할 수 있는 변화와 주의할 점을 함께 살핍니다.</SectionHead><div className="treatment-links">{[['비수술 통증치료',''],['도수치료','/manual'],['운동치료','/exercise'],['체외충격파','/shockwave'],['주사치료','/injection']].map(([a,b])=><Link key={a} href={'/treatments'+b}>{a}<span>치료 알아보기</span></Link>)}</div></div></section>
 <section className="section container"><SectionHead tag="DANAUN JOURNAL" title="진료실 밖에서도, 다나은 생활노트.">몸의 변화를 이해하는 짧고 편안한 이야기.</SectionHead><div className="notes-grid">{notes.map(n=><Link href={`/notes/${n.slug}`} key={n.slug}><span>{n.tag}</span><h3>{n.title}</h3><p>{n.desc}</p><b>읽어보기</b></Link>)}</div></section>
 <section className="section container faq-section"><SectionHead tag="BEFORE YOUR VISIT" title="궁금한 점을 미리 확인하세요."/><FAQ/></section><VisitCTA/>
 </>}
