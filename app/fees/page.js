import AboutDetail from '../components/AboutDetail';
import FeeDirectory from './FeeDirectory';
import {pageMeta} from '../data/seo';

const path = '/fees';
const title = '비급여 진료비';
const description = '다나은재활의학과의원 비급여 진료비를 항목, 금액, 적용 기준별로 확인하세요.';
const originalNotice = '//page/page4';

export const metadata = pageMeta(path, title + ' | 다나은재활의학과의원', description);

export default function Fees() {
  return (
    <AboutDetail path={path} title={title} label="NON-COVERED MEDICAL FEES" summary={description}
      image="/images/danaun-space.png" imagePosition="center 54%">
      <section className="ro-band ro-intro ro-concept">
        <div className="ro-wrap ro-concept-definition">
          <h2 data-ro-title>비급여 항목과 <span>비용을 확인하세요.</span></h2>
          <p>표의 금액과 비고는 기존 병원 고지를 기준으로 안내합니다. 금액이 범위로 표시된 항목의 적용 비용이나 포함 항목은 진료 전 병원에 확인해 주세요.</p>
          <a className="ro-link" href="/visit">진료비 문의 연락처 준비 중 <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <section className="ro-band fee-list-section" id="fee-list" aria-labelledby="fee-list-title">
        <div className="ro-wrap">
          <div className="ro-heading" data-ro-reveal>
            <h2 id="fee-list-title">비급여 <em>진료비 고지표</em></h2>
            <p>단위는 원이며, 용량·단위는 기존 고지의 표기입니다.</p>
          </div>
          <FeeDirectory/>
          <div className="about-source">
            <p>기존 홈페이지 고지 확인일 · 2026년 11월 16일</p>
            <a href={originalNotice} target="_blank" rel="noreferrer">기존 병원 홈페이지 비급여 고지 보기 ↗</a>
          </div>
        </div>
      </section>
    </AboutDetail>
  );
}
