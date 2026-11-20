import SiteHeader from './SiteHeader';
import PolicyLinks from './PolicyLinks';
import {centers} from '../data/centers';
export const booking='https://booking.naver.com/booking/13/bizes/271483?area=plt';
export function DetailHeader(){return <SiteHeader/>;}
export function CenterTabs({active,variant,shortLabels=false}){return <nav className={variant === 'regen' ? 'center-tabs regen-tabs' : 'center-tabs'} aria-label="치료센터 바로가기">{centers.map(c=><a key={c.slug} href={'/centers/'+c.slug} aria-current={active===c.slug?'page':undefined}>{shortLabels ? c.name : c.name + ' 센터'}</a>)}</nav>}
export function Consult(){return <section className="detail-consult"><div><p className="eyebrow light">YOUR NEXT STEP</p><h2>나에게 맞는 회복,<br/>평가에서 시작하세요.</h2><p>기존 검사 자료와 복용 약을 준비해 주세요.<br/>현재 상태와 치료 목표를 함께 확인하겠습니다.</p></div><div><a className="button mint" href={booking} target="_blank" rel="noreferrer">네이버 진료 예약 <span>↗</span></a><a className="consult-phone" href="tel:0312632520">031.263.2520</a><a href="/visit">진료시간 · 오시는 길 →</a></div></section>}
export function DetailFooter(){return <><footer className="detail-footer"><PolicyLinks/><a href="/" className="detail-footer-logo" aria-label="리셋재활의학과의원 홈"><span className="clinic-logo" aria-hidden="true"/></a><p>대표 이고은 · 경기 용인시 수지구 손곡로 95 송란아트프라자 2층<br/>© RESET REHAB CLINIC.</p><p>의료 콘텐츠 · 의료진 검토 완료</p></footer><div className="mobile-actions"><a href="tel:0312632520">전화 상담</a><a href={booking} target="_blank" rel="noreferrer">네이버 예약 ↗</a><a href="/visit">오시는 길</a></div></>}
export function Faqs({items}){return <div className="detail-faqs">{items.map(([q,a],i)=><details key={q}><summary><span>Q{String(i+1).padStart(2,'0')}</span>{q}<b aria-hidden="true">+</b></summary><p>{a}</p></details>)}</div>}
