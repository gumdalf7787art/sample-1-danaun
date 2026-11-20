import {pageMeta} from '../data/seo';
import {PageData} from '../components/StructuredData';
import DiagnosisOverview from '../components/DiagnosisOverview';
import '../regen-overview.css';
import '../regen-prp-prf.css';
import '../diagnosis-overview.css';

const path = '/diagnosis';
const name = '정밀 진단 소개';
const description = '리셋재활의학과의원은 증상과 진찰을 바탕으로 필요한 초음파·움직임·체형 평가를 선택합니다. 평가 결과를 설명하고 치료와 재활, 경과 확인 계획으로 연결하는 과정을 안내합니다.';
const meta = pageMeta(path, name + ' | 초음파·움직임·체형 평가 | 리셋재활의학과의원', description);

export const metadata = {
  ...meta,
  openGraph: {...meta.openGraph, title:'치료의 시작, 내 몸을 이해하는 평가부터.', description:'리셋의 문진·평가·결과 설명·치료 계획을 알아보세요.'},
};

export default function Page() {
  return <><PageData path={path} name="정밀 진단" medicalDescription={description}/><DiagnosisOverview/></>;
}
