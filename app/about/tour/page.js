import AboutDetail from '../../components/AboutDetail';
import {pageMeta} from '../../data/seo';
import TourGallery from './TourGallery';

const path = '/about/tour';
const title = '병원 둘러보기';
const description = '다나은재활의학과의원의 입구부터 접수·대기 공간, 치료실과 검사 공간까지 사진으로 둘러보세요.';
const photos = [
  ['entrance', '병원 입구', '다나은 의원 공간을 표현한 예시 이미지'],
  ['reception', '접수 공간', '접수대와 의자가 놓인 병원 로비'],
  ['waiting-room', '대기실', '창가 소파와 탁자가 놓인 병원 대기실'],
  ['therapy-room', '치료실', '커튼으로 구분된 치료 베드'],
  ['imaging-room', '영상 검사실', '검사 테이블과 엑스레이 장비가 있는 공간'],
];

export const metadata = pageMeta(path, title + ' | 다나은재활의학과의원', description);

export default function TourPage() {
  return (
    <AboutDetail path={path} title={title} label="CLINIC TOUR" summary={description}
      image="/images/danaun-space.png" imagePosition="center 56%">
      <section className="ro-band ro-concept tour-gallery-section">
        <div className="ro-wrap">
          <div className="ro-concept-definition">
            <h2 data-ro-title>사진으로 보는 <span>병원 공간</span></h2>
            <p>입구에서 접수 공간을 지나 치료실과 검사실까지 이어지는 모습을 살펴보세요.</p>
          </div>
          <TourGallery photos={photos}/>
        </div>
      </section>
    </AboutDetail>
  );
}
