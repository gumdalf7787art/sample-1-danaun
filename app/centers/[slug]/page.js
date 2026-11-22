import {pageMeta} from '../../data/seo';
import {PageData} from '../../components/StructuredData';
import SportsCenter from '../../components/SportsCenter';
import OsteoarthritisCenter from '../../components/OsteoarthritisCenter';
import SpineCenter from '../../components/SpineCenter';
import BreastCancerRehab from '../../components/BreastCancerRehab';
import PostureCenter from '../../components/PostureCenter';
import '../../regen-overview.css';
import '../../regen-prp-prf.css';
import '../../sports-clinic.css';
import '../../center-care-program.css';
import '../../center-detail.css';
import '../../spine-center.css';
import '../../breast-cancer-rehab.css';
import '../../posture-center.css';
import {notFound} from 'next/navigation';
import {centers} from '../../data/centers';
import HealthyAgingCenter from '../../components/HealthyAgingCenter';
import * as aging from '../../data/healthy-aging-center';
import '../../healthy-aging-center.css';
const sportsPath = '/centers/sports';
const sportsTitle = '스포츠손상 센터';
const sportsDescription = '운동 중 생긴 발목·무릎·어깨·팔꿈치 통증과 반복되는 불편을 살펴봅니다. 다나은재활의학과의원의 손상 평가, 개별 치료, 단계별 재활과 활동 복귀 진료 방향을 안내합니다.';

const osteoarthritisPath = '/centers/osteoarthritis';
const osteoarthritisTitle = '퇴행성 관절염 센터';
const osteoarthritisDescription = '수지 동천 다나은재활의학과의원의 퇴행성 관절염 진료 안내. 무릎 통증의 평가부터 운동·생활 관리, 주사 종류별 차이와 치료 후 재평가까지 알아보세요.';

const spinePath = '/centers/spine';
const spineTitle = '척추 재생 센터';
const spineDescription = '척추 재생 센터에서 허리디스크, 척추관협착증, 천장관절 통증의 평가와 관리 방향을 알아보세요. 필요한 진찰과 검사, 개인별 계획과 재평가 기준을 안내합니다.';

const breastRehabPath = '/centers/breast-cancer-rehab';
const breastRehabTitle = '유방암 재활 센터';
const breastRehabDescription = '유방암 재활 센터에서 유방암 수술 후 어깨 통증, 겨드랑이 당김, 림프부종 관리의 평가와 관리 방향을 알아보세요. 필요한 진찰과 검사, 개인별 계획과 재평가 기준을 안내합니다.';

const posturePath = '/centers/posture';
const postureTitle = '척추·체형 교정 센터';
const postureDescription = '척추·체형 교정 센터에서 청소년 척추측만증, 성인 측만증, 골반 불균형의 평가와 관리 방향을 알아보세요. 필요한 진찰과 검사, 개인별 계획과 재평가 기준을 안내합니다.';

export function generateStaticParams(){return centers.map(({slug})=>({slug}))}
export async function generateMetadata({params}){const {slug}=await params;
 if (slug === 'healthy-aging') {
  const meta = pageMeta(aging.path, aging.title + ' | 근력 저하 재활 | 다나은재활의학과의원', aging.description);
  return {...meta, openGraph: {...meta.openGraph, title:aging.title + ' | 다나은재활의학과의원', description:aging.message}};
 }
 if (slug === 'posture') {
  const meta = pageMeta(posturePath, postureTitle + ' | 수지 체형 교정 | 다나은재활의학과의원', postureDescription);
  return {...meta, openGraph: {...meta.openGraph, title:postureTitle + ' | 다나은재활의학과의원', description:'겉모습 너머, 움직임의 균형을 봅니다.'}};
 }
 if (slug === 'breast-cancer-rehab') {
  const meta = pageMeta(breastRehabPath, breastRehabTitle + ' | 유방암 수술 후 재활 | 다나은재활의학과의원', breastRehabDescription);
  return {...meta, openGraph: {...meta.openGraph, title:breastRehabTitle + ' | 다나은재활의학과의원', description:'암 치료의 계획을 존중하며, 어깨와 팔의 일상을 함께 살핍니다.'}};
 }
 if (slug === 'spine') {
  const meta = pageMeta(spinePath, '척추 재생 센터 | 수지 허리 통증 | 다나은재활의학과의원', spineDescription);
  return {...meta, openGraph: {...meta.openGraph, title:'척추 재생 센터 | 다나은재활의학과의원', description:'목과 허리의 통증, 신경 증상과 움직임을 함께 살핍니다.'}};
 }
 if (slug === 'osteoarthritis') return {
  ...pageMeta(osteoarthritisPath, '수지 무릎 통증·퇴행성 관절염 센터 | 다나은재활의학과의원', osteoarthritisDescription),
 };
 if (slug === 'sports') {
  const meta = pageMeta(sportsPath, '스포츠손상 센터 | 수지 스포츠 재활 | 다나은재활의학과의원', sportsDescription);
  return {...meta, openGraph: {...meta.openGraph, title:'다시 뛰기 위해, 손상과 움직임을 함께 봅니다.', description:'리셋 스포츠손상 센터의 평가·치료·재활·활동 복귀 안내'}};
 }
 notFound();
}
export default async function CenterPage({params}){const {slug}=await params;
 if (slug === 'posture') return <>
  <PageData path={posturePath} name={postureTitle} medicalDescription={postureDescription} medicalCondition="척추측만증" breadcrumbParent={{name:'치료 센터', path:'/#centers'}}/>
  <PostureCenter/>
 </>;
 if (slug === 'breast-cancer-rehab') return <>
  <PageData path={breastRehabPath} name={breastRehabTitle} medicalDescription={breastRehabDescription} medicalCondition="림프부종" breadcrumbParent={{name:'치료 센터', path:'/#centers'}}/>
  <BreastCancerRehab/>
 </>;
 if (slug === 'spine') return <>
  <PageData path={spinePath} name={spineTitle} medicalDescription={spineDescription} medicalCondition="목·허리 통증" breadcrumbParent={{name:'치료 센터', path:'/#centers'}}/>
  <SpineCenter/>
 </>;
 if (slug === 'osteoarthritis') return <>
  <PageData path={osteoarthritisPath} name={osteoarthritisTitle} medicalDescription={osteoarthritisDescription} medicalCondition="골관절염" breadcrumbParent={{name:'치료 센터', path:'/#centers'}}/>
  <OsteoarthritisCenter/>
 </>;
 if (slug === 'sports') return <>
  <PageData path={sportsPath} name={sportsTitle} medicalDescription={sportsDescription} breadcrumbParent={{name:'치료 센터', path:'/#centers'}}/>
  <SportsCenter/>
 </>;
 if (slug === 'healthy-aging') return <>
  <PageData path={aging.path} name={aging.title} medicalDescription={aging.description} breadcrumbParent={{name:'치료 센터', path:'/#centers'}}/>
  <HealthyAgingCenter/>
 </>;
 notFound();
}
