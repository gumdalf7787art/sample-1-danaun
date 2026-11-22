import {pageMeta} from '../data/seo';
import {PageData} from '../components/StructuredData';
import RegenOverview from '../components/RegenOverview';
import '../regen-overview.css';
const originalMetadata={title:'DANAUN REGEN 재생치료 소개 | 수지 다나은재활의학과의원',description:' 다나은재활의학과의원의 재생치료 안내. 인대·힘줄과 움직임을 평가하고 리젠 주사, PRP·PRF, 무릎 SVF의 적용과 치료 후 재활을 설명합니다.'};
export const metadata=pageMeta('/regen',originalMetadata.title,originalMetadata.description);
export default function Page(){return <><PageData path="/regen" name="DANAUN REGEN 재생치료 소개" medicalDescription={originalMetadata.description}/><RegenOverview/></>}
